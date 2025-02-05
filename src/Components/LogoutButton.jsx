import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Services/authService';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <Button onClick={handleLogout} variant="contained" 
     sx={{
        backgroundColor: "#ff5733",
        color: "white",
        "&:hover": {
          backgroundColor: "#f73378",
        },
     }}>
      Logout
    </Button>
  );
}

export default LogoutButton;