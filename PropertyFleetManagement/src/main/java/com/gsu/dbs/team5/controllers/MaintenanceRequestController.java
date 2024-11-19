package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.entities.MaintenanceRequest;
import com.gsu.dbs.team5.services.MaintenanceRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/maintenance-requests")
public class MaintenanceRequestController {

    private final MaintenanceRequestService maintenanceRequestService;

    public MaintenanceRequestController(MaintenanceRequestService maintenanceRequestService) {
        this.maintenanceRequestService = maintenanceRequestService;
    }

    @GetMapping
    public List<MaintenanceRequest> getAllMaintenanceRequests() {
        return maintenanceRequestService.getAllMaintenanceRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRequest> getMaintenanceRequestById(@PathVariable Integer id) {
        return maintenanceRequestService.getMaintenanceRequestById(id)
                .map(maintenanceRequest -> ResponseEntity.ok(maintenanceRequest))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MaintenanceRequest> createMaintenanceRequest(@RequestBody MaintenanceRequest maintenanceRequest) {
        MaintenanceRequest savedMaintenanceRequest = maintenanceRequestService.saveMaintenanceRequest(maintenanceRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMaintenanceRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaintenanceRequest(@PathVariable Integer id) {
        maintenanceRequestService.deleteMaintenanceRequest(id);
        return ResponseEntity.noContent().build();
    }
}
