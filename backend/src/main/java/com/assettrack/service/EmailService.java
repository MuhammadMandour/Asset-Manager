package com.assettrack.service;

import com.assettrack.domain.Asset;
import com.assettrack.domain.AssetType;
import com.assettrack.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendWarrantyExpiryEmail(User user, Asset asset) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("AssetTrack Alert: Warranty Expiring Soon");
            message.setText("Hello " + user.getFullName() + ",\n\n" +
                    "The warranty for the following asset is expiring soon or has expired:\n" +
                    "Asset: " + asset.getBrand() + " " + asset.getModel() + "\n" +
                    "Serial Number: " + asset.getSerialNumber() + "\n" +
                    "Expiration Date: " + asset.getWarrantyExpirationDate() + "\n\n" +
                    "Please take appropriate action in AssetTrack.");
            mailSender.send(message);
        } catch (Exception e) {
            log.error("Failed to send warranty expiry email to {}", user.getEmail(), e);
        }
    }

    public void sendLowStockEmail(User user, AssetType type, long currentCount) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("AssetTrack Alert: Low Stock for " + type);
            message.setText("Hello " + user.getFullName() + ",\n\n" +
                    "The stock level for " + type + " has fallen below the configured threshold.\n" +
                    "Current available count: " + currentCount + "\n\n" +
                    "Please consider procuring more items.");
            mailSender.send(message);
        } catch (Exception e) {
            log.error("Failed to send low stock email to {}", user.getEmail(), e);
        }
    }
}
