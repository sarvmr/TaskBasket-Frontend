import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../Services/authService';
import { TextField, Button, Container, Typography, Alert, Stack, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, AccountCircle, Lock, Email } from '@mui/icons-material';
import LoginImage from "../Images/LoginPage.jpeg";

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
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
      await registerUser(userData);
      navigate('/login'); // Redirect to login after registration
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
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
        backgroundColor: "#f8f8f8",
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
          height: { xs: "auto", sm: "100%" },
        }}
      >
        <img
          src={LoginImage}
          alt="Register Illustration"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>

      {/* Register Box */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "white",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          textAlign: "center",
          width: { xs: "100%", md: 400 },
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Create an Account
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Sign up to get started
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={userData.username}
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
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
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
            REGISTER
          </Button>
        </form>

        <Stack direction="row" justifyContent="center" sx={{ mt: 2, fontSize: "14px" }}>
          <Typography>Already have an account?</Typography>
          <Link to="/login" style={{ marginLeft: "5px", textDecoration: "none", color: "#1976d2" }}>
            Login here
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};

export default Register;