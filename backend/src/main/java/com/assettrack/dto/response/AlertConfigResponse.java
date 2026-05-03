package com.assettrack.dto.response;

import lombok.Data;

@Data
public class AlertConfigResponse {
    private int warrantyWarningDays;
    private int lowStockThreshold;
}
