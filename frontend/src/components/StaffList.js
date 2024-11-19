import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const StaffList = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch Staff data (replace with actual API endpoint)
        const fetchStaff = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/staff');
                if (!response.ok) {
                    throw new Error('Failed to fetch staff data');
                }
                const data = await response.json();

                // Flatten the staff data to include the 'assignedPropertyName' field
                const flattenedStaff = data.map((staffMember) => ({
                    ...staffMember,
                    assignedPropertyName: staffMember.assignedProperty
                        ? staffMember.assignedProperty.propertyName
                        : 'N/A',
                }));

                setStaff(flattenedStaff);
                setLoading(false);
            } catch (error) {
                setError('Failed to load staff data');
                setLoading(false);
            }
        };

        fetchStaff();
    }, []);

    const columns = [
        { field: 'staffId', headerName: 'Staff ID', width: 150 },
        { field: 'firstName', headerName: 'First Name', width: 200 },
        { field: 'lastName', headerName: 'Last Name', width: 200 },
        { field: 'role', headerName: 'Role', width: 150 },
        { field: 'contactInformation', headerName: 'Contact Information', width: 250 },
        { field: 'assignedPropertyName', headerName: 'Assigned Property', width: 200 },
        { field: 'hireDate', headerName: 'Hire Date', width: 150 },
        { field: 'employmentStatus', headerName: 'Employment Status', width: 200 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    Staff List
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
                            rows={staff}
                            columns={columns}
                            pageSize={5}
                            getRowId={(row) => row.staffId} // Use 'staffId' as the unique row ID
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
                    <CSVLink data={staff} filename="staff.csv">
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

export default StaffList;
