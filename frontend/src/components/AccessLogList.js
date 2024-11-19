import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const AccessLogList = () => {
    const [accessLogs, setAccessLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAccessLogs = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/access-logs');
                if (!response.ok) {
                    throw new Error('Failed to fetch access logs data');
                }
                const data = await response.json();

                // Flatten access log data
                const flattenedAccessLogs = data.map((log) => ({
                    ...log,
                    residentName: log.resident ? `${log.resident.firstName} ${log.resident.lastName}` : 'N/A',
                    deviceNumber: log.accessDevice ? log.accessDevice.deviceNumber : 'N/A',
                    residentId: log.resident ? log.resident.residentId : 'N/A',
                }));

                setAccessLogs(flattenedAccessLogs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching access logs:', error);
                setError('Failed to load access logs data');
                setLoading(false);
            }
        };

        fetchAccessLogs();
    }, []);

    const columns = [
        { field: 'accessLogId', headerName: 'Log ID', width: 100 },
        { field: 'residentId', headerName: 'Resident ID', width: 120 },
        { field: 'residentName', headerName: 'Resident Name', width: 200 },
        { field: 'deviceNumber', headerName: 'Device Number', width: 150 },
        { field: 'accessDateTime', headerName: 'Date & Time', width: 200 },
        { field: 'accessLocation', headerName: 'Location', width: 200 },
        { field: 'accessMethod', headerName: 'Method', width: 150 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    Access Logs
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
                            rows={accessLogs}
                            columns={columns}
                            getRowId={(row) => row.accessLogId}
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
                    <CSVLink data={accessLogs} filename="access_logs.csv">
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

export default AccessLogList;