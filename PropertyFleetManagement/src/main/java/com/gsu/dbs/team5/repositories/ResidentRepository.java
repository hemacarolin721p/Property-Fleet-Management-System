package com.gsu.dbs.team5.repositories;


import com.gsu.dbs.team5.entities.Resident; // Adjust the package name based on your structure
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.lang.Integer;
import java.util.Optional;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Integer> {
    // Additional custom query methods can be defined here if needed
    Optional<Resident> findByEmail(String email);


}