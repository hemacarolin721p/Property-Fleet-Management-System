package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.entities.Property;
import com.gsu.dbs.team5.entities.Unit;
import com.gsu.dbs.team5.services.PropertyService;
import com.gsu.dbs.team5.services.UnitService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/units")
public class UnitController {

    private final UnitService unitService;
    private final PropertyService propertyService;

    public UnitController(UnitService unitService, PropertyService propertyService) {
        this.unitService = unitService;
        this.propertyService = propertyService;  // Make sure this is initialized
    }

    // Get all units    
    @GetMapping
    public ResponseEntity<List<Unit>> getAllUnits() {
        return ResponseEntity.ok(unitService.getAllUnits());
    }

    // Get unit by unitId and propertyId
    @GetMapping("/{unitId}/{propertyId}")
    public ResponseEntity<Unit> getUnitById(@PathVariable int unitId, @PathVariable int propertyId) {
        return unitService.getUnitById(unitId, propertyId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new unit, passing both the Unit and propertyId
    @PostMapping("/{propertyId}")
    public ResponseEntity<Unit> createUnit(@RequestBody Unit unit, @PathVariable int propertyId) {
        // Retrieve the Property by its propertyId
        Property property = propertyService.getPropertyById(propertyId)
            .orElseThrow(() -> new RuntimeException("Property with id " + propertyId + " not found"));
    
        // Generate the next Unit ID (based on propertyId or other criteria)
        int nextUnitId = unitService.getNextUnitId();
    
        // Set the generated unitId to the Unit object
        unit.setUnitId(nextUnitId);
    
        // Set the retrieved Property object to the Unit
        unit.setProperty(property);  // Link the Unit with the Property
    
        // Save the Unit using the service
        Unit savedUnit = unitService.saveUnit(unit);
    
        // Return the saved Unit
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUnit);
    }

    // Delete unit by unitId and propertyId
    @DeleteMapping("/{unitId}/{propertyId}")
    public ResponseEntity<Void> deleteUnit(@PathVariable int unitId, @PathVariable int propertyId) {
        unitService.deleteUnit(unitId, propertyId);
        return ResponseEntity.noContent().build();
    }
   
    @GetMapping("/search")
    public ResponseEntity<List<Unit>> searchUnits(
            @RequestParam(required = false) Integer propertyId,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) Integer bathrooms) {
        
        List<Unit> units = unitService.searchUnits(propertyId, bedrooms, bathrooms);
        return ResponseEntity.ok(units);
    }

}
