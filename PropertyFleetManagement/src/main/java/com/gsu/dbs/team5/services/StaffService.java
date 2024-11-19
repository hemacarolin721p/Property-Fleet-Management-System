package com.gsu.dbs.team5.services;

import com.gsu.dbs.team5.DTO.StaffDTO;
import com.gsu.dbs.team5.entities.Property;
import com.gsu.dbs.team5.entities.Staff;
import com.gsu.dbs.team5.repositories.StaffRepository;
import com.gsu.dbs.team5.repositories.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {

    private final StaffRepository staffRepository;
    private final PropertyRepository propertyRepository;

    public StaffService(StaffRepository staffRepository, PropertyRepository propertyRepository) {
        this.staffRepository = staffRepository;
        this.propertyRepository = propertyRepository;
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Optional<Staff> getStaffById(int id) {
        return staffRepository.findById(id);
    }

    public Staff saveStaff(StaffDTO staffDTO) {
        Optional<Property> property = propertyRepository.findById(staffDTO.getAssignedPropertyId());

        if (property.isEmpty()) {
            throw new RuntimeException("Property not found");
        }

        Staff staff = new Staff();
        staff.setFirstName(staffDTO.getFirstName());
        staff.setLastName(staffDTO.getLastName());
        staff.setRole(staffDTO.getRole());
        staff.setContactInformation(staffDTO.getContactInformation());
        staff.setAssignedProperty(property.get());
        staff.setHireDate(staffDTO.getHireDate());
        staff.setEmploymentStatus(staffDTO.getEmploymentStatus());

        return staffRepository.save(staff);
    }

    public void deleteStaff(int id) {
        staffRepository.deleteById(id);
    }

    // Updated method: No password check, only firstName and lastName
    public Optional<Staff> findByFirstNameAndLastName(String firstName, String lastName) {
        return Optional.ofNullable(staffRepository.findByFirstNameAndLastName(firstName, lastName));
    }
    
    public List<Staff> getAllStaffWithPropertiesAndUnits() {
        return staffRepository.findAllStaffWithPropertiesAndUnits();
    }
}
