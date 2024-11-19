import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography, AppBar, Toolbar, Divider } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';  // Import Outlet

const Dashboard = () => {
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
                    {/* Lists Category */}
                    <Typography variant="h6" sx={{ padding: '16px', fontWeight: 'bold' }}>Lists</Typography>
                    <ListItem button>
                        <Link to="home" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Home" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="list-property" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="All Properties" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="list-staff" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="All Staff" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="staff-property" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Staff with Property List" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="list-unit" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Units List" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="list-owner" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Owners List" />
                        </Link>
                    </ListItem>

                    <Divider sx={{ marginY: 2 }} /> {/* Divider between lists and actions */}

                    {/* Actions Category */}
                    <Typography variant="h6" sx={{ padding: '16px', fontWeight: 'bold' }}>Actions</Typography>
                    <ListItem button>
                        <Link to="staff-registration" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Staff Registration" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="add-unit" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Add Unit" />
                        </Link>
                    </ListItem>  
                    <ListItem button>
                        <Link to="add-property" style={{ textDecoration: 'none' }}>
                            <ListItemText primary="Add Property" />
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
                        <Typography variant="h6">Dashboard</Typography>
                    </Toolbar>
                </AppBar>

                {/* Render the nested routes */}
                <Outlet /> {/* This will render the nested route content */}
            </Box>
        </Box>
    );
};

export default Dashboard;
