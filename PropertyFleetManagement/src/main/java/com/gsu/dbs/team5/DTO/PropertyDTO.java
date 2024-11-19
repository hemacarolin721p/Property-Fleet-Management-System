package com.gsu.dbs.team5.DTO;

import java.time.LocalDate;

import com.gsu.dbs.team5.entities.PropertyOwner;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDTO {
 // Foreign key to PropertyOwner
    private int propertyId;
    private String propertyName;
    private String city;
    private String state;
    private String street;
    private String zipcode;
    private String type;
    private Integer numberOfUnits;
    private Integer ownerId;  // Foreign key to PropertyOwner
    private PropertyOwner propertyOwner;
    private Double propertySize; // Using Double for DECIMAL in MySQL
    private String constructionDate; 
}
