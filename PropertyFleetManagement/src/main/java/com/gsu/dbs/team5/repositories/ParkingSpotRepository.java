package com.gsu.dbs.team5.repositories;

import com.gsu.dbs.team5.entities.ParkingSpot;
import com.gsu.dbs.team5.entities.ParkingSpotId;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, ParkingSpotId> {
    // Additional custom query methods can be defined here if needed
}
