import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Typography, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const ListPropertyForm = () => {
    const [formData, setFormData] = useState({
        propertyName: '',
        city: '',
        state: '',
        street: '',
        zipcode: '',
        type: '',
        numberOfUnits: '',
        ownerId: '',
        propertySize: '',
        constructionDate: '',
    });
    const [owners, setOwners] = useState([]);  // Fetch available owners
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch owners (this can be extended based on your actual API)
        const fetchOwners = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/property-owners');
                const data = await response.json();
                setOwners(data);
            } catch (error) {
                console.error('Error fetching owners:', error);
            }
        };

        fetchOwners();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Ensure the formData includes the ownerId for the backend
        const dataToSend = {
            ...formData,
            ownerId: formData.ownerId,  // Ensure the ownerId is included
        };

        try {
            const response = await fetch('http://localhost:8080/api/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                alert('Property listed successfully!');
            } else {
                const result = await response.json();
                alert('Property listing failed!');
                setError(result.message || 'An error occurred');
            }
        } catch (error) {
            alert('Something went wrong!');
            setError(error.message);
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
                    maxWidth: 600,  // Increased max width for a wider form
                    width: '90%',
                    bgcolor: "#ffffff",
                    borderRadius: 2,
                    marginTop: '3   0px',
                }}
            >
                <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{ mb: 2, color: "#00796b", fontWeight: 'bold' }}
                >
                    List Property Form
                </Typography>

                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Property Name"
                        name="propertyName"
                        value={formData.propertyName}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Zipcode"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    {/* Property Type Dropdown */}
                    <FormControl fullWidth required sx={{ mb: 2 }}>
                        <InputLabel>Property Type</InputLabel>
                        <Select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            label="Property Type"
                        >
                            <MenuItem value="Villa">Villa</MenuItem>
                            <MenuItem value="Apartment">Apartment</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Number of Units"
                        name="numberOfUnits"
                        type="number"
                        value={formData.numberOfUnits}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    {/* Owner Dropdown */}
                    <FormControl fullWidth required sx={{ mb: 2 }}>
                        <InputLabel>Owner</InputLabel>
                        <Select
                            name="ownerId"
                            value={formData.ownerId}
                            onChange={handleInputChange}
                            label="Owner"
                        >
                            {owners.map((owner) => (
                                <MenuItem key={owner.ownerId} value={owner.ownerId}>
                                    {owner.firstName} {owner.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Property Size Sqft"
                        name="propertySize"
                        value={formData.propertySize}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Construction Date"
                        name="constructionDate"
                        type="date"
                        value={formData.constructionDate}
                        onChange={handleInputChange}
                        required
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
                            "&:hover": { bgcolor: "#e9e5cd" },
                        }}
                    >
                        List Property
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default ListPropertyForm;
