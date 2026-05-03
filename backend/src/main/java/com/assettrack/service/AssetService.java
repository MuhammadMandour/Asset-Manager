package com.assettrack.service;

import com.assettrack.domain.*;
import com.assettrack.dto.request.AssignAssetRequest;
import com.assettrack.dto.request.CreateAssetRequest;
import com.assettrack.dto.request.UpdateAssetRequest;
import com.assettrack.dto.response.AssetDetailResponse;
import com.assettrack.dto.response.AssetResponse;
import com.assettrack.dto.response.PagedResponse;
import com.assettrack.dto.response.SpareAssetResponse;
import com.assettrack.exception.ResourceNotFoundException;
import com.assettrack.mapper.AssetMapper;
import com.assettrack.mapper.UserMapper;
import com.assettrack.repository.AllocationRecordRepository;
import com.assettrack.repository.AssetRepository;
import com.assettrack.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepository assetRepository;
    private final UserRepository userRepository;
    private final AllocationRecordRepository allocationRecordRepository;
    private final AssetMapper assetMapper;
    private final UserMapper userMapper;
    private final UserService userService;
    private final NotificationService notificationService;

    @Transactional
    public AssetResponse createAsset(CreateAssetRequest request) {
        Asset asset = Asset.builder()
                .type(request.getType())
                .brand(request.getBrand())
                .model(request.getModel())
                .serialNumber(request.getSerialNumber())
                .purchaseDate(request.getPurchaseDate())
                .warrantyExpirationDate(request.getWarrantyExpirationDate())
                .status(AssetStatus.AVAILABLE)
                .condition(AssetCondition.GOOD)
                .build();

        asset = assetRepository.save(asset);
        return assetMapper.toResponse(asset);
    }

    @Transactional
    public AssetResponse updateAsset(UUID id, UpdateAssetRequest request) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));

        if (request.getBrand() != null) asset.setBrand(request.getBrand());
        if (request.getModel() != null) asset.setModel(request.getModel());
        if (request.getWarrantyExpirationDate() != null) asset.setWarrantyExpirationDate(request.getWarrantyExpirationDate());
        if (request.getStatus() != null) asset.setStatus(request.getStatus());
        if (request.getCondition() != null) asset.setCondition(request.getCondition());

        asset = assetRepository.save(asset);
        return assetMapper.toResponse(asset);
    }

    @Transactional
    public void deleteAsset(UUID id) {
        if (!assetRepository.existsById(id)) {
            throw new ResourceNotFoundException("Asset not found");
        }
        assetRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public AssetDetailResponse getAssetById(UUID id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));
        return assetMapper.toDetailResponse(asset);
    }

    @Transactional(readOnly = true)
    public PagedResponse<AssetResponse> getAllAssets(Pageable pageable) {
        Page<Asset> assets = assetRepository.findAll(pageable);
        Page<AssetResponse> responsePage = assets.map(assetMapper::toResponse);
        return PagedResponse.fromPage(responsePage);
    }

    @Transactional(readOnly = true)
    public PagedResponse<AssetResponse> searchAssets(String serialNumber, UUID userId, AssetStatus status, AssetType type, String brand, Pageable pageable) {
        Specification<Asset> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (serialNumber != null && !serialNumber.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("serialNumber")), "%" + serialNumber.toLowerCase() + "%"));
            }
            if (userId != null) {
                predicates.add(cb.equal(root.get("currentOwner").get("id"), userId));
            }
            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            if (type != null) {
                predicates.add(cb.equal(root.get("type"), type));
            }
            if (brand != null && !brand.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("brand")), "%" + brand.toLowerCase() + "%"));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Page<Asset> assets = assetRepository.findAll(spec, pageable);
        return PagedResponse.fromPage(assets.map(assetMapper::toResponse));
    }

    @Transactional
    public AssetResponse assignAsset(UUID assetId, AssignAssetRequest request) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));

        if (asset.getStatus() != AssetStatus.AVAILABLE) {
            throw new IllegalArgumentException("Asset is not available for assignment");
        }

        User assignedTo = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        User assignedBy = userService.getCurrentUserEntity();

        // Close previous allocation record if it somehow exists and is open
        closeCurrentAllocation(asset);

        // Update asset
        asset.setCurrentOwner(assignedTo);
        asset.setStatus(AssetStatus.ASSIGNED);
        
        // Create new allocation record
        AllocationRecord record = AllocationRecord.builder()
                .asset(asset)
                .assignedTo(assignedTo)
                .assignedBy(assignedBy)
                .assignedAt(LocalDateTime.now())
                .build();
        allocationRecordRepository.save(record);

        asset = assetRepository.save(asset);

        // Notify user
        notificationService.createNotification(assignedTo,
                "You have been assigned a new asset: " + asset.getBrand() + " " + asset.getModel() + " (" + asset.getSerialNumber() + ")",
                NotificationType.ASSET_ASSIGNED);

        return assetMapper.toResponse(asset);
    }

    @Transactional
    public AssetResponse unassignAsset(UUID assetId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));

        if (asset.getCurrentOwner() == null) {
            throw new IllegalArgumentException("Asset is not currently assigned");
        }

        closeCurrentAllocation(asset);

        asset.setCurrentOwner(null);
        asset.setStatus(AssetStatus.AVAILABLE);

        asset = assetRepository.save(asset);
        return assetMapper.toResponse(asset);
    }

    private void closeCurrentAllocation(Asset asset) {
        List<AllocationRecord> history = allocationRecordRepository.findByAssetOrderByAssignedAtDesc(asset);
        if (!history.isEmpty()) {
            AllocationRecord currentRecord = history.get(0);
            if (currentRecord.getReturnedAt() == null) {
                currentRecord.setReturnedAt(LocalDateTime.now());
                allocationRecordRepository.save(currentRecord);
            }
        }
    }

    @Transactional(readOnly = true)
    public List<SpareAssetResponse> getSpareAssets() {
        List<Asset> spareLaptops = assetRepository.findByStatusAndType(AssetStatus.AVAILABLE, AssetType.LAPTOP);
        return spareLaptops.stream().map(asset -> {
            SpareAssetResponse response = new SpareAssetResponse();
            response.setAsset(assetMapper.toResponse(asset));
            
            List<AllocationRecord> history = allocationRecordRepository.findByAssetOrderByAssignedAtDesc(asset);
            if (!history.isEmpty()) {
                response.setLastOwner(userMapper.toResponse(history.get(0).getAssignedTo()));
            }
            return response;
        }).collect(Collectors.toList());
    }
}
