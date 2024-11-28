import axios from 'axios';

const API_URL = 'http://localhost:9090/api/auth/';

export const authService = {
  signup: (userData) => {
    return axios.post(API_URL + 'signup', userData)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error("There was an error during the signup process!", error);
        throw error;
      });
  },
};
