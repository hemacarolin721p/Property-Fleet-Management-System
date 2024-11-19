import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const ServiceProviderList = () => {
    const [serviceProviders, setServiceProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServiceProviders = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/service-providers');
                if (!response.ok) {
                    throw new Error('Failed to fetch service providers data');
                }
                const data = await response.json();
                
                // Flatten and transform the data
                const flattenedProviders = data.map(provider => ({
                    ...provider,
                    id: `${provider.id.companyName}-${provider.id.serviceType}`,
                    companyName: provider.id.companyName,
                    serviceType: provider.id.serviceType,
                    assignedPropertyId: provider.assignedProperty?.propertyId,
                    assignedPropertyName: provider.assignedProperty?.propertyName,
                }));

                setServiceProviders(flattenedProviders);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching service providers:', error);
                setError('Failed to load service providers data');
                setLoading(false);
            }
        };

        fetchServiceProviders();
    }, []);

    const columns = [
        { field: 'assignedPropertyId', headerName: 'Property ID', width: 120 },
        { field: 'companyName', headerName: 'Company Name', width: 200 },
        { field: 'serviceType', headerName: 'Service Type', width: 150 },
        { field: 'contactInformation', headerName: 'Contact', width: 150 },
        { field: 'assignedPropertyName', headerName: 'Property Name', width: 200 },
        { field: 'contractStartDate', headerName: 'Start Date', width: 120 },
        { field: 'contractEndDate', headerName: 'End Date', width: 120 },
        { field: 'status', headerName: 'Status', width: 120 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    Service Providers
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
                            rows={serviceProviders}
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
                    <CSVLink data={serviceProviders} filename="service_providers.csv">
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

export default ServiceProviderList;