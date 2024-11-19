package com.gsu.dbs.team5.services;

import java.time.LocalDate;
import java.time.ZoneId;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

import javax.management.relation.RelationNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gsu.dbs.team5.DTO.ResidentDTO;
import com.gsu.dbs.team5.entities.Resident;
import com.gsu.dbs.team5.repositories.ResidentRepository;

@Service
public class ResidentService {
    @Autowired
    private ResidentRepository residentRepository;

    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    public Resident getResidentById(Integer id) throws RelationNotFoundException {
        return residentRepository.findById(id)
                .orElseThrow(() -> new RelationNotFoundException("Resident not found with id : "+id));
    }

    public Resident createResident(Resident resident) {
        return residentRepository.save(resident);
    }

    public Resident updateResident(Integer id, Resident residentDetails) throws RelationNotFoundException {
        Resident resident = residentRepository.findById(id)
                .orElseThrow(() -> new RelationNotFoundException("Resident not found"));

        resident.setFirstName(residentDetails.getFirstName());
        resident.setLastName(residentDetails.getLastName());
        resident.setEmail(residentDetails.getEmail());

        return residentRepository.save(resident);
    }

    public void deleteResident(Integer id) throws RelationNotFoundException {
        Resident resident = residentRepository.findById(id)
                .orElseThrow(() -> new RelationNotFoundException("Resident not found"));

        residentRepository.delete(resident);
    }
        // Find resident by email
        public Optional<Resident> findByEmail(String email) {
            return residentRepository.findByEmail(email);
        }


        public Resident saveResident(ResidentDTO residentDTO) {
            // Convert LocalDate to java.util.Date
            Date moveInDate = residentDTO.getMoveInDate();
    
            // Similarly, convert moveOutDate
            Date moveOutDate = residentDTO.getMoveOutDate();  
            // Create and set Resident details
            Resident resident = new Resident();
            resident.setFirstName(residentDTO.getFirstName());
            resident.setLastName(residentDTO.getLastName());
            resident.setEmail(residentDTO.getEmail());
            resident.setContactInformation(residentDTO.getContactInformation());
            resident.setMoveInDate(moveInDate);
            resident.setMoveOutDate(moveOutDate);
    
            return residentRepository.save(resident);
        }

            // Method to update the resident details
    public Resident updateResidentDetails(String email, ResidentDTO updatedResident) {
        Optional<Resident> residentOptional = residentRepository.findByEmail(email);
        if (residentOptional.isPresent()) {
            Resident resident = residentOptional.get();
            // Update resident details
            resident.setFirstName(updatedResident.getFirstName());
            resident.setLastName(updatedResident.getLastName());
            resident.setEmail(updatedResident.getEmail());  // Handle email carefully if needed
            
            // Save the updated resident
            return residentRepository.save(resident);
        } else {
            throw new RuntimeException("Resident not found with email: " + email);
        }
    }

        
}
