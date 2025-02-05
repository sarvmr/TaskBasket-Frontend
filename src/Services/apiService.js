import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5080/api';

export const fetchTasks = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
  });
    return response.data;
  } catch (error) {
    console.error('Fetch Tasks Error:', error.response?.data || error.message);
    throw error;
  }
}



