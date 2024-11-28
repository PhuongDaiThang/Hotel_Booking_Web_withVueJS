// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:9090/api/auth/login';

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL, {
      email: email,
      password: password
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
