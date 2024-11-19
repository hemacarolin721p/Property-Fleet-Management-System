package com.gsu.dbs.team5.services;

import com.gsu.dbs.team5.entities.AccessDevice;
import com.gsu.dbs.team5.repositories.AccessDeviceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccessDeviceService {

    private final AccessDeviceRepository accessDeviceRepository;

    public AccessDeviceService(AccessDeviceRepository accessDeviceRepository) {
        this.accessDeviceRepository = accessDeviceRepository;
    }

    public List<AccessDevice> getAllAccessDevices() {
        return accessDeviceRepository.findAll();
    }

    public Optional<AccessDevice> getAccessDeviceById(Integer id) {
        return accessDeviceRepository.findById(id);
    }

    public AccessDevice saveAccessDevice(AccessDevice accessDevice) {
        return accessDeviceRepository.save(accessDevice);
    }

    public void deleteAccessDevice(Integer id) {
        accessDeviceRepository.deleteById(id);
    }
}
