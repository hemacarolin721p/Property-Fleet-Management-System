package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.entities.VisitorLog;
import com.gsu.dbs.team5.services.VisitorLogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/visitor-logs")
public class VisitorLogController {

    private final VisitorLogService visitorLogService;

    public VisitorLogController(VisitorLogService visitorLogService) {
        this.visitorLogService = visitorLogService;
    }

    @GetMapping
    public List<VisitorLog> getAllVisitorLogs() {
        return visitorLogService.getAllVisitorLogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VisitorLog> getVisitorLogById(@PathVariable Integer id) {
        return visitorLogService.getVisitorLogById(id)
                .map(visitorLog -> ResponseEntity.ok(visitorLog))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<VisitorLog> createVisitorLog(@RequestBody VisitorLog visitorLog) {
        VisitorLog savedVisitorLog = visitorLogService.saveVisitorLog(visitorLog);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVisitorLog);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisitorLog(@PathVariable Integer id) {
        visitorLogService.deleteVisitorLog(id);
        return ResponseEntity.noContent().build();
    }
}
