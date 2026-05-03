package com.assettrack.dto.response;

import lombok.Data;

@Data
public class SpareAssetResponse {
    private AssetResponse asset;
    private UserResponse lastOwner;
}
