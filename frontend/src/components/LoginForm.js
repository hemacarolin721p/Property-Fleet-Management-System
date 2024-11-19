import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
            const response = await fetch('http://localhost:8080/api/property-owners/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const result = await response.text(); // Handle plain text response
            if (response.ok) {
                console.log('Login successful', result);
                alert('Login successful!');
                navigate('/dashboard/home'); // Redirect to dashboard after successful login
            } else {
                console.error('Login failed:', result);
                alert('Login failed!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#e9e5cd">
            <Paper elevation={6} sx={{ padding: 4, maxWidth: 400, width: '90%', bgcolor: "#ffffff", borderRadius: 2 }}>
                <Typography variant="h5" textAlign="center" sx={{ mb: 2, color: "#00796b", fontWeight: 'bold' }}>
                   Property Owner Login Form
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
                    <Link to="/property-owner/register" style={{ textDecoration: 'none', color: "#00796b" }}>
                        New to the site? Register here.
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default LoginForm;
