package com.gsu.dbs.team5.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    private String vehicleLicenseNumber;

    @ManyToOne
    @JoinColumn(name = "resident_id", referencedColumnName = "residentId")
    private Resident resident;

    @ManyToOne
    @JoinColumn(name = "property_id", referencedColumnName = "propertyId", insertable = false, updatable = false)
    private Property property;

    private String vehicleMake;
    private String vehicleModel;
    private LocalDate registrationDate;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "parking_spot_id", referencedColumnName = "parking_spot_number"),
        @JoinColumn(name = "property_id", referencedColumnName = "property_id")
    })
    private ParkingSpot parkingSpot;
}
