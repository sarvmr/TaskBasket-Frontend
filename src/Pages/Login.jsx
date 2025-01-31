import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../Services/authService';
import { TextField, Button, Container, Typography, Alert, Stack, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username Or Email"
          name="usernameOrEmail"
          value={userData.usernameOrEmail}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={userData.password}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
          slotProps={{
            input: {
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
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      {/* Registration Link */}
      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Typography>Don't have an account?</Typography>
        <Link to="/register" style={{ marginLeft: '5px', textDecoration: 'none', color: '#1976d2' }}>
          Register here
        </Link>
      </Stack>
      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
          Forgot Password?
        </Link>
      </Stack>
    </Container>
  );
};

export default Login;