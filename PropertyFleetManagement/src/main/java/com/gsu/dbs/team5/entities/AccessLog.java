package com.gsu.dbs.team5.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccessLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int accessLogId;

    private LocalDateTime accessDateTime;
    private String accessLocation;
    private String accessMethod;

    @ManyToOne
    @JoinColumn(name = "resident_id", referencedColumnName = "residentId")
    private Resident resident;  // Foreign key reference to Resident

    @ManyToOne
    @JoinColumn(name = "access_device_id", referencedColumnName = "accessDeviceId")
    private AccessDevice accessDevice;  // Foreign key reference to AccessDevice
}
