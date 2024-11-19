package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.entities.PropertyOwner;
import com.gsu.dbs.team5.services.PropertyOwnerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/property-owners")
public class PropertyOwnerController {

    private final PropertyOwnerService propertyOwnerService;

    public PropertyOwnerController(PropertyOwnerService propertyOwnerService) {
        this.propertyOwnerService = propertyOwnerService;
    }

    @GetMapping
    public List<PropertyOwner> getAllPropertyOwners() {
        return propertyOwnerService.getAllPropertyOwners();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyOwner> getPropertyOwnerById(@PathVariable Integer id) {
        return propertyOwnerService.getPropertyOwnerById(id)
                .map(propertyOwner -> ResponseEntity.ok(propertyOwner))
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<PropertyOwner> createPropertyOwner(@RequestBody PropertyOwner propertyOwner) {
        PropertyOwner savedPropertyOwner = propertyOwnerService.savePropertyOwner(propertyOwner);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPropertyOwner);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody PropertyOwner loginRequest) {
        Optional<PropertyOwner> owner = propertyOwnerService.findByEmail(loginRequest.getEmail());

        if (owner.isPresent()) {
            PropertyOwner propertyOwner = owner.get();

            // Verify the password using BCrypt
            if (propertyOwnerService.verifyPassword(loginRequest.getPassword(), propertyOwner.getPassword())) {
                return ResponseEntity.ok("Login successful");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePropertyOwner(@PathVariable Integer id) {
        propertyOwnerService.deletePropertyOwner(id);
        return ResponseEntity.noContent().build();
    }
}
