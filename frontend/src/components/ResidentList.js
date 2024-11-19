import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const ResidentList = () => {
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/residents');
                if (!response.ok) {
                    throw new Error('Failed to fetch residents data');
                }
                const data = await response.json();

                // Flatten resident data
                const flattenedResidents = data.map((resident) => ({
                    id: resident.residentId, // Unique ID for each resident
                    firstName: resident.firstName,
                    lastName: resident.lastName,
                    contactInformation: resident.contactInformation,
                    email: resident.email,
                    moveInDate: resident.moveInDate,
                    moveOutDate: resident.moveOutDate || 'N/A',
                }));

                setResidents(flattenedResidents);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching residents:', error);
                setError('Failed to load residents data');
                setLoading(false);
            }
        };

        fetchResidents();
    }, []);

    const columns = [
        { field: 'id', headerName: 'Resident ID', width: 120 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'contactInformation', headerName: 'Contact Information', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'moveInDate', headerName: 'Move In Date', width: 150 },
        { field: 'moveOutDate', headerName: 'Move Out Date', width: 150 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    Residents List
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
                            rows={residents}
                            columns={columns}
                            getRowId={(row) => row.id} // Use resident ID as the unique row ID
                            loading={loading}
                            error={error}
                            rowHeight={60}
                            disableSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-cell:hover': { backgroundColor:'#e0f7fa' },
                                '& .MuiDataGrid-columnHeaders': { backgroundColor:'#00796b', fontWeight:'bold' },
                                '& .MuiDataGrid-footerContainer': { backgroundColor:'#00796b', color:'#fff' },
                                '& .MuiDataGrid-toolbar': { backgroundColor:'#00796b', color:'#fff' },
                            }}
                        />
                    </Box>
                )}

                <Box sx={{ textAlign:'center', mt : 3 }}>
                    <CSVLink data={residents} filename="residents.csv">
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

export default ResidentList;