import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const AccessDeviceList = () => {
    const [accessDevices, setAccessDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAccessDevices = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/access-devices');
                if (!response.ok) {
                    throw new Error('Failed to fetch access device data');
                }
                const data = await response.json();

                // Flatten the data if necessary (based on your entity structure)
                const flattenedDevices = data.map((device) => ({
                    ...device,
                    residentName: device.resident ? `${device.resident.firstName} ${device.resident.lastName}` : 'N/A',
                    activationDate: device.activationDate ? device.activationDate : 'N/A',
                    deactivationDate: device.deactivationDate ? device.deactivationDate : 'N/A',
                }));

                setAccessDevices(flattenedDevices);
                setLoading(false);
            } catch (error) {
                setError('Failed to load access device data');
                setLoading(false);
            }
        };

        fetchAccessDevices();
    }, []);

    const columns = [
        { field: 'accessDeviceId', headerName: 'Access Device ID', width: 150 },
        { field: 'residentName', headerName: 'Resident Name', width: 200 },
        { field: 'deviceNumber', headerName: 'Device Number', width: 150 },
        { field: 'accessLevel', headerName: 'Access Level', width: 150 },
        { field: 'activationDate', headerName: 'Activation Date', width: 180 },
        { field: 'deactivationDate', headerName: 'Deactivation Date', width: 180 },
        { field: 'accessMethod', headerName: 'Access Method', width: 150 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    Access Devices
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
                            rows={accessDevices}
                            columns={columns}
                            getRowId={(row) => row.accessDeviceId}
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
                    <CSVLink data={accessDevices} filename="access_devices.csv">
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

export default AccessDeviceList;
