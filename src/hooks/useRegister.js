import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const useRegister = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    try {
      const userData = {
        firstname,
        lastname,
        email,
        password,
        tel,
        address,
        role: "user",
        birthdate,
      };
      await register(userData);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    tel,
    setTel,
    address,
    setAddress,
    birthdate,
    setBirthdate,
    handleSubmit,
  };
};

export default useRegister;
