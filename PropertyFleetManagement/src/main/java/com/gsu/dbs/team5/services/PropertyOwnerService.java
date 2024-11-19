package com.gsu.dbs.team5.services;

import com.gsu.dbs.team5.entities.PropertyOwner;
import com.gsu.dbs.team5.repositories.PropertyOwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyOwnerService {

    private final PropertyOwnerRepository propertyOwnerRepository;
    private final BCryptPasswordEncoder passwordEncoder;  // Injected BCryptPasswordEncoder

    @Autowired
    public PropertyOwnerService(PropertyOwnerRepository propertyOwnerRepository, BCryptPasswordEncoder passwordEncoder) {
        this.propertyOwnerRepository = propertyOwnerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Save property owner with hashed password
    public PropertyOwner savePropertyOwner(PropertyOwner propertyOwner) {
        // Hash the password before saving
        propertyOwner.setPassword(passwordEncoder.encode(propertyOwner.getPassword()));
        return propertyOwnerRepository.save(propertyOwner);
    }

    // Find property owner by email for login
    public Optional<PropertyOwner> findByEmail(String email) {
        return propertyOwnerRepository.findByEmail(email);
    }

    // Verify password during login
    public boolean verifyPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);  // Compare the raw password with the hashed password
    }

    // Delete property owner by id
    public void deletePropertyOwner(Integer id) {
        propertyOwnerRepository.deleteById(id);  // Deletes the property owner with the given id from the repository
    }

    // Get all property owners
    public List<PropertyOwner> getAllPropertyOwners() {
        return propertyOwnerRepository.findAll();  // Returns a list of all property owners
    }

    // Get a specific property owner by id
    public Optional<PropertyOwner> getPropertyOwnerById(Integer id) {
        return propertyOwnerRepository.findById(id);  // Finds and returns a property owner by their id
    }
    
}
