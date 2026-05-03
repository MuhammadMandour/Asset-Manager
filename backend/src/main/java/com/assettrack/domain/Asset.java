package com.assettrack.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    private AssetType type;

    private String brand;
    private String model;

    @Column(unique = true, nullable = false)
    private String serialNumber;

    private LocalDate purchaseDate;
    private LocalDate warrantyExpirationDate;

    @Enumerated(EnumType.STRING)
    private AssetStatus status;

    @Enumerated(EnumType.STRING)
    private AssetCondition condition;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_owner_id")
    private User currentOwner;

    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL)
    @Builder.Default
    private List<AllocationRecord> allocationHistory = new ArrayList<>();

    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL)
    @Builder.Default
    private List<ConditionReport> conditionReports = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
