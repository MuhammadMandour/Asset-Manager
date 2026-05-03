package com.assettrack.controller;

import com.assettrack.dto.request.AlertConfigRequest;
import com.assettrack.dto.response.AlertConfigResponse;
import com.assettrack.service.AlertConfigService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/alerts/config")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AlertConfigController {

    private final AlertConfigService alertConfigService;

    @GetMapping
    public ResponseEntity<AlertConfigResponse> getConfig() {
        return ResponseEntity.ok(alertConfigService.getConfig());
    }

    @PutMapping
    public ResponseEntity<AlertConfigResponse> updateConfig(@Valid @RequestBody AlertConfigRequest request) {
        return ResponseEntity.ok(alertConfigService.updateConfig(request));
    }
}
