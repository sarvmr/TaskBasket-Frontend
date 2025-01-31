import React, { useState } from 'react';
import { sendPasswordResetEmail } from '../Services/authService';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      setMessage('Password reset email sent successfully');
    } catch (error) {
      setError("Failed to send reset email");
    };
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Forgot Password</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="success">{message}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Send Reset Email
        </Button>
      </form>
    </Container>
  );
}

export default ForgotPassword;