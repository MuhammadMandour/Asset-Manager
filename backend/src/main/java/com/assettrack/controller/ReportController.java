package com.assettrack.controller;

import com.assettrack.dto.response.AllocationRecordResponse;
import com.assettrack.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/usage")
    public ResponseEntity<Map<String, Object>> getUsageStatistics(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(reportService.getUsageStatistics(from, to));
    }

    @GetMapping("/conditions")
    public ResponseEntity<Map<String, Map<String, Long>>> getConditionSummary() {
        return ResponseEntity.ok(reportService.getConditionSummary());
    }

    @GetMapping("/allocation/{assetId}")
    public ResponseEntity<List<AllocationRecordResponse>> getAllocationHistory(@PathVariable UUID assetId) {
        return ResponseEntity.ok(reportService.getAllocationHistory(assetId));
    }
}
