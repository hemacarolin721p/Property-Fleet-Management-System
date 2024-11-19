package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.entities.LeaseAgreement;
import com.gsu.dbs.team5.services.LeaseAgreementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/lease-agreements")
public class LeaseAgreementController {

    private final LeaseAgreementService leaseAgreementService;

    public LeaseAgreementController(LeaseAgreementService leaseAgreementService) {
        this.leaseAgreementService = leaseAgreementService;
    }

    @GetMapping
    public List<LeaseAgreement> getAllLeaseAgreements() {
        return leaseAgreementService.getAllLeaseAgreements();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeaseAgreement> getLeaseAgreementById(@PathVariable Integer id) {
        return leaseAgreementService.getLeaseAgreementById(id)
                .map(leaseAgreement -> ResponseEntity.ok(leaseAgreement))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<LeaseAgreement> createLeaseAgreement(@RequestBody LeaseAgreement leaseAgreement) {
        LeaseAgreement savedLeaseAgreement = leaseAgreementService.saveLeaseAgreement(leaseAgreement);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLeaseAgreement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeaseAgreement(@PathVariable Integer id) {
        leaseAgreementService.deleteLeaseAgreement(id);
        return ResponseEntity.noContent().build();
    }
}
