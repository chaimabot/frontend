import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import "../styles/register.css"; // Import the CSS file for custom styles

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { register, currentUser } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      firstname,
      lastname,
      email,
      password,
      tel,
      address,
      role: "client",
      birthdate,
      image,
    };
    try {
      await register(userData);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser, navigate]);

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Toaster position="top-center" reverseOrder={false} />
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <h3 className="mb-5">Create an Account</h3>
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="image-upload">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = () => setImage(reader.result);
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                    style={{ display: "none" }} // Hide the file input
                  />
                  <label htmlFor="image-upload" className="image-upload-label">
                    {image ? (
                      <img src={image} alt="Profile" className="profile-img" />
                    ) : (
                      <div className="upload-icon-container">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera fontSize="large" />
                        </IconButton>
                      </div>
                    )}
                  </label>
                </div>

                <div className="form__group">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Phone"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <input
                  type="hidden"
                  value="client" // Default and not editable
                />
                <div className="form__group">
                  <input
                    type="date"
                    placeholder="Birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Register
                </button>
              </form>
              <Link to="/login">
                <h6 className="my-4">Already have an account? Login</h6>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
