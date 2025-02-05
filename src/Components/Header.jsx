import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { getToken, fetchUser } from "../Services/authService";

const Header = () => {
  const [username, setUsername] = useState("Guest");
  const token = getToken();

  useEffect(() => {
    if (token) {
      const loadUser = async () => {
        try {
          const userData = await fetchUser(); // Fetch user from API
          setUsername(userData.username || "User"); // Use the actual username
        } catch (error) {
          console.error("Failed to fetch username:", error);
        }
      };
      loadUser();
    }
  }, [token]); // Runs when token changes

  return (
    <AppBar position="static" sx={{ backgroundColor: "#26a0bd", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",  padding: "10px" }}>
      <Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Typography variant="h6" sx={{ fontStyle: "italic", fontSize: "1.2rem" }}>
            Welcome, {username}! 😊
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>

  );
};

export default Header;
