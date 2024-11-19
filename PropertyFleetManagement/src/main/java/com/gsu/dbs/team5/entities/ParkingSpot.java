package com.gsu.dbs.team5.entities;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ParkingSpotId.class) // Composite key class
public class ParkingSpot {

    @Id
    @Column(name = "parking_spot_number")
    private int parkingSpotNumber;

    @Id
    @Column(name = "property_id")
    private int propertyId;

    @ManyToOne
    @JoinColumn(name = "resident_id", nullable = true) // Nullable for available spots
    private Resident resident; // Foreign key reference to Resident

    private Integer vehicleId; // Assuming vehicle_id is nullable

    private String availability;
    private LocalDate reservedDate;
    private LocalDate expirationDate;
}
