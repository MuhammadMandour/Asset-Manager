package com.assettrack.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class AllocationRecordResponse {
    private UUID id;
    private UserResponse assignedTo;
    private UserResponse assignedBy;
    private LocalDateTime assignedAt;
    private LocalDateTime returnedAt;
}
