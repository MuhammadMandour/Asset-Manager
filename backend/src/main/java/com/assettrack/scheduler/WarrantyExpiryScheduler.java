package com.assettrack.scheduler;

import com.assettrack.domain.Asset;
import com.assettrack.domain.AssetStatus;
import com.assettrack.domain.AssetType;
import com.assettrack.domain.NotificationType;
import com.assettrack.domain.Role;
import com.assettrack.domain.User;
import com.assettrack.repository.AssetRepository;
import com.assettrack.repository.UserRepository;
import com.assettrack.service.AlertConfigService;
import com.assettrack.service.EmailService;
import com.assettrack.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class WarrantyExpiryScheduler {

    private final AssetRepository assetRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final EmailService emailService;
    private final AlertConfigService alertConfigService;

    @Scheduled(cron = "0 0 8 * * *") // Every day at 08:00
    @Transactional
    public void checkWarrantyExpirations() {
        log.info("Running warranty expiration check");
        int warningDays = alertConfigService.getConfig().getWarrantyWarningDays();
        LocalDate cutoffDate = LocalDate.now().plusDays(warningDays);

        List<Asset> expiringAssets = assetRepository.findByWarrantyExpirationDateBetween(LocalDate.now(), cutoffDate);
        List<Asset> expiredAssets = assetRepository.findByWarrantyExpirationDateBefore(LocalDate.now());

        List<User> adminsAndManagers = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.ADMIN || u.getRole() == Role.MANAGER)
                .toList();

        for (Asset asset : expiringAssets) {
            String msg = "Warranty for " + asset.getBrand() + " " + asset.getModel() + " (" + asset.getSerialNumber() + ") expires on " + asset.getWarrantyExpirationDate();
            notifyUsers(adminsAndManagers, asset, msg);
        }

        for (Asset asset : expiredAssets) {
            String msg = "URGENT: Warranty for " + asset.getBrand() + " " + asset.getModel() + " (" + asset.getSerialNumber() + ") has EXPIRED on " + asset.getWarrantyExpirationDate() + ". Consider decommissioning or renewing.";
            notifyUsers(adminsAndManagers, asset, msg);
            log.warn(msg);
        }
    }

    private void notifyUsers(List<User> users, Asset asset, String message) {
        for (User user : users) {
            notificationService.createNotification(user, message, NotificationType.WARRANTY_EXPIRY);
            emailService.sendWarrantyExpiryEmail(user, asset);
        }
    }

    @Scheduled(cron = "0 0 8 * * MON") // Every Monday at 08:00
    @Transactional
    public void checkLowStock() {
        log.info("Running low stock check");
        int threshold = alertConfigService.getConfig().getLowStockThreshold();

        for (AssetType type : AssetType.values()) {
            if (type != AssetType.ACCESSORY) continue; // Spec said accessories, can extend to others
            
            long availableCount = assetRepository.countByTypeAndStatus(type, AssetStatus.AVAILABLE);
            
            if (availableCount < threshold) {
                List<User> admins = userRepository.findAll().stream()
                        .filter(u -> u.getRole() == Role.ADMIN)
                        .toList();
                
                String msg = "Low stock alert: Only " + availableCount + " " + type + "s available.";
                for (User admin : admins) {
                    notificationService.createNotification(admin, msg, NotificationType.LOW_STOCK);
                    emailService.sendLowStockEmail(admin, type, availableCount);
                }
                log.warn(msg);
            }
        }
    }
}
