package com.assettrack.repository;

import com.assettrack.domain.Asset;
import com.assettrack.domain.ConditionReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ConditionReportRepository extends JpaRepository<ConditionReport, UUID> {
    List<ConditionReport> findByAssetOrderByReportedAtDesc(Asset asset);
    List<ConditionReport> findByResolvedFalse();
}
