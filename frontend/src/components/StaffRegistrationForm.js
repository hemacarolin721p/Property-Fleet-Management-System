import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Typography, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const StaffRegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',  // Set the role to be a dropdown value
        contactInformation: '',
        assignedPropertyId: '',  // Store the selected property ID
        hireDate: '',
        employmentStatus: 'active',  // Default employment status set to 'active'
    });
    const [properties, setProperties] = useState([]);  // List of available properties
    const [error, setError] = useState('');  // Error state to handle any error messages

    useEffect(() => {
        // Fetch properties (owner names and IDs) for the dropdown
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/properties');  // Adjust your API endpoint for properties
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
                setError('Failed to load properties');
            }
        };

        fetchProperties();
    }, []);

    // Handle changes in input fields
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Clear any previous error messages on form submission
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/staff', {  // API endpoint for staff registration
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Send the form data to backend
            });

            if (response.ok) {
                alert('Staff registration successful!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    role: '',
                    contactInformation: '',
                    assignedPropertyId: '',
                    hireDate: '',
                    employmentStatus: 'active', // Reset to default value
                });
            } else {
                const result = await response.json();
                setError(result.message || 'An error occurred');
            }
        } catch (error) {
            setError(error.message || 'Something went wrong!');
        }
    };

    // Roles for dropdown
    const roles = [
        'Leasing Agent',
        'Maintenance Staff',
        'Admin and Finance',
        'Marketing'
    ];

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#e9e5cd"
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    maxWidth: 600,  // Increased max width for a wider form
                    width: '90%',
                    bgcolor: "#ffffff",
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{ mb: 2, color: "#00796b", fontWeight: 'bold' }}
                >
                    Staff Registration Form
                </Typography>

                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <FormControl fullWidth required sx={{ mb: 2 }}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            label="Role"
                        >
                            {roles.map((role, index) => (
                                <MenuItem key={index} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Contact Information"
                        name="contactInformation"
                        value={formData.contactInformation}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <FormControl fullWidth required sx={{ mb: 2 }}>
                        <InputLabel>Assigned Property</InputLabel>
                        <Select
                            name="assignedPropertyId"
                            value={formData.assignedPropertyId}
                            onChange={handleInputChange}
                            label="Assigned Property"
                        >
                            {properties.map((property) => (
                                <MenuItem key={property.propertyId} value={property.propertyId}>
                                    {property.propertyName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Hire Date"
                        name="hireDate"
                        type="date"
                        value={formData.hireDate}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Employment Status"
                        name="employmentStatus"
                        value={formData.employmentStatus}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                        disabled // Default value is 'active', cannot change
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            bgcolor: "#00796b",
                            "&:hover": { bgcolor: "#e9e5cd" },
                        }}
                    >
                        Register Staff
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default StaffRegistrationForm;
