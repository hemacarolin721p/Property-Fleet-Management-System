package com.gsu.dbs.team5.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data  // Lombok will generate getters, setters, toString, equals, and hashCode methods
@NoArgsConstructor  // Lombok will generate a no-args constructor
@AllArgsConstructor  // Lombok will generate an all-args constructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int propertyId;

    private String propertyName;
    private String city;
    private String state;
    private String street;
    private String zipcode;
    private String type;
    private Integer numberOfUnits;
    @OneToOne  // Establishing the many-to-one relationship
    @JoinColumn(name = "owner_id", nullable = false) // Foreign key in property table
    private PropertyOwner propertyOwner;
    private Double propertySize; // Using Double for DECIMAL in MySQL
    private String constructionDate; // Change to LocalDate if you want to work with dates properly
}