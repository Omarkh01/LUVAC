import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import image1 from "../images/hero-bg-1.jpg";
import image2 from "../images/hero-bg-2.jpg";
import image3 from "../images/hero-bg-3.jpg";
import image4 from "../images/hero-bg-4.jpg";
import image5 from "../images/hero-bg-5.jpg";
import "./style.css";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2, image3, image4, image5];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex) => (currentImageIndex + 1) % 5);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  return (
    <>
      <div className="login-button-container btn btn-danger">
        <Link to="/login" className="loginButton">
          Login
        </Link>
      </div>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      ></div>
    </>
  );
};

export default Home;
