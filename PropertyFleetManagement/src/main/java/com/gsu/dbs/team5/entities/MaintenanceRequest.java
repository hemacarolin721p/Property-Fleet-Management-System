package com.gsu.dbs.team5.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    @ManyToOne
    @JoinColumn(name = "resident_id", nullable = false)
    private Resident resident; // Foreign key reference to Resident

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property; // Foreign key reference to Property

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "unit_id", referencedColumnName = "unitId", insertable = false, updatable = false),
        @JoinColumn(name = "property_id", referencedColumnName = "property_id", insertable = false, updatable = false)
    })
    private Unit unit; // Foreign key reference to Unit

    private String issueDescription;
    private LocalDate requestDate;
    private String priority;
    private String status;

    private Integer assignedStaffId; // Assuming staff ID is an Integer
    private LocalDate resolutionDate;
}
