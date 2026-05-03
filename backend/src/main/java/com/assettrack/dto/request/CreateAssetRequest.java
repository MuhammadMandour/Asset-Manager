package com.assettrack.dto.request;

import com.assettrack.domain.AssetType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateAssetRequest {

    @NotNull
    private AssetType type;

    @NotBlank
    private String brand;

    @NotBlank
    private String model;

    @NotBlank
    private String serialNumber;

    @NotNull
    private LocalDate purchaseDate;

    @NotNull
    private LocalDate warrantyExpirationDate;
}
