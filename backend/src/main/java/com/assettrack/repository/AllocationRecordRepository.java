package com.assettrack.repository;

import com.assettrack.domain.AllocationRecord;
import com.assettrack.domain.Asset;
import com.assettrack.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AllocationRecordRepository extends JpaRepository<AllocationRecord, UUID> {
    List<AllocationRecord> findByAssetOrderByAssignedAtDesc(Asset asset);
    List<AllocationRecord> findByAssignedToOrderByAssignedAtDesc(User user);
}
