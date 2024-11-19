import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Typography, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const AddUnitsForm = () => {
    const [formData, setFormData] = useState({
        unitSize: '',
        bedrooms: '',
        bathrooms: '',
        rentAmount: '',
        availability: 'available',  // Default value for availability
        propertyId: '',  // Property selection
    });

    const [properties, setProperties] = useState([]);  // List of available properties
    const [error, setError] = useState('');  // Error state to handle any error messages
    const [isSubmitting, setIsSubmitting] = useState(false);  // Track form submission status

    // Fetch available properties once the component mounts
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/properties');
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
        setIsSubmitting(true);  // Set submitting state to true

        try {
            const response = await fetch(`http://localhost:8080/api/units/${formData.propertyId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    unitSize: formData.unitSize,
                    bedrooms: formData.bedrooms,
                    bathrooms: formData.bathrooms,
                    rentAmount: formData.rentAmount,
                    availability: formData.availability,
                }),
            });

            if (response.ok) {
                alert('Unit added successfully!');
                setFormData({
                    unitSize: '',
                    bedrooms: '',
                    bathrooms: '',
                    rentAmount: '',
                    availability: 'yes',
                    propertyId: '',
                });
            } else {
                const result = await response.json();
                setError(result.message || 'An error occurred');
            }
        } catch (error) {
            setError(error.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);  // Reset submitting state
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
                }}
            >
                <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{ mb: 2, color: "#00796b", fontWeight: 'bold' }}
                >
                    Add Unit Form
                </Typography>

                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth required sx={{ mb: 2 }}>
                        <InputLabel>Property</InputLabel>
                        <Select
                            name="propertyId"
                            value={formData.propertyId}
                            onChange={handleInputChange}
                            label="Property"
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
                        label="Unit Size in Sqft"
                        name="unitSize"
                        value={formData.unitSize}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                        type="number"
                    />

                    <TextField
                        fullWidth
                        label="Bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                        type="number"
                    />

                    <TextField
                        fullWidth
                        label="Bathrooms"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                        type="number"
                    />

                    <TextField
                        fullWidth
                        label="Rent Amount"
                        name="rentAmount"
                        type="number"
                        value={formData.rentAmount}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        required
                        sx={{ mb: 2 }}
                        disabled // Availability is default to 'yes' and should not change
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
                        disabled={isSubmitting}  // Disable button when submitting
                    >
                        {isSubmitting ? 'Submitting...' : 'Add Unit'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AddUnitsForm;
