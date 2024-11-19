package com.gsu.dbs.team5.services;

import com.gsu.dbs.team5.entities.MaintenanceRequest;
import com.gsu.dbs.team5.repositories.MaintenanceRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaintenanceRequestService {

    private final MaintenanceRequestRepository maintenanceRequestRepository;

    public MaintenanceRequestService(MaintenanceRequestRepository maintenanceRequestRepository) {
        this.maintenanceRequestRepository = maintenanceRequestRepository;
    }

    public List<MaintenanceRequest> getAllMaintenanceRequests() {
        return maintenanceRequestRepository.findAll();
    }

    public Optional<MaintenanceRequest> getMaintenanceRequestById(Integer id) {
        return maintenanceRequestRepository.findById(id);
    }

    public MaintenanceRequest saveMaintenanceRequest(MaintenanceRequest maintenanceRequest) {
        return maintenanceRequestRepository.save(maintenanceRequest);
    }

    public void deleteMaintenanceRequest(Integer id) {
        maintenanceRequestRepository.deleteById(id);
    }
}
