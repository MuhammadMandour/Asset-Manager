package com.assettrack.service;

import com.assettrack.domain.Asset;
import com.assettrack.domain.ConditionReport;
import com.assettrack.domain.NotificationType;
import com.assettrack.domain.User;
import com.assettrack.dto.request.ConditionReportRequest;
import com.assettrack.dto.response.ConditionReportResponse;
import com.assettrack.exception.ResourceNotFoundException;
import com.assettrack.mapper.ConditionReportMapper;
import com.assettrack.repository.AssetRepository;
import com.assettrack.repository.ConditionReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConditionReportService {

    private final ConditionReportRepository conditionReportRepository;
    private final AssetRepository assetRepository;
    private final UserService userService;
    private final ConditionReportMapper conditionReportMapper;
    private final NotificationService notificationService; // To notify admins? Optional but good.

    @Transactional
    public ConditionReportResponse createReport(UUID assetId, ConditionReportRequest request) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));

        User currentUser = userService.getCurrentUserEntity();

        ConditionReport report = ConditionReport.builder()
                .asset(asset)
                .reportedBy(currentUser)
                .description(request.getDescription())
                .reportedAt(LocalDateTime.now())
                .resolved(false)
                .build();

        report = conditionReportRepository.save(report);

        return conditionReportMapper.toResponse(report);
    }

    @Transactional(readOnly = true)
    public List<ConditionReportResponse> getReportsForAsset(UUID assetId) {
        Asset asset = assetRepository.findById(assetId)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not found"));
        return conditionReportRepository.findByAssetOrderByReportedAtDesc(asset).stream()
                .map(conditionReportMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ConditionReportResponse> getAllUnresolvedReports() {
        return conditionReportRepository.findByResolvedFalse().stream()
                .map(conditionReportMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ConditionReportResponse resolveReport(UUID reportId) {
        ConditionReport report = conditionReportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found"));

        User currentUser = userService.getCurrentUserEntity();

        report.setResolved(true);
        report.setResolvedAt(LocalDateTime.now());
        report.setResolvedBy(currentUser);

        report = conditionReportRepository.save(report);
        
        // Notify the user who reported it
        notificationService.createNotification(
                report.getReportedBy(),
                "Your condition report for asset " + report.getAsset().getSerialNumber() + " has been resolved.",
                NotificationType.CONDITION_REPORT
        );

        return conditionReportMapper.toResponse(report);
    }
}
