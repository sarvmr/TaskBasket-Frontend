import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../Services/authService';
import {
  TextField, Button, Container, Typography, Alert, Stack,
  IconButton, InputAdornment, Box
} from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle, Lock } from '@mui/icons-material';
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LoginImage from "../Images/LoginPage.jpeg";

const Login = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(userData); // Call login API

      if (response && response.token) {
        navigate('/'); // Redirect to home if login is successful
      } else {
        setError('Invalid credentials.'); // Handle unexpected API response
      }
    } catch (err) {
      setError(err.response?.data?.title || 'Login failed. Please try again.');
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#ffffff",
        gap: 4,
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: { xs: "auto", md: "auto" }, // Ensures the image matches login box height
        }}
      >
        <img
          src={LoginImage}
          alt="Login Illustration"
          style={{
            width: "100%",
            height: 460, // Stretch to match login box height
            objectFit: "cover", // Prevents distortion
            borderRadius: "10px",
          }}
          
        />
      </Box>

      {/* Login Box */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#f0ebf9",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          textAlign: "center",
          width: { xs: "auto", md: 400 },
          height: { xs: "auto", md: 400 }, // Match image height on large screens
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Welcome Back!
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Login to continue
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username or Email"
            name="usernameOrEmail"
            value={userData.usernameOrEmail}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={userData.password}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#6a0dad",
              "&:hover": { backgroundColor: "#4a078c" },
              borderRadius: "25px",
            }}
          >
            LOGIN
          </Button>
        </form>

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2, fontSize: "14px" }}>
          <Link to="/forgot-password" style={{ textDecoration: "none", color: "#1976d2" }}>
            Forgot Password?
          </Link>
          <Link to="/register" style={{ textDecoration: "none", color: "#1976d2" }}>
            Sign Up
          </Link>
        </Stack>

        <Typography variant="body2" sx={{ mt: 3 }}>
          Login with
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <GoogleIcon sx={{ mx: 1, cursor: "pointer", color: "#DB4437" }} />
          <FacebookIcon sx={{ mx: 1, cursor: "pointer", color: "#4267B2" }} />
          <TwitterIcon sx={{ mx: 1, cursor: "pointer", color: "#1DA1F2" }} />
        </Box>
      </Box>
    </Container>

  );
};

export default Login;