import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv'; // For CSV export

const PropertyOwnerList = () => {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/property-owners');
                if (!response.ok) {
                    throw new Error('Failed to fetch owners data');
                }
                const data = await response.json();

                // Flatten the data, if necessary
                const flattenedOwners = data.map((owner) => ({
                    ...owner,
                    // Assuming each owner may have a `properties` array (or some nested data):
                    propertyNames: owner.properties ? owner.properties.map((prop) => prop.propertyName).join(', ') : 'N/A', // Flatten properties
                }));

                setOwners(flattenedOwners);
                setLoading(false);
            } catch (error) {
                setError('Failed to load owners data');
                setLoading(false);
            }
        };

        fetchOwners();
    }, []);

    const columns = [
        { field: 'ownerId', headerName: 'Owner ID', width: 150 },
        { field: 'firstName', headerName: 'First Name', width: 200 },
        { field: 'lastName', headerName: 'Last Name', width: 200 },
        { field: 'contactInformation', headerName: 'Contact Information', width: 250 },
        { field: 'email', headerName: 'Email', width: 250 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    Property Owners List
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
                            rows={owners}
                            columns={columns}
                            getRowId={(row) => row.ownerId} // Use 'ownerId' as the unique row ID
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
                    <CSVLink data={owners} filename="property-owners.csv">
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

export default PropertyOwnerList;
