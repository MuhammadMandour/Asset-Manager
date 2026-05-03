package com.assettrack.dto.request;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class AlertConfigRequest {
    @Min(1)
    private int warrantyWarningDays;
    
    @Min(1)
    private int lowStockThreshold;
}
