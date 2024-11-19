package com.gsu.dbs.team5.entities;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommonAreaId implements Serializable {
    
    private int propertyId;
    private String areaName;

    // Override equals and hashCode for composite key comparison
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommonAreaId that = (CommonAreaId) o;
        return propertyId == that.propertyId && Objects.equals(areaName, that.areaName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(propertyId, areaName);
    }
}
