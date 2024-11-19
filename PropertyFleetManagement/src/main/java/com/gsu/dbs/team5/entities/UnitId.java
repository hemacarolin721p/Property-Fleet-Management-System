package com.gsu.dbs.team5.entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UnitId implements Serializable {

    private int unitId;
    private int property;

    public UnitId() {
    }

    public UnitId(int unitId, int property) {
        this.unitId = unitId;
        this.property = property;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UnitId that = (UnitId) o;
        return unitId == that.unitId && property == that.property;
    }

    @Override
    public int hashCode() {
        return Objects.hash(unitId, property);
    }
}
