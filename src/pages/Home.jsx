import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import im1 from "../assets/images/im4.png";
import "../styles/hero-section.css";
import { Link } from "react-router-dom";
import Category from "../components/UI/category/Category.jsx";
import "../styles/home.css";
import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";
import products from "../assets/fake-data/products.js";
import foodCategoryImg01 from "../assets/images/hamburger.png";
import foodCategoryImg02 from "../assets/images/pizza.png";
import foodCategoryImg03 from "../assets/images/bread.png";
import ProductCard from "../components/UI/product-card/ProductCard.jsx";
import whyImg from "../assets/images/location.png";
import networkImg from "../assets/images/network.png";
import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";

const featureData = [
  {
    title: "Authentic Tunisian Flavors",
    imgUrl: featureImg01, // Make sure this image represents Tunisian cuisine
    desc: "Experience the true taste of Tunisia with dishes made from traditional recipes and authentic ingredients.",
  },

  {
    title: "Enjoy at Home",
    imgUrl: featureImg02, // This image should relate to dining or home experience
    desc: "Relax at home while we bring the flavors of Tunisia directly to your doorstep with quick and efficient delivery.",
  },
  {
    title: "Fresh and Local Ingredients",
    imgUrl: featureImg03, // Choose an image depicting fresh ingredients or local markets
    desc: "We source the freshest local ingredients to ensure every meal is both delicious and of the highest quality.",
  },
];

const Home = () => {
  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState(products);
  const [hotPizza, setHotPizza] = useState([]);

  useEffect(() => {
    const filteredPizza = products.filter((item) => item.category === "OJJA");
    const slicePizza = filteredPizza.slice(0, 4);
    setHotPizza(slicePizza);
  }, []);

  useEffect(() => {
    if (category === "ALL") {
      setAllProducts(products);
    }

    if (category === "COSCOUS") {
      const filteredProducts = products.filter(
        (item) => item.category === "COSCOUS"
      );
      setAllProducts(filteredProducts);
    }

    if (category === "OJJA") {
      const filteredProducts = products.filter(
        (item) => item.category === "OJJA"
      );
      setAllProducts(filteredProducts);
    }

    if (category === "MAQROUNA") {
      const filteredProducts = products.filter(
        (item) => item.category === "MAQROUNA"
      );
      setAllProducts(filteredProducts);
    }
  }, [category]);

  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h5 className="mb-3">Easy Way to Order</h5>
                <h1 className="mb-4 hero__title">
                  <span>Craving Tunisian?</span> Just wait <br /> flavor at
                  <span> your door</span>
                </h1>
                <p>Enjoy delicious Tunisian flavors delivered right to you.</p>

                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    Order now <i className="ri-arrow-right-s-line"></i>
                  </button>

                  <button className="all__foods-btn">
                    <Link to="/foods">See all foods</Link>
                  </button>
                </div>
                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-car-line"></i>
                    </span>{" "}
                    No shipping charge
                  </p>
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-shield-check-line"></i>
                    </span>{" "}
                    100% secure checkout
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={im1} alt="hero-img" className="w-100 circle-img" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Category />
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">What We Serve</h5>
              <h2 className="feature__title">
                Experience Authentic Tunisian Cuisine
              </h2>
              <h2 className="feature__title">
                Just <span>Relax</span> at Home
              </h2>
              <p className="mb-1 mt-4 feature__text">
                Discover the vibrant flavors of Tunisia from the comfort of your
                home. We bring you traditional dishes made with the freshest
                ingredients, ensuring each meal is a delightful experience.
              </p>
              <p className="feature__text">
                Sit back and enjoy our carefully crafted Tunisian specialties.
                Our commitment is to deliver authentic taste and quality with
                every order, making your dining experience truly exceptional.
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3">
                  <img
                    src={item.imgUrl}
                    alt="feature-img"
                    className="w-25 mb-3"
                  />
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2>Popular Foods</h2>
            </Col>

            <Col lg="12">
              <div className="food__category d-flex align-items-center justify-content-center gap-4">
                <button
                  className={`all__btn  ${
                    category === "ALL" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("ALL")}
                >
                  All
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "COSCOUS" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("COSCOUS")}
                >
                  <img src={foodCategoryImg01} alt="" />
                  Coscous
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "OJJA" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("OJJA")}
                >
                  <img src={foodCategoryImg02} alt="" />
                  Ojja
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "MAQROUNA" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("MAQROUNA")}
                >
                  <img src={foodCategoryImg03} alt="" />
                  Maqrouna
                </button>
              </div>
            </Col>

            {allProducts.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className="why__choose-us">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className="w-100" />
            </Col>

            <Col lg="6" md="6">
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Why <span>Tunisian Dishes?</span>
                </h2>
                <p className="tasty__treat-desc">
                  Discover the authentic taste of Tunisia with our handmade
                  dishes that bring a unique flavor to every meal. Enjoy rich
                  culinary heritage delivered straight to your doorstep.
                </p>

                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2">
                      <i className="ri-checkbox-circle-line"></i> Authentic and
                      Delicious Foods
                    </p>
                    <p className="choose__us-desc">
                      Enjoy traditional Tunisian recipes made with the finest
                      ingredients, ensuring every bite takes you on a delightful
                      journey.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2">
                      <i className="ri-checkbox-circle-line"></i> High-Quality
                      Support
                    </p>
                    <p className="choose__us-desc">
                      Our team is dedicated to providing exceptional service,
                      answering your inquiries, and ensuring a smooth
                      experience.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2">
                      <i className="ri-checkbox-circle-line"></i> Order from Any
                      Location
                    </p>
                    <p className="choose__us-desc">
                      Order from anywhere and enjoy our delicious meals
                      delivered to your location with ease.
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5 ">
              <h2>Hot Ojja</h2>
            </Col>

            {hotPizza.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial__desc">
                  Hear from our satisfied customers who have experienced the
                  rich flavors and authentic taste of our traditional Tunisian
                  dishes. Their feedback speaks volumes about our commitment to
                  quality and authenticity.
                </p>

                <TestimonialSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={networkImg} alt="testimonial-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
