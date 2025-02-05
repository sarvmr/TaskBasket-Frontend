import axios from 'axios';

const API_URL = 'http://localhost:5080/api/auth';

export const registerUser = async (userData) => {
    return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  try {
      const response = await axios.post(`${API_URL}/login`, userData, {
          headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.token) {
          localStorage.setItem('token', response.data.token);
      }
      return response.data;
  } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      throw error;
  }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const sendPasswordResetEmail = async (email) => {
    return await axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = async (token, newPassword) => {
    return await axios.post(`${API_URL}/reset-password`, { token, newPassword }, {
        headers: { 'Content-Type': 'application/json' }
    });
};

export const fetchUser = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Fetch User Error:', error.response?.data || error.message);
        throw error;
    }
};

