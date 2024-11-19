package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.entities.Vehicle;
import com.gsu.dbs.team5.services.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicles();
    }

    @GetMapping("/{licenseNumber}")
    public ResponseEntity<Vehicle> getVehicleByLicenseNumber(@PathVariable String licenseNumber) {
        return vehicleService.getVehicleByLicenseNumber(licenseNumber)
                .map(vehicle -> ResponseEntity.ok(vehicle))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        Vehicle savedVehicle = vehicleService.saveVehicle(vehicle);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVehicle);
    }

    @DeleteMapping("/{licenseNumber}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable String licenseNumber) {
        vehicleService.deleteVehicle(licenseNumber);
        return ResponseEntity.noContent().build();
    }
}
