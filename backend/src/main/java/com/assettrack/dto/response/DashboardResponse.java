package com.assettrack.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class DashboardResponse {
    private long totalAssets;
    private Map<String, Long> byType;
    private Map<String, Long> byStatus;
    private Map<String, Long> byUser;
    private List<AssetResponse> expiringWarranties;
    private List<AssetResponse> lowStockItems;
}
