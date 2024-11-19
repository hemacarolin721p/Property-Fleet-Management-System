import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Typography, Grid, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const UnitSearch = () => {
    const [units, setUnits] = useState([]); // All units
    const [filteredUnits, setFilteredUnits] = useState([]); // Filtered units after search
    const [properties, setProperties] = useState([]); // Properties for dropdown
    const [searchFilters, setSearchFilters] = useState({
        propertyId: '',
        bedrooms: '',
        bathrooms: '',
    });

    // Fetch units and properties on initial load
    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/units');
                if (!response.ok) {
                    throw new Error('Failed to fetch units data');
                }
                const data = await response.json();
                setUnits(data);  // All units fetched
            } catch (error) {
                console.error('Error fetching units:', error);
            }
        };

        const fetchProperties = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/properties');
                if (!response.ok) {
                    throw new Error('Failed to fetch properties data');
                }
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchUnits();
        fetchProperties();
    }, []);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setSearchFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handlePropertyChange = (event) => {
        const selectedPropertyName = event.target.value;
        const selectedProperty = properties.find(property => property.propertyName === selectedPropertyName);
        
        if (selectedProperty) {
            setSearchFilters((prevFilters) => ({
                ...prevFilters,
                propertyId: selectedProperty.propertyId,
                propertyName: selectedPropertyName // Optionally store the name for display
            }));
        }
    };

    const handleSearch = async () => {
        // If any required fields are empty, alert the user
        if (!searchFilters.propertyId || !searchFilters.bedrooms || !searchFilters.bathrooms) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const queryParams = new URLSearchParams({
                propertyId: searchFilters.propertyId,
                bedrooms: Number(searchFilters.bedrooms),
                bathrooms: Number(searchFilters.bathrooms),
            }).toString();

            const response = await fetch(`http://localhost:8080/api/units/search?${queryParams}`);
            if (!response.ok) {
                throw new Error('Failed to fetch filtered units');
            }
            const results = await response.json();
            setFilteredUnits(results); // Only set the filtered units
        } catch (error) {
            console.error('Error searching units:', error);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ padding: 3, paddingBottom: 40 }}>
            <Paper elevation={6} sx={{ padding: 4, width: '100%', maxWidth: 1000 }}>
                <Typography variant="h5" sx={{ mb: 3, color: "#00796b", fontWeight: 'bold', textAlign: 'center' }}>
                    Unit Search
                </Typography>

                <Box display="flex" flexDirection="column" gap={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Property</InputLabel>
                                <Select
                                    name="propertyName"
                                    value={searchFilters.propertyName}
                                    onChange={handlePropertyChange}
                                    label="Property"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {properties.map((property) => (
                                        <MenuItem key={property.propertyId} value={property.propertyName}>
                                            {property.propertyName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Bedrooms"
                                name="bedrooms"
                                type="number"
                                value={searchFilters.bedrooms}
                                onChange={handleFilterChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Bathrooms"
                                name="bathrooms"
                                type="number"
                                value={searchFilters.bathrooms}
                                onChange={handleFilterChange}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        sx={{ bgcolor: "#00796b", "&:hover": { bgcolor: "#004d40" }, mt: 2 }}
                    >
                        Search
                    </Button>
                </Box>

                <Box mt={4}>
                    <Typography variant="h6" sx={{ color: "#00796b", fontWeight: 'bold' }}>Search Results</Typography>
                    {filteredUnits.length > 0 ? (
                        filteredUnits.map((unit) => (
                            <Paper key={unit.unitId} sx={{ p: 2, my: 2 }}>
                                <Typography variant="body1"><strong>Unit ID:</strong> {unit.unitId}</Typography>
                                <Typography variant="body1"><strong>Property Name:</strong> {unit.property.propertyName}</Typography>
                                <Typography variant="body1"><strong>Bedrooms:</strong> {unit.bedrooms}</Typography>
                                <Typography variant="body1"><strong>Bathrooms:</strong> {unit.bathrooms}</Typography>
                                <Typography variant="body1"><strong>Rent Amount:</strong> ${unit.rentAmount}</Typography>
                            </Paper>
                        ))
                    ) : (
                        <Typography variant="body2" sx={{ mt: 2, color: "red", textAlign: 'center' }}>
                            Sorry, no results found.
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default UnitSearch;