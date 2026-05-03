package com.assettrack.service;

import com.assettrack.domain.Asset;
import com.assettrack.domain.AssetStatus;
import com.assettrack.domain.AssetType;
import com.assettrack.dto.response.AssetResponse;
import com.assettrack.dto.response.DashboardResponse;
import com.assettrack.mapper.AssetMapper;
import com.assettrack.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AssetRepository assetRepository;
    private final AssetMapper assetMapper;
    private final AlertConfigService alertConfigService;

    @Transactional(readOnly = true)
    public DashboardResponse getDashboard() {
        List<Asset> allAssets = assetRepository.findAll();
        
        long totalAssets = allAssets.size();
        
        Map<String, Long> byType = new HashMap<>();
        for (AssetType type : AssetType.values()) {
            byType.put(type.name(), allAssets.stream().filter(a -> a.getType() == type).count());
        }

        Map<String, Long> byStatus = new HashMap<>();
        for (AssetStatus status : AssetStatus.values()) {
            byStatus.put(status.name(), allAssets.stream().filter(a -> a.getStatus() == status).count());
        }

        Map<String, Long> byUser = new HashMap<>();
        allAssets.stream()
                .filter(a -> a.getCurrentOwner() != null)
                .collect(Collectors.groupingBy(a -> a.getCurrentOwner().getFullName(), Collectors.counting()))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .forEach(e -> byUser.put(e.getKey(), e.getValue()));

        int warrantyWarningDays = alertConfigService.getConfig().getWarrantyWarningDays();
        LocalDate warningDate = LocalDate.now().plusDays(warrantyWarningDays);
        
        List<AssetResponse> expiringWarranties = assetRepository.findByWarrantyExpirationDateBefore(warningDate).stream()
                .map(assetMapper::toResponse)
                .collect(Collectors.toList());

        int lowStockThreshold = alertConfigService.getConfig().getLowStockThreshold();
        List<AssetResponse> lowStockItems = assetRepository.findByStatusAndType(AssetStatus.AVAILABLE, AssetType.ACCESSORY).stream()
                .map(assetMapper::toResponse)
                .collect(Collectors.toList());
        // Simple logic for low stock response: only show if total available accessories < threshold
        long availableAccessories = assetRepository.countByTypeAndStatus(AssetType.ACCESSORY, AssetStatus.AVAILABLE);
        if (availableAccessories >= lowStockThreshold) {
            lowStockItems.clear(); // Clear it if not below threshold overall
        }

        return DashboardResponse.builder()
                .totalAssets(totalAssets)
                .byType(byType)
                .byStatus(byStatus)
                .byUser(byUser)
                .expiringWarranties(expiringWarranties)
                .lowStockItems(lowStockItems)
                .build();
    }
}
