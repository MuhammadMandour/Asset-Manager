package com.assettrack.mapper;

import com.assettrack.domain.Notification;
import com.assettrack.dto.response.NotificationResponse;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-04T01:09:51+0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.10 (Oracle Corporation)"
)
@Component
public class NotificationMapperImpl implements NotificationMapper {

    @Override
    public NotificationResponse toResponse(Notification notification) {
        if ( notification == null ) {
            return null;
        }

        NotificationResponse notificationResponse = new NotificationResponse();

        notificationResponse.setId( notification.getId() );
        notificationResponse.setMessage( notification.getMessage() );
        notificationResponse.setType( notification.getType() );
        notificationResponse.setRead( notification.isRead() );
        notificationResponse.setCreatedAt( notification.getCreatedAt() );

        return notificationResponse;
    }
}
