package com.gsu.dbs.team5.controllers;

import java.util.List;
import java.util.Optional;

import javax.management.relation.RelationNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gsu.dbs.team5.services.ResidentService;
import com.gsu.dbs.team5.DTO.ResidentDTO;
import com.gsu.dbs.team5.DTO.ResidentLoginRequest;
import com.gsu.dbs.team5.entities.Resident;

@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/residents")
public class ResidentController {
    @Autowired
    private ResidentService residentService;

    @GetMapping
    public List<Resident> getAllResidents() {
        return residentService.getAllResidents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resident> getResidentById(@PathVariable Integer id) throws RelationNotFoundException {
        Resident resident = residentService.getResidentById(id);
        return ResponseEntity.ok(resident);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resident> updateResident(@PathVariable Integer id, @RequestBody Resident residentDetails) throws RelationNotFoundException {
        Resident updatedResident = residentService.updateResident(id, residentDetails);
        return ResponseEntity.ok(updatedResident);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResident(@PathVariable Integer id) throws RelationNotFoundException {
        residentService.deleteResident(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody ResidentLoginRequest request) {
        // Find resident by email (no password check)
        Optional<Resident> resident = residentService.findByEmail(request.getEmail());

        if (resident.isPresent()) {
            return ResponseEntity.ok("Login successful");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email. Please try again.");
    }
        @PostMapping
    public ResponseEntity<Resident> createResident(@RequestBody ResidentDTO residentDTO) {
        Resident savedResident = residentService.saveResident(residentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedResident);
    }
}
