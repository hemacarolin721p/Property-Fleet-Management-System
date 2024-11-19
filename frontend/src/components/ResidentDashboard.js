import React, { useEffect, useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography, AppBar, Toolbar, Divider, Paper } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const ResidentDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState('');

    // Fetch properties when component is mounted
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/properties');
                const data = await response.json();

                if (response.ok) {
                    setProperties(data); // Set properties
                } else {
                    setError('Failed to load properties.');
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
                setError('An error occurred while fetching properties.');
            }
        };

        fetchProperties();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar */}
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    {/* Resident-specific links */}
                    <Typography variant="h6" sx={{ padding: '16px', fontWeight: 'bold' }}>Dashboard</Typography>
                    <ListItem button>
                        <Link to="home" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Home" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="list-property" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="View Properties" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="list-unit" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="View Units" />
                        </Link>
                    </ListItem> 
                    <ListItem button>
                        <Link to="property-search" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Property Search" />
                        </Link>
                    </ListItem> 
                    <ListItem button>
                        <Link to="unit-search" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Unit Search" />
                        </Link>
                    </ListItem>                   
                    <ListItem button>
                        <Link to="my-residency" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="My Residency" />
                        </Link>
                    </ListItem>

                    <Divider sx={{ marginY: 2 }} />

                    {/* Actions */}
                    <Typography variant="h6" sx={{ padding: '16px', fontWeight: 'bold' }}>Actions</Typography>
                    <ListItem button>
                        <Link to="update-details" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Update Details" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Logout" />
                        </Link>
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#e9e5cd',
                    padding: 3,
                }}
            >
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6">Resident Dashboard</Typography>
                    </Toolbar>
                </AppBar>
                {/* Render nested routes */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default ResidentDashboard;
