import React, { createContext, useContext, useState, useEffect } from "react";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  uploadImage,
} from "../services/apiService";

const AuthContext = createContext({
  currentUser: null,
  login: () => Promise,
  register: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
  uploadImage: () => Promise,
  logout: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Optionally handle user session restoration
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Login error:", error.message);
      throw new Error(error.message);
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await register(userData);
      setCurrentUser(response.data);
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
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login: handleLogin,
    register: handleRegister,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
