import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const ResidentRegister = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        contactInformation: '', // Field for contact information
        email: '',
        moveInDate: '',
        moveOutDate: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Initialize navigate hook

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Send form data to the backend API
        try {
            const response = await fetch('http://localhost:8080/api/residents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure correct content type
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    contactInformation: formData.contactInformation,
                    email: formData.email,
                    moveInDate: formData.moveInDate,
                    moveOutDate: formData.moveOutDate || null, // Send null if not provided
                }),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("Resident registration successful", result);
                alert('Registration successful!');
                navigate('/staff-dashboard'); // Redirect to landing page after successful registration
            } else {
                const result = await response.json();
                console.error("Error:", result);
                alert('Registration failed!');
            }
        } catch (error) {
            console.error("Error:", error);
            alert('Something went wrong!');
        }
    };
    
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
                    maxWidth: 400,
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
                   Resident Registration Form
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

                    <TextField
                        fullWidth
                        label="Contact Information" // Contact information field added here
                        name="contactInformation"
                        value={formData.contactInformation}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Move-In Date"
                        name="moveInDate"
                        type="date"
                        value={formData.moveInDate}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Move-Out Date"
                        name="moveOutDate" // Move-out date field added here
                        type="date"
                        value={formData.moveOutDate}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            bgcolor: "#00796b",
                            "&:hover": { bgcolor: "#004d40" },
                        }}
                    >
                       Register
                    </Button>
                </form>

                <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                   Already have an account?{" "}
                   <Link to="/resident/login" style={{ textDecoration: 'none', color: "#00796b" }}>
                       Login here.
                   </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default ResidentRegister;