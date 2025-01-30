import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../Services/authService';
import { TextField, Button, Container, Typography, Alert, Stack } from '@mui/material';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser(userData);
    if (response.error) {
      setError(response.error);
    } else {
      navigate('/login');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Register</Typography>
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
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      {/* Login Link */}
      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Typography>Already have an account?</Typography>
        <Link to="/login" style={{ marginLeft: '5px', textDecoration: 'none', color: '#1976d2' }}>
          Login here
        </Link>
      </Stack>
    </Container>
  );
};

export default Register;