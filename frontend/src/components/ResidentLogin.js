import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ResidentLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '', // Password is still here but not used for validation
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Initialize navigate here

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Send login request to the backend API
        try {
            const response = await fetch('http://localhost:8080/api/residents/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password, // Sending password, but it's not validated on the backend
                }),
            });

            const result = await response.text(); // Handle plain text response
            if (response.ok) {
                console.log('Login successful', result);
                alert('Login successful!');
                navigate('/resident-dashboard/property-search'); // Redirect to dashboard after successful login
            } else {
                console.error('Login failed:', result);
                setError('Invalid email. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#e9e5cd">
            <Paper elevation={6} sx={{ padding: 4, maxWidth: 400, width: '90%', bgcolor: "#ffffff", borderRadius: 2 }}>
                <Typography variant="h5" textAlign="center" sx={{ mb: 2, color: "#00796b", fontWeight: 'bold' }}>
                    Resident Login Form
                </Typography>

                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
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
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
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
                        Login
                    </Button>
                </form>

                <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                    <Link to="/resident-register" style={{ textDecoration: 'none', color: "#00796b" }}>
                        New to the site? Register here.
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default ResidentLogin;
