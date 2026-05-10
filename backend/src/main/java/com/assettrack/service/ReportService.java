package com.assettrack.service;

import com.assettrack.domain.Asset;
import com.assettrack.domain.AssetCondition;
import com.assettrack.domain.AssetType;
import com.assettrack.dto.response.AllocationRecordResponse;
import com.assettrack.exception.ResourceNotFoundException;
import com.assettrack.mapper.AllocationRecordMapper;
import com.assettrack.repository.AllocationRecordRepository;
import com.assettrack.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final AllocationRecordRepository allocationRecordRepository;
    private final AssetRepository assetRepository;
    private final AllocationRecordMapper allocationRecordMapper;

    @Transactional(readOnly = true)
    public Map<String, Object> getUsageStatistics(LocalDate from, LocalDate to) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("message", "Detailed allocation statistics between " + from + " and " + to);
        stats.put("totalAllocations", allocationRecordRepository.countByAssignedAtBetween(
                from.atStartOfDay(),
                to.atTime(23, 59, 59, 999999999)
        ));
        return stats;
    }

    @Transactional(readOnly = true)
    public Map<String, Map<String, Long>> getConditionSummary() {
        List<Asset> allAssets = assetRepository.findAll();
        Map<String, Map<String, Long>> summary = new HashMap<>();

        for (AssetType type : AssetType.values()) {
            Map<String, Long> conditionCounts = new HashMap<>();
            for (AssetCondition condition : AssetCondition.values()) {
                long count = allAssets.stream()
                        .filter(a -> a.getType() == type && a.getCondition() == condition)
                        .count();
                conditionCounts.put(condition.name(), count);
            }
            summary.put(type.name(), conditionCounts);
        }
        return summary;
    }

    @Transactional(readOnly = true)
    public List<AllocationRecordResponse> getAllocationHistory(UUID assetId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));
        return allocationRecordRepository.findByAssetOrderByAssignedAtDesc(asset).stream()
                .map(allocationRecordMapper::toResponse)
                .collect(Collectors.toList());
    }
}
