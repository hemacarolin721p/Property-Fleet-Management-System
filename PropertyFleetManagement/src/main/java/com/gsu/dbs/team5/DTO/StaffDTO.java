package com.gsu.dbs.team5.DTO;

import java.time.LocalDate;

public class StaffDTO {

    private String firstName;
    private String lastName;
    private String role;
    private String contactInformation;
    private int assignedPropertyId;  // Property ID
    private LocalDate hireDate;
    private String employmentStatus;

    // Getters and Setters
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getContactInformation() {
        return contactInformation;
    }

    public void setContactInformation(String contactInformation) {
        this.contactInformation = contactInformation;
    }

    public int getAssignedPropertyId() {
        return assignedPropertyId;
    }

    public void setAssignedPropertyId(int assignedPropertyId) {
        this.assignedPropertyId = assignedPropertyId;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public String getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(String employmentStatus) {
        this.employmentStatus = employmentStatus;
    }
}
