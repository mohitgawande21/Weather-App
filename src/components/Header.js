import React, { useState } from "react";
import { Link } from "react-router-dom";

const banner = "https://d3vgbv6p5fstcv.cloudfront.net/assets/background.jpg";
const logo = "https://d3vgbv6p5fstcv.cloudfront.net/assets/logo.png";

export default function Header({ currentCity }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Background Overlay */}
      <div
        className="vw-100 vh-100 position-fixed top-0 start-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
        }}
      />

      {/* Navbar */}
      <nav
        className="navbar fixed-top px-2 py-2 navbar-dark"
        style={{
          background: "rgba(32, 33, 34, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          zIndex: 1000,
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between flex-nowrap p-0 px-1">
          {/* LEFT: Logo & Brand (With Insights Text) */}
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center m-0 p-0 overflow-hidden flex-shrink-1"
          >
            <div
              className="rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm flex-shrink-0"
              style={{ width: "36px", height: "36px" }}
            >
              <img src={logo} alt="Home" style={{ width: "24px" }} />
            </div>
            <div className="ms-2 d-flex flex-column justify-content-center overflow-hidden">
              <span
                className="text-white fw-bold lh-1"
                style={{ fontSize: "0.95rem" }}
              >
                WeatherNow
              </span>
              {/* Keeping 'Smart weather insights' - using a very small font for ultra-narrow screens */}
              <small
                className="text-info opacity-75 lh-1 mt-1"
                style={{ fontSize: "0.55rem", whiteSpace: "nowrap" }}
              >
                Smart weather insights
              </small>
            </div>
          </Link>

          {/* RIGHT: Location & Menu Group */}
          <div className="d-flex align-items-center flex-shrink-0 ms-2">
            {/* Location Impression (No background/border, looks like info) */}
            <div
              className="d-flex align-items-center me-1"
              style={{ maxWidth: "110px" }}
            >
              <span style={{ fontSize: "14px" }}>📍</span>
              <span
                className="text-light ms-1 text-truncate"
                style={{ fontSize: "0.8rem", fontWeight: "400", opacity: 0.9 }}
              >
                {currentCity}
              </span>
            </div>

            {/* Hamburger Toggle */}
            <button
              className="navbar-toggler border-0 p-1"
              type="button"
              onClick={() => setIsOpen(true)}
              style={{ outline: "none", boxShadow: "none" }}
            >
              <span
                className="navbar-toggler-icon"
                style={{ width: "26px", height: "26px" }}
              ></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Panel */}
      <div
        className="position-fixed top-0 end-0 vh-100 bg-dark shadow-lg"
        style={{
          width: "240px", // Made sidebar slightly narrower
          zIndex: 1050,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="p-3">
          {" "}
          {/* Reduced outer padding */}
          <div className="d-flex justify-content-between align-items-center mb-4 mt-2 px-2">
            <h6
              className="text-info m-0 fw-bold"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "1.2px",
              }}
            >
              Navigation Menu
            </h6>
            <button
              className="btn-close btn-close-white shadow-none"
              style={{ width: "0.4em", height: "0.4em", padding: "10px" }}
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="d-flex flex-column gap-2 px-1">
            {/* Forecast Button - Slim Version */}
            <Link
              to={`/${currentCity}`}
              className="text-decoration-none"
              onClick={() => setIsOpen(false)}
            >
              <button
                className="btn btn-info w-100 rounded-pill d-flex align-items-center"
                style={{
                  color: "#000",
                  fontSize: "12px",
                  fontWeight: "600",
                  padding: "8px 16px", // Much smaller padding
                  border: "none",
                }}
              >
                <span className="me-2" style={{ fontSize: "14px" }}>
                  📅
                </span>{" "}
                Full Day Forecast
              </button>
            </Link>

            {/* Home Button - Slim Version */}
            <Link
              to="/"
              className="text-decoration-none"
              onClick={() => setIsOpen(false)}
            >
              <button
                className="btn btn-outline-secondary w-100 rounded-pill d-flex align-items-center border-opacity-25"
                style={{
                  fontSize: "12px",
                  color: "#fff",
                  padding: "8px 16px",
                  borderColor: "rgba(255,255,255,0.2)",
                }}
              >
                <span className="me-2" style={{ fontSize: "14px" }}>
                  🏠
                </span>{" "}
                Home
              </button>
            </Link>
          </div>
          {/* Add this inside the Sidebar div, below the navigation links */}
          <div className="position-absolute bottom-0 start-0 w-100 p-4 border-top border-secondary border-opacity-10">
            <div className="d-flex flex-column align-items-center gap-2">
              <a
                href="https://github.com/mohitgawande21"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-info btn-sm rounded-pill px-4 w-100"
                style={{ fontSize: "12px" }}
              >
                View Portfolio
              </a>
              <p
                className="m-0 text-white-50 mt-2"
                style={{ fontSize: "10px" }}
              >
                © 2026 • Built by Mohit Gawande
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "70px" }} />
    </>
  );
}
