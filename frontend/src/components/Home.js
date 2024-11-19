// src/components/Home.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Welcome to the Dashboard!
            </Typography>
            <Typography variant="body1">
                This is the home page where you can navigate to different sections of your dashboard.
            </Typography>
        </Box>
    );
};

export default Home;
