import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const VisitorLogList = () => {
    const [visitorLogs, setVisitorLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVisitorLogs = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/visitor-logs');
                if (!response.ok) {
                    throw new Error('Failed to fetch visitor logs data');
                }
                const data = await response.json();
                setVisitorLogs(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load visitor logs data');
                setLoading(false);
            }
        };

        fetchVisitorLogs();
    }, []);

    const columns = [
        { field: 'visitorLogId', headerName: 'Log ID', width: 100 },
        { field: 'visitorName', headerName: 'Visitor Name', width: 200 },
        { field: 'residentId', headerName: 'Resident ID', width: 120 },
        { field: 'unitId', headerName: 'Unit ID', width: 120 },
        { field: 'dateOfVisit', headerName: 'Visit Date', width: 120 },
        { field: 'accessMethod', headerName: 'Access Method', width: 150 },
        { field: 'entryTime', headerName: 'Entry Time', width: 120 },
        { field: 'exitTime', headerName: 'Exit Time', width: 120 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                Visitor Logs
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
                <Box sx={{ flex: 1, overflow: 'auto', border: '2px solid #00796b', borderRadius: '8px' }}>
                    <DataGrid
                        rows={visitorLogs}
                        columns={columns}
                        getRowId={(row) => row.visitorLogId}
                        disableSelectionOnClick
                        sx={{
                            '& .MuiDataGrid-cell:hover': { backgroundColor: '#e0f7fa' },
                            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#00796b', fontWeight: 'bold' },
                            '& .MuiDataGrid-footerContainer': { backgroundColor: '#00796b', color: 'white' },
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default VisitorLogList;