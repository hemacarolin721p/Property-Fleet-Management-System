    package com.gsu.dbs.team5.entities;

    import jakarta.persistence.*;
    import lombok.Data;
    import lombok.NoArgsConstructor;
    import lombok.AllArgsConstructor;

    @Entity
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @IdClass(UnitId.class)
    public class Unit {

        @Id
        private int unitId;

        @Id
        @ManyToOne
        @JoinColumn(name = "property_id", nullable = false)  // This tells Hibernate to create a column named 'property_id'
        private Property property;

        private String unitSize;
        private int bedrooms;
        private int bathrooms;
        private double rentAmount;
        private String availability;
    }
