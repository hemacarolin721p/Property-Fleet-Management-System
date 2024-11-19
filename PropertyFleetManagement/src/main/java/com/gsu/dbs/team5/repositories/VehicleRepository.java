package com.gsu.dbs.team5.repositories;

import com.gsu.dbs.team5.entities.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {
    // Custom query methods can be added here if needed
}
