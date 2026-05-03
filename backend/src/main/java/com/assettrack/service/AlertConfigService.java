package com.assettrack.service;

import com.assettrack.domain.AlertConfig;
import com.assettrack.dto.request.AlertConfigRequest;
import com.assettrack.dto.response.AlertConfigResponse;
import com.assettrack.repository.AlertConfigRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AlertConfigService {

    private final AlertConfigRepository alertConfigRepository;

    @PostConstruct
    public void init() {
        if (alertConfigRepository.count() == 0) {
            AlertConfig config = AlertConfig.builder()
                    .id(1L)
                    .warrantyWarningDays(30)
                    .lowStockThreshold(3)
                    .build();
            alertConfigRepository.save(config);
        }
    }

    @Transactional(readOnly = true)
    public AlertConfigResponse getConfig() {
        AlertConfig config = alertConfigRepository.findById(1L).orElseThrow();
        AlertConfigResponse response = new AlertConfigResponse();
        response.setWarrantyWarningDays(config.getWarrantyWarningDays());
        response.setLowStockThreshold(config.getLowStockThreshold());
        return response;
    }

    @Transactional
    public AlertConfigResponse updateConfig(AlertConfigRequest request) {
        AlertConfig config = alertConfigRepository.findById(1L).orElseThrow();
        config.setWarrantyWarningDays(request.getWarrantyWarningDays());
        config.setLowStockThreshold(request.getLowStockThreshold());
        alertConfigRepository.save(config);
        return getConfig();
    }
}
