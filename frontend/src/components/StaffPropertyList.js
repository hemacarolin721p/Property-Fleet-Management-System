import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';

const StaffPropertyList = () => {
    const [staffMembers, setStaffMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStaffMembers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/staff/with-properties-and-units');
                if (!response.ok) {
                    throw new Error('Failed to fetch staff data');
                }
                const data = await response.json();

                // Flatten staff data
                const flattenedStaffMembers = data.map((staff) => ({
                    id: staff.staffId,
                    firstName: staff.firstName,
                    lastName: staff.lastName,
                    role: staff.role,
                    contactInformation: staff.contactInformation,
                    assignedPropertyId: staff.assignedProperty ? staff.assignedProperty.propertyId : 'N/A',
                    assignedPropertyName: staff.assignedProperty ? staff.assignedProperty.propertyName : 'N/A',
                    propertyCity: staff.assignedProperty ? staff.assignedProperty.city : 'N/A',
                    propertyState: staff.assignedProperty ? staff.assignedProperty.state : 'N/A',
                    propertyStreet: staff.assignedProperty ? staff.assignedProperty.street : 'N/A',
                    propertyZipcode: staff.assignedProperty ? staff.assignedProperty.zipcode : 'N/A',
                    propertyType: staff.assignedProperty ? staff.assignedProperty.type : 'N/A',
                    numberOfUnits: staff.assignedProperty ? staff.assignedProperty.numberOfUnits : 'N/A',
                    propertySize: staff.assignedProperty ? staff.assignedProperty.propertySize : 'N/A',
                    constructionDate: staff.assignedProperty ? staff.assignedProperty.constructionDate : 'N/A',
                    propertyOwnerId: (staff.assignedProperty && staff.assignedProperty.propertyOwner) ? 
                        staff.assignedProperty.propertyOwner.ownerId : 'N/A',
                    propertyOwnerName: (staff.assignedProperty && staff.assignedProperty.propertyOwner) ? 
                        `${staff.assignedProperty.propertyOwner.firstName} ${staff.assignedProperty.propertyOwner.lastName}` : 'N/A',
                    propertyOwnerContact: (staff.assignedProperty && staff.assignedProperty.propertyOwner) ? 
                        staff.assignedProperty.propertyOwner.contactInformation : 'N/A',
                    propertyOwnerEmail: (staff.assignedProperty && staff.assignedProperty.propertyOwner) ? 
                        staff.assignedProperty.propertyOwner.email : 'N/A',
                    hireDate: staff.hireDate,
                    employmentStatus: staff.employmentStatus,
                }));

                setStaffMembers(flattenedStaffMembers);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching staff:', error);
                setError('Failed to load staff data');
                setLoading(false);
            }
        };

        fetchStaffMembers();
    }, []);

    const columns = [
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'role', headerName: 'Role', width: 150 },
        { field: 'contactInformation', headerName: 'Contact Information', width: 200 },
        { field: 'assignedPropertyId', headerName: 'Assigned Property ID', width: 180 },
        { field: 'assignedPropertyName', headerName: 'Assigned Property Name', width: 200 },
        { field: 'propertyCity', headerName: 'City', width: 150 },
        { field: 'propertyState', headerName: 'State', width: 100 },
        { field: 'propertyStreet', headerName: 'Street', width: 200 },
        { field: 'propertyZipcode', headerName: 'Zip Code', width: 120 },
        { field: 'propertyType', headerName: 'Type', width: 120 },
        { field: 'numberOfUnits', headerName: '# of Units', width: 120 },
        { field: 'propertySize', headerName: 'Size (sq ft)', width: 150 },
        { field: 'constructionDate', headerName: 'Construction Date', width: 150 },
        { field: 'propertyOwnerId', headerName: 'Owner ID', width: 120 },
        { field: 'propertyOwnerName', headerName: 'Owner Name', width: 200 },
        { field: 'propertyOwnerContact', headerName: 'Owner Contact Info', width: 200 },
        { field: 'propertyOwnerEmail', headerName: 'Owner Email', width: 200 },
        { field: 'hireDate', headerName: 'Hire Date', width: 150 },
        { field: 'employmentStatus', headerName: 'Employment Status', width: 150 },
    ];

    return (
        <Box sx={{ padding: 3, height:'100vh' ,display:'flex' ,justifyContent:'center' ,alignItems:'center' ,backgroundColor:'#f5f5f5'}}>
            <Box sx={{width:'100%' ,maxWidth:'1200px' ,height:'100%' ,display:'flex' ,flexDirection:'column'}}>
                <Typography variant="h5" sx={{ mb :2 ,textAlign:'center' ,color:'#00796b' ,fontWeight:'bold'}}>
                    Staff Members with Property and Owner Details
                </Typography>

                {loading ? (
                    <Box sx={{ display:'flex' ,justifyContent:'center' ,alignItems:'center' ,height:'100%'}}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography variant="h6" color="error" sx={{ textAlign:'center' ,mt :3 }}>
                        {error}
                    </Typography>
                ) : (
                    <Box sx={{ flex :1 ,overflowY :'auto' ,height :'calc(100% - 60px)' ,borderRadius :'8px'}}>
                        <DataGrid
                            rows={staffMembers}
                            columns={columns}
                            getRowId={(row) => row.id}
                            loading={loading}
                            rowHeight={60}
                            disableSelectionOnClick
                            sx={{
                                '& .MuiDataGrid-cell:hover': { backgroundColor:'#e0f7fa'},
                                '& .MuiDataGrid-columnHeaders': { backgroundColor:'#00796b' ,fontWeight :'bold'},
                                '& .MuiDataGrid-footerContainer': { backgroundColor:'#00796b' ,color :'white'},
                            }}
                        />
                    </Box>
                )}

                <Box sx={{ textAlign:'center' ,mt :3 }}>
                    <CSVLink data={staffMembers} filename="staff_members.csv">
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                bgcolor:'#00796b',
                                '&.MuiButtonBase-root:hover':{ bgcolor:'#004d40'},
                                fontSize:'1rem',
                                padding :'10px 20px',
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

export default StaffPropertyList;