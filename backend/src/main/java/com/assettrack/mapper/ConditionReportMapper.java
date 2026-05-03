package com.assettrack.mapper;

import com.assettrack.domain.ConditionReport;
import com.assettrack.dto.response.ConditionReportResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ConditionReportMapper {
    ConditionReportResponse toResponse(ConditionReport report);
}
