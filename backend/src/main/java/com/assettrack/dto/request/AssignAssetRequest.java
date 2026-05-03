package com.assettrack.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class AssignAssetRequest {
    @NotNull
    private UUID userId;
}
