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
public class PropertyOwner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ownerId; // Primary key for PropertyOwner

    private String firstName;          // Owner's first name
    private String lastName;           // Owner's last name
    private String contactInformation;  // Owner's contact information
    private String email;              // Owner's email address
    private String password;           // Owner's password
}
