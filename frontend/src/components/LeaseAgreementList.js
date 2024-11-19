import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const LeaseAgreementList = () => {
    const [leaseAgreements, setLeaseAgreements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeaseAgreements = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/lease-agreements');
                if (!response.ok) {
                    throw new Error('Failed to fetch lease agreements data');
                }
                const data = await response.json();

                const flattenedData = data.map((agreement) => ({
                    ...agreement,
                    residentName: agreement.resident ? `${agreement.resident.firstName} ${agreement.resident.lastName}` : 'N/A',
                    propertyName: agreement.property ? agreement.property.propertyName : 'N/A',
                    propertyId: agreement.property ? agreement.property.propertyId : 'N/A',
                    unitId: agreement.unit ? agreement.unit.unitId : 'N/A',
                    leaseStartDate: agreement.leaseStartDate || 'N/A',
                    leaseEndDate: agreement.leaseEndDate || 'N/A',
                    rentAmount: agreement.rentAmount || 'N/A',
                    securityDeposit: agreement.securityDeposit || 'N/A',
                    paymentFrequency: agreement.paymentFrequency || 'N/A',
                    status: agreement.status || 'N/A',
                }));

                setLeaseAgreements(flattenedData);
                setLoading(false);
            } catch (error) {
                setError('Failed to load lease agreements data');
                setLoading(false);
            }
        };

        fetchLeaseAgreements();
    }, []);

    const columns = [
        { field: 'residentName', headerName: 'Resident Name', width: 200 },
        { field: 'propertyName', headerName: 'Property Name', width: 200 },
        { field: 'propertyId', headerName: 'Property ID', width: 150 },
        { field: 'unitId', headerName: 'Unit ID', width: 150 },
        { field: 'leaseStartDate', headerName: 'Lease Start Date', width: 150 },
        { field: 'leaseEndDate', headerName: 'Lease End Date', width: 150 },
        { field: 'rentAmount', headerName: 'Rent Amount ($)', width: 150 },
        { field: 'securityDeposit', headerName: 'Security Deposit ($)', width: 150 },
        { field: 'paymentFrequency', headerName: 'Payment Frequency', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
    ];

    return (
        <Box sx={{ padding: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ width: '100%', maxWidth: '1200px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#00796b', fontWeight: 'bold' }}>
                    Lease Agreements
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
                            rows={leaseAgreements}
                            columns={columns}
                            getRowId={(row) => row.id || `${row.propertyId}-${row.unitId}-${row.resident?.residentId}`}
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
                    <CSVLink data={leaseAgreements} filename="lease_agreements.csv">
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

export default LeaseAgreementList;