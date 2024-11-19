package com.gsu.dbs.team5.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonArea {

    @EmbeddedId
    private CommonAreaId id;

    private String accessLevel;
    private String maintenanceSchedule;

    @ManyToOne
    @MapsId("propertyId")
    @JoinColumn(name = "property_id", referencedColumnName = "propertyId")
    private Property property;  // Foreign key reference to Property
}