import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const ResidentUpdateDetails = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Handle form data change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission to update resident details
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Assuming email is passed as a part of the form data for the resident to identify them
        const { email } = formData;

        try {
            const response = await fetch(`http://localhost:8080/api/residents/update/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Send all updated fields
            });

            const result = await response.json();

            if (response.ok) {
                // Show success message or navigate to a different page (e.g., dashboard)
                alert('Details updated successfully!');
                navigate('/resident-dashboard'); // Redirect after update
            } else {
                setError(result.message || 'Failed to update details.');
            }
        } catch (error) {
            console.error('Error updating details:', error);
            setError('An error occurred while updating details.');
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#e9e5cd' }}>
            <Paper sx={{ padding: 3, maxWidth: 600, width: '100%', bgcolor: '#ffffff', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}>
                    Update Your Details
                </Typography>

                {error && <Typography color="error" variant="body2" sx={{ textAlign: 'center', marginBottom: 2 }}>{error}</Typography>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        sx={{ marginBottom: 2 }}
                        disabled
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Update Details
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default ResidentUpdateDetails;
