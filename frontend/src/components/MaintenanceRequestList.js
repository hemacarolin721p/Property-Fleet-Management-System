import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const MaintenanceRequestList = () => {
    const [maintenanceRequests, setMaintenanceRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMaintenanceRequests = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/maintenance-requests');
                if (!response.ok) {
                    throw new Error('Failed to fetch maintenance requests data');
                }
                const data = await response.json();

                // Flatten maintenance request data
                const flattenedRequests = data.map(request => ({
                    ...request,
                    residentId: request.resident?.residentId || 'N/A',
                    propertyId: request.property?.propertyId || 'N/A',
                    unitId: request.unit?.unitId || 'N/A',
                    residentName: request.resident ? `${request.resident.firstName} ${request.resident.lastName}` : 'N/A',
                    propertyName: request.property?.propertyName || 'N/A',
                }));

                setMaintenanceRequests(flattenedRequests);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching maintenance requests:', error);
                setError('Failed to load maintenance requests data');
                setLoading(false);
            }
        };

        fetchMaintenanceRequests();
    }, []);

    const columns = [
        { field: 'requestId', headerName: 'Request ID', width: 120 },
        { field: 'residentId', headerName: 'Resident ID', width: 120 },
        { field: 'residentName', headerName: 'Resident Name', width: 200 },
        { field: 'propertyId', headerName: 'Property ID', width: 120 },
        { field: 'propertyName', headerName: 'Property Name', width: 200 },
        { field: 'unitId', headerName: 'Unit ID', width: 120 },
        { field: 'issueDescription', headerName: 'Issue Description', width: 300 },
        { field: 'requestDate', headerName: 'Request Date', width: 150 },
        { field: 'priority', headerName: 'Priority', width: 120 },
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'assignedStaffId', headerName: 'Assigned Staff ID', width: 150 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    Maintenance Requests
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
                            rows={maintenanceRequests}
                            columns={columns}
                            getRowId={(row) => row.requestId}
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
                    <CSVLink data={maintenanceRequests} filename="maintenance_requests.csv">
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

export default MaintenanceRequestList;