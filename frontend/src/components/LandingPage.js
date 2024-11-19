import React from 'react';
import { Button, Box, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom to handle navigation

const LandingPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#e9e5cd"
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 600,
          width: '90%',
          bgcolor: '#ffffff',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            color: '#00796b',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Welcome to the Property Fleet Management Portal
        </Typography>

        {/* Property Owner Buttons */}
        <Link to="/property-owner/login" style={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mb: 2,
              bgcolor: '#00796b',
              '&:hover': { bgcolor: '#004d40' },
            }}
          >
            Property Owner Login
          </Button>
        </Link>
        <Link to="/property-owner/register" style={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mb: 2,
              bgcolor: '#00796b',
              '&:hover': { bgcolor: '#004d40' },
            }}
          >
            Property Owner Register
          </Button>
        </Link>

        {/* Staff Buttons */}
        <Link to="/staff/login" style={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mb: 2,
              bgcolor: '#00796b',
              '&:hover': { bgcolor: '#004d40' },
            }}
          >
            Staff Login
          </Button>
        </Link>

        {/* Resident Buttons */}
        <Link to="/resident/login" style={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mb: 2,
              bgcolor: '#00796b',
              '&:hover': { bgcolor: '#004d40' },
            }}
          >
            Resident Login
          </Button>
        </Link>
      </Paper>
    </Box>
  );
};

export default LandingPage;
