package com.assettrack.mapper;

import com.assettrack.domain.Notification;
import com.assettrack.dto.response.NotificationResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-04T12:42:15+0300",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class NotificationMapperImpl implements NotificationMapper {

    @Override
    public NotificationResponse toResponse(Notification notification) {
        if ( notification == null ) {
            return null;
        }

        NotificationResponse notificationResponse = new NotificationResponse();

        notificationResponse.setCreatedAt( notification.getCreatedAt() );
        notificationResponse.setId( notification.getId() );
        notificationResponse.setMessage( notification.getMessage() );
        notificationResponse.setRead( notification.isRead() );
        notificationResponse.setType( notification.getType() );

        return notificationResponse;
    }
}
