package com.assettrack.dto.request;

import com.assettrack.domain.AssetCondition;
import com.assettrack.domain.AssetStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateAssetRequest {
    private String brand;
    private String model;
    private LocalDate warrantyExpirationDate;
    private AssetStatus status;
    private AssetCondition condition;
}
