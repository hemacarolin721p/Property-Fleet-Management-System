package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.entities.ParkingSpot;
import com.gsu.dbs.team5.entities.ParkingSpotId;
import com.gsu.dbs.team5.services.ParkingSpotService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/parking-spots")
public class ParkingSpotController {

    private final ParkingSpotService parkingSpotService;

    public ParkingSpotController(ParkingSpotService parkingSpotService) {
        this.parkingSpotService = parkingSpotService;
    }

    @GetMapping
    public List<ParkingSpot> getAllParkingSpots() {
        return parkingSpotService.getAllParkingSpots();
    }

    @GetMapping("/{parkingSpotNumber}/{propertyId}")
    public ResponseEntity<ParkingSpot> getParkingSpotById(@PathVariable int parkingSpotNumber, @PathVariable int propertyId) {
        ParkingSpotId id = new ParkingSpotId();
        id.setParkingSpotNumber(parkingSpotNumber);
        id.setPropertyId(propertyId);

        return parkingSpotService.getParkingSpotById(id)
                .map(parkingSpot -> ResponseEntity.ok(parkingSpot))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ParkingSpot> createParkingSpot(@RequestBody ParkingSpot parkingSpot) {
        ParkingSpot savedParkingSpot = parkingSpotService.saveParkingSpot(parkingSpot);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedParkingSpot);
    }

    @DeleteMapping("/{parkingSpotNumber}/{propertyId}")
    public ResponseEntity<Void> deleteParkingSpot(@PathVariable int parkingSpotNumber, @PathVariable int propertyId) {
        ParkingSpotId id = new ParkingSpotId();
        id.setParkingSpotNumber(parkingSpotNumber);
        id.setPropertyId(propertyId);
        
        parkingSpotService.deleteParkingSpot(id);
        return ResponseEntity.noContent().build();
    }
}
