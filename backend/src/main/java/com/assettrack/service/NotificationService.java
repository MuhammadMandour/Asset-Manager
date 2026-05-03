package com.assettrack.service;

import com.assettrack.domain.Notification;
import com.assettrack.domain.NotificationType;
import com.assettrack.domain.User;
import com.assettrack.dto.response.NotificationResponse;
import com.assettrack.exception.ResourceNotFoundException;
import com.assettrack.mapper.NotificationMapper;
import com.assettrack.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final UserService userService;

    @Transactional(readOnly = true)
    public List<NotificationResponse> getNotificationsForCurrentUser() {
        User currentUser = userService.getCurrentUserEntity();
        return notificationRepository.findByUserOrderByCreatedAtDesc(currentUser).stream()
                .map(notificationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markAsRead(UUID notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        
        // Ensure user owns this notification
        User currentUser = userService.getCurrentUserEntity();
        if (!notification.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Notification not found");
        }

        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Transactional
    public void markAllAsRead() {
        User currentUser = userService.getCurrentUserEntity();
        List<Notification> unread = notificationRepository.findByUserAndReadFalse(currentUser);
        unread.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(unread);
    }

    @Transactional(readOnly = true)
    public long getUnreadCount() {
        User currentUser = userService.getCurrentUserEntity();
        return notificationRepository.countByUserAndReadFalse(currentUser);
    }

    @Transactional
    public void createNotification(User user, String message, NotificationType type) {
        Notification notification = Notification.builder()
                .user(user)
                .message(message)
                .type(type)
                .createdAt(LocalDateTime.now())
                .read(false)
                .build();
        notificationRepository.save(notification);
    }
}
