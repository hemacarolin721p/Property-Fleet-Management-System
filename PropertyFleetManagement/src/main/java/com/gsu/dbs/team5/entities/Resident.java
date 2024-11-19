package com.gsu.dbs.team5.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data  // Lombok will generate getters, setters, toString, equals, and hashCode methods
@NoArgsConstructor  // Lombok will generate a no-args constructor
@AllArgsConstructor  // Lombok will generate an all-args constructor
public class Resident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int residentId;
    private String firstName;
    private String lastName;
    private String email;
    private java.sql.Date moveInDate;
    private java.sql.Date moveOutDate;
    private String contactInformation;
}