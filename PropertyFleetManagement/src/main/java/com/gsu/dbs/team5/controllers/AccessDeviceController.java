package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.entities.AccessDevice;
import com.gsu.dbs.team5.services.AccessDeviceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/access-devices")
public class AccessDeviceController {

    private final AccessDeviceService accessDeviceService;

    public AccessDeviceController(AccessDeviceService accessDeviceService) {
        this.accessDeviceService = accessDeviceService;
    }

    @GetMapping
    public List<AccessDevice> getAllAccessDevices() {
        return accessDeviceService.getAllAccessDevices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccessDevice> getAccessDeviceById(@PathVariable Integer id) {
        return accessDeviceService.getAccessDeviceById(id)
                .map(accessDevice -> ResponseEntity.ok(accessDevice))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AccessDevice> createAccessDevice(@RequestBody AccessDevice accessDevice) {
        AccessDevice savedAccessDevice = accessDeviceService.saveAccessDevice(accessDevice);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAccessDevice);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccessDevice(@PathVariable Integer id) {
        accessDeviceService.deleteAccessDevice(id);
        return ResponseEntity.noContent().build();
    }
}
