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
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int staffId;

    private String firstName;
    private String lastName;
    private String role;
    private String contactInformation;
    
    @ManyToOne
    @JoinColumn(name = "assigned_property_id", referencedColumnName = "propertyId")
    private Property assignedProperty;  // Foreign key to Property entity

    private LocalDate hireDate;
    private String employmentStatus;
}
