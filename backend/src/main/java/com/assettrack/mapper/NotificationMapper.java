package com.assettrack.mapper;

import com.assettrack.domain.Notification;
import com.assettrack.dto.response.NotificationResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationResponse toResponse(Notification notification);
}
