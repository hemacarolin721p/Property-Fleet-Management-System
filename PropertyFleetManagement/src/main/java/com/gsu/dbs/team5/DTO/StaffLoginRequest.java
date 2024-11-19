package com.gsu.dbs.team5.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffLoginRequest {
    private String firstName;
    private String lastName;
    private String password;
    
    // Getters and Setters
}
