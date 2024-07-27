import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

// Remplacez ces URLs par celles de vos API
const API_URL = "https://votre-api.com";
const ORDERS_ENDPOINT = `${API_URL}/orders`;
const ADDRESSES_ENDPOINT = `${API_URL}/addresses`;

export const useProfile = () => {
  const { currentUser, logout } = useAuth();
  const [showSec, setShowSec] = useState("Dashboard");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    number: "",
    country: "",
    city: "",
    postalCode: "",
  });
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  // Fonction pour récupérer les commandes
  const fetchOrders = async () => {
    try {
      const response = await fetch(ORDERS_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`, // Ajoutez le token si nécessaire
        },
      });
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des commandes");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fonction pour récupérer les adresses
  const fetchAddresses = async () => {
    try {
      const response = await fetch(ADDRESSES_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`, // Ajoutez le token si nécessaire
        },
      });
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des adresses");
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      toast.success("Utilisateur déconnecté avec succès");
    } catch (error) {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  // Fonction pour soumettre les nouvelles adresses
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(ADDRESSES_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${currentUser?.token}`, // Ajoutez le token si nécessaire
        },
        body: JSON.stringify(formValues),
      });
      if (!response.ok)
        throw new Error("Erreur lors de la mise à jour de l'adresse");
      toast.success("Adresse mise à jour avec succès");
      fetchAddresses(); // Re-fetch addresses after update
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fonction pour éditer une adresse existante
  const handleEditAddress = async (e) => {
    e.preventDefault();
    try {
      const addressId = addresses[0]?.id; // Ajustez si nécessaire pour sélectionner la bonne adresse
      const response = await fetch(`${ADDRESSES_ENDPOINT}/${addressId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${currentUser?.token}`, // Ajoutez le token si nécessaire
        },
        body: JSON.stringify(formValues),
      });
      if (!response.ok)
        throw new Error("Erreur lors de la mise à jour de l'adresse");
      toast.success("Adresse mise à jour avec succès");
      fetchAddresses(); // Re-fetch addresses after update
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Charger les données au chargement du composant
  useEffect(() => {
    if (currentUser) {
      fetchOrders();
      fetchAddresses();
    }
  }, [currentUser]);

  const filteredOrders = orders.filter(
    (order) => order.orderInfo.user_email === currentUser?.email
  );

  return {
    showSec,
    setShowSec,
    formValues,
    setFormValues,
    submitHandler,
    handleEditAddress,
    filteredOrders,
    handleLogout,
    currentUser,
  };
};
