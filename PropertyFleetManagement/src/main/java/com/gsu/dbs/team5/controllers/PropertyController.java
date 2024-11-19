package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.DTO.PropertyDTO;
import com.gsu.dbs.team5.entities.Property;
import com.gsu.dbs.team5.entities.PropertyOwner;
import com.gsu.dbs.team5.services.PropertyOwnerService;
import com.gsu.dbs.team5.services.PropertyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
public class PropertyController {

    private final PropertyService propertyService;
    private final PropertyOwnerService propertyOwnerService;  // Inject PropertyOwnerService

    public PropertyController(PropertyService propertyService, PropertyOwnerService propertyOwnerService) {
        this.propertyService = propertyService;
        this.propertyOwnerService = propertyOwnerService;
    }

    // Endpoint to get all properties
    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    // Endpoint to get a property by ID
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Integer id) {
        return propertyService.getPropertyById(id)
                .map(property -> ResponseEntity.ok(property))
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint to create a property
    @PostMapping
    public ResponseEntity<Property> createProperty(@RequestBody PropertyDTO propertyDTO) {
        // Fetch the PropertyOwner using the PropertyOwnerService
        PropertyOwner owner = propertyOwnerService.getPropertyOwnerById(propertyDTO.getOwnerId()).get();
        // Map the DTO to the Property entity and set the PropertyOwner
        Property property = new Property();
        property.setPropertyName(propertyDTO.getPropertyName());
        property.setCity(propertyDTO.getCity());
        property.setState(propertyDTO.getState());
        property.setStreet(propertyDTO.getStreet());
        property.setZipcode(propertyDTO.getZipcode());
        property.setType(propertyDTO.getType());
        property.setNumberOfUnits(propertyDTO.getNumberOfUnits());
        property.setPropertySize(propertyDTO.getPropertySize());
        property.setConstructionDate(propertyDTO.getConstructionDate());
        property.setPropertyOwner(owner);  // Set the fetched PropertyOwner

        // Save the property using the PropertyService
        Property savedProperty = propertyService.saveProperty(property);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProperty);
    }

    // Endpoint to delete a property by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Integer id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }
}