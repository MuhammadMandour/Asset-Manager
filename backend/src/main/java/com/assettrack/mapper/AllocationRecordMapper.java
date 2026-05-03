package com.assettrack.mapper;

import com.assettrack.domain.AllocationRecord;
import com.assettrack.dto.response.AllocationRecordResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface AllocationRecordMapper {
    AllocationRecordResponse toResponse(AllocationRecord record);
}
