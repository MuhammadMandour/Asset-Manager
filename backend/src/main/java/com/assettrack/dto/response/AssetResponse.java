package com.assettrack.dto.response;

import com.assettrack.domain.AssetCondition;
import com.assettrack.domain.AssetStatus;
import com.assettrack.domain.AssetType;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class AssetResponse {
    private UUID id;
    private AssetType type;
    private String brand;
    private String model;
    private String serialNumber;
    private LocalDate purchaseDate;
    private LocalDate warrantyExpirationDate;
    private AssetStatus status;
    private AssetCondition condition;
    private UserResponse currentOwner;
    private String warrantyStatus; // VALID, EXPIRING_SOON, EXPIRED
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
