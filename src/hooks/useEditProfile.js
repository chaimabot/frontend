import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useEditProfile = () => {
  const { currentUser, fetchProfile, updateProfile } = useAuth();
  const [profile, setProfile] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      const formattedDate = currentUser.birthdate
        ? new Date(currentUser.birthdate).toISOString().split("T")[0]
        : "";
      setProfile({
        ...currentUser,
        birthdate: formattedDate,
      });
    } else {
      fetchProfile().then(() => {
        if (currentUser) {
          const formattedDate = currentUser.birthdate
            ? new Date(currentUser.birthdate).toISOString().split("T")[0]
            : "";
          setProfile({
            ...currentUser,
            birthdate: formattedDate,
          });
        }
      });
    }
  }, [currentUser, fetchProfile]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    // Handle file upload logic here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateProfile(profile); // Call updateProfile function
      await fetchProfile(); // Reload profile data after update
    } catch (error) {
      console.error("Update profile error:", error.message);
      throw new Error("Failed to update profile.");
    }
  };

  return {
    profile,
    fileInputRef,
    handleImageClick,
    handleFileChange,
    handleInputChange,
    handleSubmit,
  };
};
