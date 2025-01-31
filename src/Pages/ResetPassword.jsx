import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../Services/authService';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const ResetPassword = () => {
  const { token } = useParams(); // ✅ Extract token from URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await resetPassword(token, newPassword);
          setMessage('Password reset successfully. Redirecting to login...');
          setTimeout(() => navigate('/login'), 3000);
      } catch (err) {
          setError(err.response?.data || 'Failed to reset password.');
      }
  };

  return (
      <Container>
          <Typography variant="h4">Reset Password</Typography>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
              <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                  Reset Password
              </Button>
          </form>
      </Container>
  );
};

export default ResetPassword;