package com.gsu.dbs.team5.services;

import com.gsu.dbs.team5.entities.ParkingSpot;
import com.gsu.dbs.team5.entities.ParkingSpotId;
import com.gsu.dbs.team5.repositories.ParkingSpotRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParkingSpotService {

    private final ParkingSpotRepository parkingSpotRepository;

    public ParkingSpotService(ParkingSpotRepository parkingSpotRepository) {
        this.parkingSpotRepository = parkingSpotRepository;
    }

    public List<ParkingSpot> getAllParkingSpots() {
        return parkingSpotRepository.findAll();
    }

    public Optional<ParkingSpot> getParkingSpotById(ParkingSpotId id) {
        return parkingSpotRepository.findById(id);
    }

    public ParkingSpot saveParkingSpot(ParkingSpot parkingSpot) {
        return parkingSpotRepository.save(parkingSpot);
    }

    public void deleteParkingSpot(ParkingSpotId id) {
        parkingSpotRepository.deleteById(id);
    }
}
