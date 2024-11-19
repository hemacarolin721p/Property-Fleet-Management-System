package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.DTO.StaffDTO;
import com.gsu.dbs.team5.DTO.StaffLoginRequest;
import com.gsu.dbs.team5.entities.Staff;
import com.gsu.dbs.team5.services.StaffService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable int id) {
        return staffService.getStaffById(id)
                .map(staff -> ResponseEntity.ok(staff))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Staff> createStaff(@Validated @RequestBody StaffDTO staffDTO) {
        Staff savedStaff = staffService.saveStaff(staffDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStaff);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable int id) {
        staffService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody StaffLoginRequest request) {
        // Find staff by firstName and lastName
        Optional<Staff> staff = staffService.findByFirstNameAndLastName(request.getFirstName(), request.getLastName());

        if (staff.isPresent()) {
            return ResponseEntity.ok("Login successful");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
    @GetMapping("/with-properties-and-units")
    public ResponseEntity<List<Staff>> getAllStaffWithPropertiesAndUnits() {
        List<Staff> staffList = staffService.getAllStaffWithPropertiesAndUnits();
        return ResponseEntity.ok(staffList);
    }
}
