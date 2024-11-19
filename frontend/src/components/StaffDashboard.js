import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography, AppBar, Toolbar, Divider } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const StaffDashboard = () => {
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
                    {/* Staff-specific links */}
                    <Typography variant="h6" sx={{ padding: '16px', fontWeight: 'bold' }}>Dashboard</Typography>
                    <ListItem button>
                        <Link to="home" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Home" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="resident-list" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="All Residents" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="acess-devices" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="All Access Devices" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="lease-agreements" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="All Lease Agreements" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="maintenance-requests" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="All Maintenance Requests" />
                        </Link>
                    </ListItem>                    <ListItem button>
                        <Link to="parking-spot" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="All Parking Spots" />
                        </Link>
                    </ListItem>                    <ListItem button>
                        <Link to="access-log" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="All Access Logs" />
                        </Link>
                    </ListItem>                    <ListItem button>
                        <Link to="common-area" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="All Common area info" />
                        </Link>
                    </ListItem>                    <ListItem button>
                        <Link to="service-provider" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="All Service Providers" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="visitor-log" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="All Visitor Logs" />
                        </Link>
                    </ListItem>
            
                    <ListItem button>
                        <Link to="vehicle" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="All Vehicles" />
                        </Link>
                    </ListItem>
                    <Divider sx={{ marginY: 2 }} />

                    {/* Actions */}
                    <Typography variant="h6" sx={{ padding: '16px', fontWeight: 'bold' }}>Actions</Typography>
                    <ListItem button>
                        <Link to="resident-register" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Resident Registration" />
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
                        <Typography variant="h6">Staff Dashboard</Typography>
                    </Toolbar>
                </AppBar>

                {/* Render the nested routes */}
                <Outlet /> {/* This will render the nested route content */}
            </Box>
        </Box>
    );
};

export default StaffDashboard;
