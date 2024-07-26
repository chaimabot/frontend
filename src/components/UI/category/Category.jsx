import React from "react";
import { Container, Row, Col } from "reactstrap";
import categoryImg01 from "../../../assets/images/bibimbap.png";
import categoryImg02 from "../../../assets/images/donut.png";
import categoryImg03 from "../../../assets/images/appetizere.png";
import categoryImg04 from "../../../assets/images/salade.png";
import "../../../styles/category.css";

const categoryData = [
  {
    display: "Main Course",
    imgUrl: categoryImg01,
  },
  {
    display: "Dessert",
    imgUrl: categoryImg02,
  },
  {
    display: "Appetizer",
    imgUrl: categoryImg03,
  },
  {
    display: "Salad",
    imgUrl: categoryImg04,
  },
];

const Category = () => {
  return (
    <Container>
      <Row>
        {categoryData.map((item, index) => (
          <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={index}>
            <div className="category__item d-flex align-items-center gap-3">
              <div className="category__img">
                <img src={item.imgUrl} alt="category__item" />
              </div>
              <h6>{item.display}</h6>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Category;
