package com.gsu.dbs.team5.entities;

import java.io.Serializable;

public class ParkingSpotId implements Serializable {
    private int parkingSpotNumber;
    private int propertyId;

    // Default constructor
    public ParkingSpotId() {}

    // Getters and Setters
    public int getParkingSpotNumber() {
        return parkingSpotNumber;
    }

    public void setParkingSpotNumber(int parkingSpotNumber) {
        this.parkingSpotNumber = parkingSpotNumber;
    }

    public int getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(int propertyId) {
        this.propertyId = propertyId;
    }

    // hashCode and equals methods
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ParkingSpotId)) return false;

        ParkingSpotId that = (ParkingSpotId) o;

        if (parkingSpotNumber != that.parkingSpotNumber) return false;
        return propertyId == that.propertyId;
    }

    @Override
    public int hashCode() {
        int result = parkingSpotNumber;
        result = 31 * result + propertyId;
        return result;
    }
}
