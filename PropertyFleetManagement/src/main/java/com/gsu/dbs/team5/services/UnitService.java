package com.gsu.dbs.team5.services;

import com.gsu.dbs.team5.entities.Property;
import com.gsu.dbs.team5.entities.Unit;
import com.gsu.dbs.team5.entities.UnitId;
import com.gsu.dbs.team5.repositories.UnitRepository;
import com.gsu.dbs.team5.repositories.PropertyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UnitService {

    private final UnitRepository unitRepository;
    private final PropertyRepository propertyRepository;

    public UnitService(UnitRepository unitRepository, PropertyRepository propertyRepository) {
        this.unitRepository = unitRepository;
        this.propertyRepository = propertyRepository;
    }

    public List<Unit> getAllUnits() {
        return unitRepository.findAll();
    }

    public Optional<Unit> getUnitById(int unitId, int propertyId) {
        UnitId id = new UnitId(unitId, propertyId);
        return unitRepository.findById(id);
    }

    @Transactional
    public Unit saveUnit(Unit unit, int propertyId) {
        Optional<Property> propertyOpt = propertyRepository.findById(propertyId);
        if (propertyOpt.isEmpty()) {
            throw new IllegalArgumentException("Property with ID " + propertyId + " not found.");
        }
        unit.setProperty(propertyOpt.get());
        return unitRepository.save(unit);
    }

    public void deleteUnit(int unitId, int propertyId) {
        UnitId id = new UnitId(unitId, propertyId);
        unitRepository.deleteById(id);
    }
 
    public int getNextUnitId() {
        // Simply increment the unit ID by 1 for each new unit
        return (int) (unitRepository.count() + 1); // Count all units and add 1
    }
    

    // Save the unit (assumes the unitId is already set)
    public Unit saveUnit(Unit unit) {
        return unitRepository.save(unit);
    }
    public List<Unit> searchUnits(Integer propertyId, Integer bedrooms, Integer bathrooms) {
        return unitRepository.searchUnits(propertyId, bedrooms, bathrooms);
    }
    
}
