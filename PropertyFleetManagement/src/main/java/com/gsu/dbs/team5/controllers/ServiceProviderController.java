package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.entities.ServiceProvider;
import com.gsu.dbs.team5.entities.ServiceProviderId;
import com.gsu.dbs.team5.services.ServiceProviderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/service-providers")
public class ServiceProviderController {

    private final ServiceProviderService serviceProviderService;

    public ServiceProviderController(ServiceProviderService serviceProviderService) {
        this.serviceProviderService = serviceProviderService;
    }

    @GetMapping
    public List<ServiceProvider> getAllServiceProviders() {
        return serviceProviderService.getAllServiceProviders();
    }

    @GetMapping("/{companyName}/{serviceType}")
    public ResponseEntity<ServiceProvider> getServiceProviderById(
            @PathVariable String companyName,
            @PathVariable String serviceType) {
        
        ServiceProviderId id = new ServiceProviderId(companyName, serviceType);
        return serviceProviderService.getServiceProviderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ServiceProvider> createServiceProvider(@RequestBody ServiceProvider serviceProvider) {
        ServiceProvider savedServiceProvider = serviceProviderService.saveServiceProvider(serviceProvider);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedServiceProvider);
    }

    @DeleteMapping("/{companyName}/{serviceType}")
    public ResponseEntity<Void> deleteServiceProvider(
            @PathVariable String companyName,
            @PathVariable String serviceType) {
        
        ServiceProviderId id = new ServiceProviderId(companyName, serviceType);
        serviceProviderService.deleteServiceProvider(id);
        return ResponseEntity.noContent().build();
    }
}
