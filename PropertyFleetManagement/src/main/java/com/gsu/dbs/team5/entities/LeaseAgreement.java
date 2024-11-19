package com.gsu.dbs.team5.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaseAgreement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int leaseAgreementId;

    private LocalDate leaseStartDate;
    private LocalDate leaseEndDate;

    private BigDecimal rentAmount;  // Using BigDecimal for financial data
    private BigDecimal securityDeposit;
    
    private String paymentFrequency;
    private String status;

    // Foreign key fields for composite key reference to Unit
    @Column(name = "unit_id", insertable = false, updatable = false)
    private int unitId; // Add this field

    @Column(name = "property_id", insertable = false, updatable = false)
    private int propertyId; // Add this field

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "unit_id", referencedColumnName = "unitId", insertable = false, updatable = false),
        @JoinColumn(name = "property_id", referencedColumnName = "property_id", insertable = false, updatable = false)
    })
    private Unit unit;

    @ManyToOne
    @JoinColumn(name = "resident_id", insertable = false, updatable = false)
    private Resident resident;

    @ManyToOne
    @JoinColumn(name = "property_id", insertable = false, updatable = false)
    private Property property;
}
