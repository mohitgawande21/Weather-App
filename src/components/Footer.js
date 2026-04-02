import React from "react";

export default function Footer() {
  return (
    <footer
      className="fixed-bottom d-flex justify-content-center pb-1 px-3"
      style={{ pointerEvents: "none" }} // Logic: Click "through" the footer space
    >
      <div
        className="d-flex align-items-center px-3 py-2 shadow-lg border border-secondary border-opacity-25"
        style={{
          background: "rgba(15, 20, 30, 0.85)",
          backdropFilter: "blur(12px)",
          borderRadius: "100px",
          pointerEvents: "auto", // Logic: Click "on" the actual pill
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Profile Section */}
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-info d-flex align-items-center justify-content-center me-2 shadow-sm"
            style={{
              width: "22px",
              height: "22px",
              fontSize: "9px",
              fontWeight: "bold",
              color: "#000",
            }}
          >
            MG
          </div>
          <span
            className="text-white-50 fw-medium"
            style={{ fontSize: "11px", letterSpacing: "0.3px" }}
          >
            Mohit Gawande
          </span>
        </div>

        {/* Vertical Divider */}
        <div
          className="mx-3"
          style={{
            width: "1px",
            height: "14px",
            background: "rgba(255,255,255,0.2)",
          }}
        ></div>

        {/* Work Link */}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/mohitgawande21"
          className="text-info text-decoration-none fw-bold d-flex align-items-center hover-link"
          style={{
            fontSize: "10px",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
          }}
        >
          My Work
          <span className="ms-1" style={{ fontSize: "12px" }}>
            ↗
          </span>
        </a>
      </div>
    </footer>
  );
}
