package com.gsu.dbs.team5.repositories;

import com.gsu.dbs.team5.entities.Property; // Adjust the package name based on your structure

import jakarta.persistence.criteria.CriteriaBuilder.In;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.lang.Integer;


@Repository
public interface PropertyRepository extends JpaRepository<Property, Integer> {
    // Additional custom query methods can be defined here if needed
}
