import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button,
  ListGroup,
  ListGroupItem,
  Table,
  CardBody,
  Badge,
  Alert,
} from "reactstrap";
import User from "../assets/images/user.png";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import no_order_found from "../assets/images/no_order_found.png";
import { useProfile } from "../hooks/useProfile"; // Import your custom hook

const Profile = () => {
  const {
    showSec,
    setShowSec,
    formValues,
    setFormValues,
    submitHandler,
    handleEditAddress,
    filteredOrders,
    handleLogout,
    currentUser,
  } = useProfile(); // Use your custom hook

  const navigator = useNavigate();
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30;
  const totalAmount = cartTotalAmount + Number(shippingCost);

  const buttonColor = "#ff0000"; // Replace with the color used for "Payment Method" text

  const handleButtonClick = (section) => {
    setShowSec(section);
  };

  return (
    <Helmet title="My Account">
      <CommonSection title="My Account" />
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="my-5">
        <Container>
          <Row>
            <Col lg="4">
              <h3 className="mb-5">My Account</h3>
              <ListGroup>
                <ListGroupItem
                  action
                  tag="button"
                  onClick={() => handleButtonClick("Dashboard")}
                  style={{
                    backgroundColor:
                      showSec === "Dashboard" ? buttonColor : "transparent",
                    color: showSec === "Dashboard" ? "#fff" : "#000",
                  }}
                >
                  Dashboard
                </ListGroupItem>
                <ListGroupItem
                  action
                  tag="button"
                  onClick={() => handleButtonClick("Orders")}
                  style={{
                    backgroundColor:
                      showSec === "Orders" ? buttonColor : "transparent",
                    color: showSec === "Orders" ? "#fff" : "#000",
                  }}
                >
                  Orders
                </ListGroupItem>
                <ListGroupItem
                  action
                  tag="button"
                  onClick={() => handleButtonClick("Payment Method")}
                  style={{
                    backgroundColor:
                      showSec === "Payment Method"
                        ? buttonColor
                        : "transparent",
                    color: showSec === "Payment Method" ? "#fff" : "#000",
                  }}
                >
                  Payment Method
                </ListGroupItem>
                <ListGroupItem
                  action
                  tag="button"
                  onClick={() => navigator("/editProfile")}
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  Edit Profile
                </ListGroupItem>
                <ListGroupItem
                  action
                  tag="button"
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  Logout
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col lg="8" className="text-center">
              <Row>
                <Col>
                  {showSec === "Dashboard" && (
                    <>
                      <Card className="p-5">
                        <CardTitle tag="h1">Dashboard</CardTitle>
                        <CardText>
                          <h5>
                            Hello,{" "}
                            <span style={{ color: "red" }}>
                              {currentUser && currentUser.displayName} ({" "}
                              {currentUser && currentUser.email} )
                            </span>
                          </h5>
                          <img src={User} />
                          <p>
                            From your account dashboard, you can easily check &
                            view your recent orders, manage your shipping and
                            billing addresses, and logout from your account.
                          </p>
                        </CardText>
                        {currentUser && (
                          <Badge
                            style={{
                              width: "350px",
                              padding: "10px 100",
                              margin: "auto",
                            }}
                            className="py-3"
                            color="info"
                          >
                            <div>
                              Last Sign In
                              {currentUser.metadata.lastSignInTime}
                            </div>
                          </Badge>
                        )}
                        <Link
                          className="order__btn w-50 py-2 m-auto mt-4"
                          to="/foods"
                          style={{
                            backgroundColor: buttonColor,
                            color: "#fff",
                          }}
                        >
                          Back To Shopping
                        </Link>
                      </Card>
                    </>
                  )}
                  {showSec === "Orders" && (
                    <>
                      <h4 className="mb-5" style={{ color: buttonColor }}>
                        Your Orders List
                      </h4>
                      {filteredOrders.length > 0 ? (
                        <Table bordered>
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Name</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Total</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredOrders.map((order) => (
                              <tr key={order.id}>
                                <th scope="row">{order.id}</th>
                                <td>{order.address.name}</td>
                                <td>{order.orderInfo.date}</td>
                                <td>
                                  <Badge color="success">
                                    {order.orderInfo.status}
                                  </Badge>
                                </td>
                                <td>$ {order.orderInfo.totalAmount}</td>
                                <td>View</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : (
                        <Alert color="warning" className="m-5 p-5">
                          <h5>No Orders Found</h5>
                          <img
                            style={{ width: "30%" }}
                            src={no_order_found}
                            alt="No Order Found Img"
                          />
                          <h5 className="mb-5">
                            Looks like you have not placed any orders yet.
                          </h5>
                          <h4 className="my-1">
                            <Link
                              className="my-1"
                              style={{
                                color: buttonColor,
                                border: `4px solid ${buttonColor}`,
                                padding: "5px",
                              }}
                              to="/foods"
                            >
                              Back To Shopping
                            </Link>
                          </h4>
                        </Alert>
                      )}
                    </>
                  )}
                  {showSec === "Payment Method" && (
                    <>
                      <Card>
                        <CardBody>
                          <CardTitle tag="h3" style={{ color: buttonColor }}>
                            Payment Method
                          </CardTitle>
                          <CardText className="my-3">
                            You can't save your payment method yet.
                          </CardText>
                        </CardBody>
                      </Card>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Helmet>
  );
};

export default Profile;
