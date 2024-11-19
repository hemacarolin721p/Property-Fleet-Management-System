import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const CommonAreaList = () => {
    const [commonAreas, setCommonAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCommonAreas = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/common-areas');
                if (!response.ok) {
                    throw new Error('Failed to fetch common areas data');
                }
                const data = await response.json();

                // Flatten common area data
                const flattenedCommonAreas = data.map((area) => ({
                    id: `${area.id.propertyId}-${area.id.areaName}`,
                    propertyId: area.id.propertyId,
                    areaName: area.id.areaName,
                    accessLevel: area.accessLevel,
                    maintenanceSchedule: area.maintenanceSchedule,
                    propertyName: area.property.propertyName,
                    ownerName: `${area.property.propertyOwner.firstName} ${area.property.propertyOwner.lastName}`,
                }));

                setCommonAreas(flattenedCommonAreas);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching common areas:', error);
                setError('Failed to load common areas data');
                setLoading(false);
            }
        };

        fetchCommonAreas();
    }, []);

    const columns = [
        { field: 'propertyId', headerName: 'Property ID', width: 120 },
        { field: 'propertyName', headerName: 'Property Name', width: 200 },
        { field: 'areaName', headerName: 'Area Name', width: 200 },
        { field: 'accessLevel', headerName: 'Access Level', width: 150 },
        { field: 'maintenanceSchedule', headerName: 'Maintenance Schedule', width: 300 },
        { field: 'ownerName', headerName: 'Owner Name', width: 200 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    Common Areas
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
                            rows={commonAreas}
                            columns={columns}
                            getRowId={(row) => row.id}
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
                    <CSVLink data={commonAreas} filename="common_areas.csv">
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

export default CommonAreaList;