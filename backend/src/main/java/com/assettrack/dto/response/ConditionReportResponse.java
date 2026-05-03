package com.assettrack.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ConditionReportResponse {
    private UUID id;
    private UserResponse reportedBy;
    private String description;
    private LocalDateTime reportedAt;
    private boolean resolved;
    private LocalDateTime resolvedAt;
    private UserResponse resolvedBy;
}
