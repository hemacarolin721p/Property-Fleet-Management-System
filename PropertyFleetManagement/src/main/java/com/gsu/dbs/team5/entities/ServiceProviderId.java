package com.gsu.dbs.team5.entities;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceProviderId implements Serializable {
    private String companyName;
    private String serviceType;
}
