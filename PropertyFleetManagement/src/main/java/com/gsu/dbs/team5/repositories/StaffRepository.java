package com.gsu.dbs.team5.repositories;

import com.gsu.dbs.team5.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer> {
    // Custom query methods can be added here if needed
    Staff findByFirstNameAndLastName(String firstName, String lastName);

    // Custom query to find all staff with their assigned properties and units
    // @Query("SELECT s FROM Staff s " +
    //        "LEFT JOIN s.assignedProperty p " +  // Use the entity relationship
    //        "LEFT JOIN Unit u ON p.propertyId = u.property.propertyId")  // Use the entity relationship
    // List<Staff> findAllStaffWithPropertiesAndUnits();
    
    @Query("SELECT s FROM Staff s " +
           "LEFT JOIN s.assignedProperty p " +  // Use the entity relationship
           "LEFT JOIN Unit u ON p.propertyId = u.property.propertyId")  // Use the entity relationship
    List<Staff> findAllStaffWithPropertiesAndUnits();
}