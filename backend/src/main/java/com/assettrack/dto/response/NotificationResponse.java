package com.assettrack.dto.response;

import com.assettrack.domain.NotificationType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class NotificationResponse {
    private UUID id;
    private String message;
    private NotificationType type;
    private boolean read;
    private LocalDateTime createdAt;
}
