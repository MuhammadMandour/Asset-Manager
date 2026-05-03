package com.assettrack.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "condition_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConditionReport {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id")
    private Asset asset;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_by_id")
    private User reportedBy;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDateTime reportedAt;

    @Builder.Default
    private boolean resolved = false;

    private LocalDateTime resolvedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resolved_by_id")
    private User resolvedBy;
}
