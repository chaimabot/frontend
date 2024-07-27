import axios from "axios";

const API_URL = "http://localhost:8000/api/profile";

export const login = (email, password) =>
  axios.post(`${API_URL}/signin`, { email, password });

export const register = (userData) => axios.post(`${API_URL}/signup`, userData);

export const forgotPassword = (email) =>
  axios.post(`${API_URL}/reset-password`, { email });

export const resetPassword = (token, newPassword) =>
  axios.post(`${API_URL}/reset-password/${token}`, { newPassword });

export const getProfile = async (userId, token) => {
  return axios.get(`${API_URL}/${userId}`, {
    headers: {
      "x-auth-token": token,
    },
  });
};
export const updateProfile = (profileData, token) => {
  return axios.put(`${API_URL}/profile`, profileData, {
    headers: { "x-auth-token": token },
  });
};
