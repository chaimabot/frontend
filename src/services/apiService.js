import axios from "axios";

const API_URL = "http://localhost:8000/api/profile";

export const login = (email, password) =>
  axios.post(`${API_URL}/signin`, { email, password });

export const register = (userData) => axios.post(`${API_URL}/signup`, userData);

export const forgotPassword = (email) =>
  axios.post(`${API_URL}/reset-password`, { email });

export const resetPassword = (token, newPassword) =>
  axios.post(`${API_URL}/reset-password/${token}`, { newPassword });
