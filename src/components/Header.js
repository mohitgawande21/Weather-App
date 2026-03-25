import React from "react";
import { Link } from "react-router-dom";
import "../hover.css";
const banner = "https://d3vgbv6p5fstcv.cloudfront.net/assets/background.jpg";
const logo = "https://d3vgbv6p5fstcv.cloudfront.net/assets/logo.png";
export default function Header({ inputCityName }) {
  const imgStyle = {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: -1,
    left: 0,
    top: 0,
  };
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center p-1 ">
        <div className="d-flex align-items-center fixed-top bg-dark ">
          <Link className=" text-info mx-3 ml-3  " to="/">
            <div className="img-zoom-container">
              <img
                className="img-fluid"
                alt="logo"
                src={logo}
                width="50px"
                height="50px"
              />
            </div>
          </Link>
          <Link className="text-info mx-3 " to={`/${inputCityName}`}>
            <div className="container">
              <span>Full Day Forecast</span>
            </div>
          </Link>
        </div>
      </div>
      <img alt="background" src={banner} style={imgStyle} />
    </div>
  );
}
