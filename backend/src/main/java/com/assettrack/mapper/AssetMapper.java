package com.assettrack.mapper;

import com.assettrack.domain.Asset;
import com.assettrack.dto.response.AssetDetailResponse;
import com.assettrack.dto.response.AssetResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class, AllocationRecordMapper.class, ConditionReportMapper.class})
public interface AssetMapper {
    
    @Mapping(target = "warrantyStatus", expression = "java(computeWarrantyStatus(asset))")
    AssetResponse toResponse(Asset asset);

    @Mapping(target = "warrantyStatus", expression = "java(computeWarrantyStatus(asset))")
    AssetDetailResponse toDetailResponse(Asset asset);

    default String computeWarrantyStatus(Asset asset) {
        if (asset.getWarrantyExpirationDate() == null) return "VALID";
        java.time.LocalDate now = java.time.LocalDate.now();
        if (asset.getWarrantyExpirationDate().isBefore(now)) {
            return "EXPIRED";
        } else if (asset.getWarrantyExpirationDate().isBefore(now.plusDays(30))) { // Will use config in service, this is fallback
            return "EXPIRING_SOON";
        }
        return "VALID";
    }
}
