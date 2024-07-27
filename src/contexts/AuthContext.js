import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
} from "../services/apiService";

const AuthContext = createContext({
  currentUser: null,
  login: () => Promise,
  register: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
  logout: () => Promise,
  fetchProfile: () => Promise,
  updateProfile: () => Promise, // Assurez-vous d'ajouter cette fonction
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.user.id;
          if (userId) {
            const response = await getProfile(userId, token);
            setCurrentUser(response.data);
          }
        }
      } catch (error) {
        console.error("Fetch profile error:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.token);
      const decodedToken = jwtDecode(response.data.token);
      if (decodedToken.user && decodedToken.user._id) {
        localStorage.setItem("userId", decodedToken.user._id);
        setCurrentUser(response.data.user);
      } else {
        console.error("Token does not contain user or _id");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      throw new Error(error.message);
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await register(userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error("Registration error:", error.message);
      throw new Error(error.message);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      await forgotPassword(email);
    } catch (error) {
      console.error("Forgot password error:", error.message);
      throw new Error(error.message);
    }
  };

  const handleResetPassword = async (token, newPassword) => {
    try {
      await resetPassword(token, newPassword);
    } catch (error) {
      console.error("Reset password error:", error.message);
      throw new Error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;
        if (userId) {
          const response = await getProfile(userId, token);
          setCurrentUser(response.data);
        }
      }
    } catch (error) {
      console.error("Get profile error:", error.message);
      throw new Error(error.message);
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await updateProfile(profileData, token);
        setCurrentUser(response.data);
      }
    } catch (error) {
      console.error("Update profile error:", error.message);
      throw new Error(error.message);
    }
  };

  const value = {
    currentUser,
    login: handleLogin,
    register: handleRegister,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    logout: handleLogout,
    fetchProfile,
    updateProfile: handleUpdateProfile, // Assurez-vous que cette fonction est incluse
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
