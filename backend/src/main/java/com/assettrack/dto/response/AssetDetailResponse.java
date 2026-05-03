package com.assettrack.dto.response;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class AssetDetailResponse extends AssetResponse {
    private List<AllocationRecordResponse> allocationHistory;
    private List<ConditionReportResponse> conditionReports;
}
