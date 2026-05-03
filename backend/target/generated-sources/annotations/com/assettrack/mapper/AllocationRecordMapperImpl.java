package com.assettrack.mapper;

import com.assettrack.domain.AllocationRecord;
import com.assettrack.dto.response.AllocationRecordResponse;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-04T01:09:51+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.10 (Oracle Corporation)"
)
@Component
public class AllocationRecordMapperImpl implements AllocationRecordMapper {

    @Autowired
    private UserMapper userMapper;

    @Override
    public AllocationRecordResponse toResponse(AllocationRecord record) {
        if ( record == null ) {
            return null;
        }

        AllocationRecordResponse allocationRecordResponse = new AllocationRecordResponse();

        allocationRecordResponse.setId( record.getId() );
        allocationRecordResponse.setAssignedTo( userMapper.toResponse( record.getAssignedTo() ) );
        allocationRecordResponse.setAssignedBy( userMapper.toResponse( record.getAssignedBy() ) );
        allocationRecordResponse.setAssignedAt( record.getAssignedAt() );
        allocationRecordResponse.setReturnedAt( record.getReturnedAt() );

        return allocationRecordResponse;
    }
}
