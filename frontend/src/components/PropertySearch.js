import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Typography, MenuItem, FormControl, Select, InputLabel, Grid } from '@mui/material';

const PropertySearch = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchFilters, setSearchFilters] = useState({
        city: '',
        state: '',
        ownerId: '',
        type: '',
    });
    const [owners, setOwners] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const propertyResponse = await fetch('http://localhost:8080/api/properties');
                const propertiesData = await propertyResponse.json();
                setProperties(propertiesData);
                setFilteredProperties(propertiesData);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        const fetchOwners = async () => {
            try {
                const ownerResponse = await fetch('http://localhost:8080/api/property-owners');
                const ownersData = await ownerResponse.json();
                setOwners(ownersData);
            } catch (error) {
                console.error('Error fetching owners:', error);
            }
        };

        fetchProperties();
        fetchOwners();
    }, []);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setSearchFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSearch = () => {
        let results = properties;
        if (searchFilters.city) results = results.filter((property) => property.city.includes(searchFilters.city));
        if (searchFilters.state) results = results.filter((property) => property.state.includes(searchFilters.state));
        if (searchFilters.ownerId) results = results.filter((property) => property.propertyOwner.ownerId === searchFilters.ownerId);
        if (searchFilters.type) results = results.filter((property) => property.type === searchFilters.type);

        setFilteredProperties(results);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ padding: 3, minHeight: '100vh' }}>
            <Paper elevation={6} sx={{ padding: 4, width: '90%', maxWidth: 800, borderRadius: 2, mb: 0 }}>
                <Typography variant="h5" sx={{ mb: 3, color: "#00796b", fontWeight: 'bold', textAlign: 'center' }}>
                    Property Search
                </Typography>

                <Box display="flex" flexDirection="column" gap={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={searchFilters.city}
                                onChange={handleFilterChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={searchFilters.state}
                                onChange={handleFilterChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Owner</InputLabel>
                                <Select
                                    name="ownerId"
                                    value={searchFilters.ownerId}
                                    onChange={handleFilterChange}
                                    label="Owner"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {owners.map((owner) => (
                                        <MenuItem key={owner.ownerId} value={owner.ownerId}>
                                            {owner.firstName} {owner.lastName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Property Type</InputLabel>
                                <Select
                                    name="type"
                                    value={searchFilters.type}
                                    onChange={handleFilterChange}
                                    label="Property Type"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="Villa">Villa</MenuItem>
                                    <MenuItem value="Apartment">Apartment</MenuItem>
                                </Select>
                            </FormControl>
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
                    {filteredProperties.map((property) => (
                        <Paper key={property.propertyId} sx={{ p: 2, my: 2 }}>
                            <Typography variant="body1"><strong>Name:</strong> {property.propertyName}</Typography>
                            <Typography variant="body1"><strong>City:</strong> {property.city}</Typography>
                            <Typography variant="body1"><strong>State:</strong> {property.state}</Typography>
                            <Typography variant="body1"><strong>Type:</strong> {property.type}</Typography>
                            <Typography variant="body1"><strong>Number of Units:</strong> {property.numberOfUnits}</Typography>
                        </Paper>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
};

export default PropertySearch;
