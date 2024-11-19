import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const ParkingSpotList = () => {
    const [parkingSpots, setParkingSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchParkingSpots = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/parking-spots');
                if (!response.ok) {
                    throw new Error('Failed to fetch parking spots data');
                }
                const data = await response.json();

                // Flatten parking spot data
                const flattenedParkingSpots = data.map((spot) => ({
                    ...spot,
                    residentName: spot.resident ? `${spot.resident.firstName} ${spot.resident.lastName}` : 'N/A',
                    residentId: spot.resident ? spot.resident.residentId : 'N/A',
                }));

                setParkingSpots(flattenedParkingSpots);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching parking spots:', error);
                setError('Failed to load parking spots data');
                setLoading(false);
            }
        };

        fetchParkingSpots();
    }, []);

    const columns = [
        { field: 'parkingSpotNumber', headerName: 'Spot Number', width: 120 },
        { field: 'propertyId', headerName: 'Property ID', width: 120 },
        { field: 'residentId', headerName: 'Resident ID', width: 120 },
        { field: 'residentName', headerName: 'Resident Name', width: 200 },
        { field: 'vehicleId', headerName: 'Vehicle ID', width: 120 },
        { field: 'availability', headerName: 'Availability', width: 120 },
        { field: 'reservedDate', headerName: 'Reserved Date', width: 150 },
        { field: 'expirationDate', headerName: 'Expiration Date', width: 150 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    Parking Spots
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
                            rows={parkingSpots}
                            columns={columns}
                            getRowId={(row) => `${row.propertyId}-${row.parkingSpotNumber}`}
                            loading={loading}
                            error={error}
                            rowHeight={60}
                            disableSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-cell:hover': { backgroundColor: '#e0f7fa' },
                                '& .MuiDataGrid-columnHeaders': { backgroundColor: '#00796b', fontWeight: 'bold' },
                                '& .MuiDataGrid-footerContainer': { backgroundColor: '#00796b', color: 'white' },
                                '& .MuiDataGrid-toolbar': { backgroundColor: '#00796b', color: 'white' },
                            }}
                        />
                    </Box>
                )}

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <CSVLink data={parkingSpots} filename="parking_spots.csv">
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

export default ParkingSpotList;