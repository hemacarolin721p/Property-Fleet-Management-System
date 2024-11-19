import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/vehicles');
                if (!response.ok) {
                    throw new Error('Failed to fetch vehicles data');
                }
                const data = await response.json();

                // Flatten vehicle data to handle nested structures
                const flattenedVehicles = data.map((vehicle) => ({
                    ...vehicle,
                    residentId: vehicle.resident?.residentId || 'N/A',
                    propertyId: vehicle.propertyId || 'N/A',
                    vehicleLicenseNumber: vehicle.vehicleLicenseNumber || 'N/A',
                    vehicleMake: vehicle.vehicleMake || 'N/A',
                    vehicleModel: vehicle.vehicleModel || 'N/A',
                    registrationDate: vehicle.registrationDate || 'N/A',
                    parkingSpotId: vehicle.parkingSpotId || 'N/A', // Ensure parking spot ID is included
                }));

                setVehicles(flattenedVehicles);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
                setError('Failed to load vehicles data');
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    const columns = [
        { field: 'vehicleLicenseNumber', headerName: 'License Number', width: 150 },
        { field: 'residentId', headerName: 'Resident ID', width: 120 },
        { field: 'propertyId', headerName: 'Property ID', width: 120 },
        { field: 'vehicleMake', headerName: 'Make', width: 120 },
        { field: 'vehicleModel', headerName: 'Model', width: 120 },
        { field: 'registrationDate', headerName: 'Registration Date', width: 150 },
        { field: 'parkingSpotId', headerName: 'Parking Spot ID', width: 150 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    Vehicles List
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
                            rows={vehicles}
                            columns={columns}
                            getRowId={(row) => `${row.vehicleLicenseNumber}-${row.residentId}`} // Use a composite key for unique identification
                            loading={loading}
                            error={error}
                            rowHeight={60}
                            disableSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-cell:hover': { backgroundColor: '#e0f7fa' },
                                '& .MuiDataGrid-columnHeaders': { backgroundColor: '#00796b', fontWeight: 'bold' },
                                '& .MuiDataGrid-footerContainer': { backgroundColor: '#00796b', color:'#fff' },
                                '& .MuiDataGrid-toolbar': { backgroundColor:'#00796b', color:'#fff' },
                            }}
                        />
                    </Box>
                )}

                <Box sx={{ textAlign:'center', mt : 3 }}>
                    <CSVLink data={vehicles} filename="vehicles.csv">
                        <Button variant="contained" color="primary" sx={{
                            bgcolor:'#00796b',
                            '& :hover':{ bgcolor:'#004d40' },
                            fontSize:'1rem',
                            padding:'10px 20px',
                        }}>
                            Export to CSV
                        </Button>
                    </CSVLink>
                </Box>
            </Box>
        </Box>
    );
};

export default VehicleList;