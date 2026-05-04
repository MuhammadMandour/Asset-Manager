package com.assettrack.mapper;

import com.assettrack.domain.ConditionReport;
import com.assettrack.dto.response.ConditionReportResponse;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-04T12:42:15+0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class ConditionReportMapperImpl implements ConditionReportMapper {

    @Autowired
    private UserMapper userMapper;

    @Override
    public ConditionReportResponse toResponse(ConditionReport report) {
        if ( report == null ) {
            return null;
        }

        ConditionReportResponse conditionReportResponse = new ConditionReportResponse();

        conditionReportResponse.setDescription( report.getDescription() );
        conditionReportResponse.setId( report.getId() );
        conditionReportResponse.setReportedAt( report.getReportedAt() );
        conditionReportResponse.setReportedBy( userMapper.toResponse( report.getReportedBy() ) );
        conditionReportResponse.setResolved( report.isResolved() );
        conditionReportResponse.setResolvedAt( report.getResolvedAt() );
        conditionReportResponse.setResolvedBy( userMapper.toResponse( report.getResolvedBy() ) );

        return conditionReportResponse;
    }
}
