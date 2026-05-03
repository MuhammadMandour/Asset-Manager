package com.assettrack.controller;

import com.assettrack.dto.request.ConditionReportRequest;
import com.assettrack.dto.response.ConditionReportResponse;
import com.assettrack.service.ConditionReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/condition-reports")
@RequiredArgsConstructor
public class ConditionReportController {

    private final ConditionReportService conditionReportService;

    @PostMapping("/asset/{assetId}")
    public ResponseEntity<ConditionReportResponse> createReport(@PathVariable UUID assetId, @Valid @RequestBody ConditionReportRequest request) {
        return ResponseEntity.ok(conditionReportService.createReport(assetId, request));
    }

    @GetMapping("/asset/{assetId}")
    public ResponseEntity<List<ConditionReportResponse>> getReportsForAsset(@PathVariable UUID assetId) {
        return ResponseEntity.ok(conditionReportService.getReportsForAsset(assetId));
    }

    @GetMapping("/unresolved")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<List<ConditionReportResponse>> getAllUnresolvedReports() {
        return ResponseEntity.ok(conditionReportService.getAllUnresolvedReports());
    }

    @PutMapping("/{reportId}/resolve")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<ConditionReportResponse> resolveReport(@PathVariable UUID reportId) {
        return ResponseEntity.ok(conditionReportService.resolveReport(reportId));
    }
}
