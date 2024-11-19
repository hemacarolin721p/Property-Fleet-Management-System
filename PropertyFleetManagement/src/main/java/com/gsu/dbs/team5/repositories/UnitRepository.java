package com.gsu.dbs.team5.repositories;

import com.gsu.dbs.team5.entities.Unit;
import com.gsu.dbs.team5.entities.UnitId;
import com.gsu.dbs.team5.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnitRepository extends JpaRepository<Unit, UnitId> {
    
    List<Unit> findByProperty(Property property);
    
    long countByProperty_PropertyId(int propertyId);
    
    @Query("SELECT po.ownerId, COUNT(u) FROM PropertyOwner po " +
           "INNER JOIN Property p ON po.ownerId = p.propertyOwner.ownerId " +  // Use correct references to propertyOwner
           "INNER JOIN Unit u ON p.propertyId = u.property.propertyId " +  // Use entity relationships
           "INNER JOIN Staff s ON p.propertyId = s.assignedProperty.propertyId " +
           "WHERE s.employmentStatus = 'Active' " +
           "GROUP BY po.ownerId")
    List<Object[]> countUnitsByPropertyOwnerWithActiveStaff();

    @Query(value = "SELECT * FROM Unit u INNER JOIN Property p ON u.property_id = p.property_id WHERE u.rent_amount > (SELECT AVG(u2.rent_amount) FROM Unit u2 INNER JOIN Property p2 ON u2.property_id = p2.property_id WHERE p2.type = p.type)", nativeQuery = true)
    List<Unit> findUnitsAboveAverageRent();
    @Query("SELECT u FROM Unit u " +
    "JOIN u.property p " +  // Joining the Property entity
    "WHERE (:propertyId IS NULL OR p.propertyId = :propertyId) " +
    "AND (:bedrooms IS NULL OR u.bedrooms = :bedrooms) " +
    "AND (:bathrooms IS NULL OR u.bathrooms = :bathrooms)")
List<Unit> searchUnits(
 @Param("propertyId") Integer propertyId,
 @Param("bedrooms") Integer bedrooms,
 @Param("bathrooms") Integer bathrooms
);

}
