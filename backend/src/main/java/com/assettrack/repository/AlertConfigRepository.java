package com.assettrack.repository;

import com.assettrack.domain.AlertConfig;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertConfigRepository extends JpaRepository<AlertConfig, Long> {
}
