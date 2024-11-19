package com.gsu.dbs.team5.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VisitorLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int visitorLogId;

    private String visitorName;
    private LocalDate dateOfVisit;
    private String accessMethod;
    private LocalTime entryTime;
    private LocalTime exitTime;

    @ManyToOne
    @JoinColumn(name = "resident_id", referencedColumnName = "residentId")
    private Resident resident;

    private int unitId;
}