package com.gsu.dbs.team5.services;

import com.gsu.dbs.team5.entities.Vehicle;
import com.gsu.dbs.team5.repositories.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleByLicenseNumber(String licenseNumber) {
        return vehicleRepository.findById(licenseNumber);
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(String licenseNumber) {
        vehicleRepository.deleteById(licenseNumber);
    }
}
