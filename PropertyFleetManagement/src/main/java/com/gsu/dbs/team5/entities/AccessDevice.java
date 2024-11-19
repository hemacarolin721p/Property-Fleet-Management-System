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
public class AccessDevice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accessDeviceId;

    @ManyToOne
    @JoinColumn(name = "resident_id", nullable = false)
    private Resident resident; // Foreign key reference to Resident

    private String deviceNumber;
    private String accessLevel;
    private LocalDate activationDate;
    private LocalDate deactivationDate;
    private String accessMethod;
}
