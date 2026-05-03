package com.assettrack.repository;

import com.assettrack.domain.Asset;
import com.assettrack.domain.AssetStatus;
import com.assettrack.domain.AssetType;
import com.assettrack.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface AssetRepository extends JpaRepository<Asset, UUID>, JpaSpecificationExecutor<Asset> {
    List<Asset> findByCurrentOwner(User user);
    List<Asset> findByStatusAndType(AssetStatus status, AssetType type);
    List<Asset> findByWarrantyExpirationDateBefore(LocalDate date);
    List<Asset> findByWarrantyExpirationDateBetween(LocalDate start, LocalDate end);
    long countByTypeAndStatus(AssetType type, AssetStatus status);
}
