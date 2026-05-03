package com.assettrack.mapper;

import com.assettrack.domain.ConditionReport;
import com.assettrack.dto.response.ConditionReportResponse;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-04T01:09:51+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.10 (Oracle Corporation)"
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

        conditionReportResponse.setId( report.getId() );
        conditionReportResponse.setReportedBy( userMapper.toResponse( report.getReportedBy() ) );
        conditionReportResponse.setDescription( report.getDescription() );
        conditionReportResponse.setReportedAt( report.getReportedAt() );
        conditionReportResponse.setResolved( report.isResolved() );
        conditionReportResponse.setResolvedAt( report.getResolvedAt() );
        conditionReportResponse.setResolvedBy( userMapper.toResponse( report.getResolvedBy() ) );

        return conditionReportResponse;
    }
}
