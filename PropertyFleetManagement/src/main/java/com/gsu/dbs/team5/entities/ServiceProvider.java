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
public class ServiceProvider {

    @EmbeddedId
    private ServiceProviderId id;

    private String contactInformation;
    private LocalDate contractStartDate;
    private LocalDate contractEndDate;
    private String status;

    @ManyToOne
    @JoinColumn(name = "assigned_property_id", referencedColumnName = "propertyId")
    private Property assignedProperty;
}
