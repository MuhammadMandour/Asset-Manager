package com.assettrack.controller;

import com.assettrack.domain.AssetStatus;
import com.assettrack.domain.AssetType;
import com.assettrack.dto.request.AssignAssetRequest;
import com.assettrack.dto.request.CreateAssetRequest;
import com.assettrack.dto.request.UpdateAssetRequest;
import com.assettrack.dto.response.AssetDetailResponse;
import com.assettrack.dto.response.AssetResponse;
import com.assettrack.dto.response.PagedResponse;
import com.assettrack.dto.response.SpareAssetResponse;
import com.assettrack.service.AssetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AssetResponse> createAsset(@Valid @RequestBody CreateAssetRequest request) {
        return ResponseEntity.ok(assetService.createAsset(request));
    }

    @GetMapping
    public ResponseEntity<PagedResponse<AssetResponse>> getAllAssets(Pageable pageable) {
        return ResponseEntity.ok(assetService.getAllAssets(pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<PagedResponse<AssetResponse>> searchAssets(
            @RequestParam(required = false) String serialNumber,
            @RequestParam(required = false) UUID userId,
            @RequestParam(required = false) AssetStatus status,
            @RequestParam(required = false) AssetType type,
            @RequestParam(required = false) String brand,
            Pageable pageable) {
        return ResponseEntity.ok(assetService.searchAssets(serialNumber, userId, status, type, brand, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetDetailResponse> getAssetById(@PathVariable UUID id) {
        return ResponseEntity.ok(assetService.getAssetById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<AssetResponse> updateAsset(@PathVariable UUID id, @Valid @RequestBody UpdateAssetRequest request) {
        return ResponseEntity.ok(assetService.updateAsset(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAsset(@PathVariable UUID id) {
        assetService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/assign")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<AssetResponse> assignAsset(@PathVariable UUID id, @Valid @RequestBody AssignAssetRequest request) {
        return ResponseEntity.ok(assetService.assignAsset(id, request));
    }

    @PostMapping("/{id}/unassign")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER')")
    public ResponseEntity<AssetResponse> unassignAsset(@PathVariable UUID id) {
        return ResponseEntity.ok(assetService.unassignAsset(id));
    }

    @GetMapping("/spares")
    public ResponseEntity<List<SpareAssetResponse>> getSpareAssets() {
        return ResponseEntity.ok(assetService.getSpareAssets());
    }
}
