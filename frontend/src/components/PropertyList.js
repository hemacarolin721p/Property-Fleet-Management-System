import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch Property data (replace with actual API endpoint)
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/properties');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Flatten the data to avoid issues with nested 'propertyOwner' object
                const flattenedProperties = data.map((property) => ({
                    ...property,
                    ownerName: property.propertyOwner ? property.propertyOwner.firstName : 'N/A',
                }));

                setProperties(flattenedProperties);
                setLoading(false);
            } catch (error) {
                setError('Failed to load properties');
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const columns = [
        { field: 'propertyId', headerName: 'Property ID', width: 150 },
        { field: 'propertyName', headerName: 'Property Name', width: 200 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'state', headerName: 'State', width: 150 },
        { field: 'street', headerName: 'Street', width: 200 },
        { field: 'zipcode', headerName: 'Zipcode', width: 150 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'numberOfUnits', headerName: 'Number of Units', width: 200 },
        { field: 'ownerName', headerName: 'Owner Name', width: 200 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    All Properties
                </Typography>

                {/* Loading or error state */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 3 }}>
                        {error}
                    </Typography>
                ) : (
                    <Box sx={{ flex: 1, overflow: 'auto', height: 'calc(100% - 60px)', border: '2px solid #00796b', borderRadius: '8px' }}>
                        <DataGrid
                            rows={properties}
                            columns={columns}
                            pageSize={5}
                            getRowId={(row) => row.propertyId} // Use 'propertyId' as the unique row ID
                            loading={loading} // Show loading indicator while fetching data
                            error={error} // Show error message if no data
                            rowHeight={60} // Set row height for better readability
                            disableSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-cell:hover': {
                                    backgroundColor: '#e0f7fa', // Light hover effect for rows
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#00796b',
                                    fontWeight: 'bold',
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    backgroundColor: '#00796b',
                                    color: '#fff',
                                },
                                '& .MuiDataGrid-toolbar': {
                                    backgroundColor: '#00796b',
                                    color: '#fff',
                                },
                            }}
                        />
                    </Box>
                )}

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <CSVLink data={properties} filename="properties.csv">
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                bgcolor: '#00796b',
                                '&:hover': { bgcolor: '#004d40' },
                                fontSize: '1rem',
                                padding: '10px 20px',
                            }}
                        >
                            Export to CSV
                        </Button>
                    </CSVLink>
                </Box>
            </Box>
        </Box>
    );
};

export default PropertyList;
