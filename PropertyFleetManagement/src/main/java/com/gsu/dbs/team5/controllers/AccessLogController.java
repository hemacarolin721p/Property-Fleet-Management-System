package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.entities.AccessLog;
import com.gsu.dbs.team5.services.AccessLogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/access-logs")
public class AccessLogController {

    private final AccessLogService accessLogService;

    public AccessLogController(AccessLogService accessLogService) {
        this.accessLogService = accessLogService;
    }

    @GetMapping
    public List<AccessLog> getAllAccessLogs() {
        return accessLogService.getAllAccessLogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccessLog> getAccessLogById(@PathVariable int id) {
        return accessLogService.getAccessLogById(id)
                .map(accessLog -> ResponseEntity.ok(accessLog))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AccessLog> createAccessLog(@RequestBody AccessLog accessLog) {
        AccessLog savedAccessLog = accessLogService.saveAccessLog(accessLog);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAccessLog);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccessLog(@PathVariable int id) {
        accessLogService.deleteAccessLog(id);
        return ResponseEntity.noContent().build();
    }
}
