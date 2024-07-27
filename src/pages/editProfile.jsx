import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/editProfile.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { useEditProfile } from "../hooks/useEditProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultImageUrl =
  "https://img.freepik.com/premium-vector/happy-smiling-young-man-avatar-3d-portrait-man-cartoon-character-people-vector-illustration_653240-187.jpg";

const EditProfile = () => {
  const {
    profile = {},
    fileInputRef,
    handleImageClick,
    handleFileChange,
    handleInputChange,
    handleSubmit,
  } = useEditProfile();

  const notifySuccess = () => toast.success("Profile updated successfully!");
  const notifyError = () => toast.error("Failed to update profile.");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit();
      notifySuccess();
    } catch (error) {
      notifyError();
    }
  };

  return (
    <Helmet title="Edit Profile">
      <CommonSection title="Edit Profile" />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col lg="6">
            <div className="text-center mb-4">
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="toast-container-custom"
              />
            </div>
            <Card className="p-4">
              <CardBody>
                <form onSubmit={handleSubmitForm}>
                  <div className="d-flex align-items-center mb-4 position-relative justify-content-center">
                    <div
                      className="flex-shrink-0 position-relative"
                      onClick={handleImageClick}
                      role="button"
                      aria-label="Upload profile picture"
                    >
                      <img
                        src={profile.image || defaultImageUrl}
                        alt="Profile"
                        className="img-fluid rounded-circle border border-dark border-3"
                        style={{ width: "120px" }}
                      />
                      <div className="upload-icon">
                        <i className="fas fa-upload"></i>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      name="firstname"
                      value={profile.firstname || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      name="lastname"
                      value={profile.lastname || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={profile.email || ""}
                      onChange={handleInputChange}
                      required
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tel" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tel"
                      name="tel"
                      value={profile.tel || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={profile.address || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="birthdate" className="form-label">
                      Birthdate
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="birthdate"
                      name="birthdate"
                      value={profile.birthdate || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="my-5 text-center">
                    <Button type="submit" className="addTOCart__btn">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

export default EditProfile;
