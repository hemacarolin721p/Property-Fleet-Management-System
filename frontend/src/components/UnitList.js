import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const UnitList = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/units');
                if (!response.ok) {
                    throw new Error('Failed to fetch units data');
                }
                const data = await response.json();

                // Flatten the data to avoid issues with nested objects
                const flattenedUnits = data.map((unit) => ({
                    ...unit,
                    propertyName: unit.property ? unit.property.propertyName : 'N/A',
                    ownerName: unit.property && unit.property.propertyOwner ? 
                        `${unit.property.propertyOwner.firstName} ${unit.property.propertyOwner.lastName}` : 'N/A',
                    propertyId: unit.property ? unit.property.propertyId : 'N/A',
                }));

                setUnits(flattenedUnits);
                setLoading(false);
            } catch (error) {
                setError('Failed to load units data');
                setLoading(false);
            }
        };

        fetchUnits();
    }, []);

    const columns = [
        { field: 'propertyId', headerName: 'Property ID', width: 150 },
        { field: 'unitId', headerName: 'Unit ID', width: 150 },
        { field: 'propertyName', headerName: 'Property Name', width: 200 },
        { field: 'ownerName', headerName: 'Owner Name', width: 200 },
        { field: 'unitSize', headerName: 'Unit Size', width: 150 },
        { field: 'bedrooms', headerName: 'Bedrooms', width: 150 },
        { field: 'bathrooms', headerName: 'Bathrooms', width: 150 },
        { field: 'rentAmount', headerName: 'Rent Amount ($)', width: 150 },
        { field: 'availability', headerName: 'Availability', width: 150 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    All Units
                </Typography>

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
                            rows={units}
                            columns={columns}
                            getRowId={(row) => `${row.propertyId}-${row.unitId}`}
                            loading={loading}
                            error={error}
                            rowHeight={60}
                            disableSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-cell:hover': { backgroundColor: '#e0f7fa' },
                                '& .MuiDataGrid-columnHeaders': { backgroundColor: '#00796b', fontWeight: 'bold' },
                                '& .MuiDataGrid-footerContainer': { backgroundColor: '#00796b', color: '#fff' },
                                '& .MuiDataGrid-toolbar': { backgroundColor: '#00796b', color: '#fff' },
                            }}
                        />
                    </Box>
                )}

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <CSVLink data={units} filename="units.csv">
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

export default UnitList;