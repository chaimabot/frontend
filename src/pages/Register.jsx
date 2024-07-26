import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useRegister from "../hooks/useRegister";
import "../styles/register.css"; // Import the CSS file for custom styles

const Register = () => {
  const {
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
  } = useRegister();

  const navigate = useNavigate();

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Toaster position="top-center" reverseOrder={false} />
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <h3 className="mb-5">Create an Account</h3>
              <form
                className="form mb-5"
                onSubmit={(e) => handleSubmit(e, navigate)}
              >
                {/* Removed the image upload section */}

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
