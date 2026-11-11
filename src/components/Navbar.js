import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg modern-navbar">
      <div className="container">
        <Link className="navbar-brand-custom" to="/">
          <span className="brand-icon-box">
            <i className="fa-solid fa-house-chimney"></i>
          </span>
          <span>RoomEase</span>
        </Link>
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
            <li className="nav-item">
              <Link
                className={`nav-link modern-nav-link ${location.pathname === "/" ? "active" : ""}`}
                aria-current="page"
                to="/"
              >
                <i className="fa-solid fa-compass me-1"></i> Explore Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link modern-nav-link ${location.pathname === "/about" ? "active" : ""}`}
                to="/about"
              >
                <i className="fa-solid fa-circle-info me-1"></i> About Us
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? (
            <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
              <Link className="btn btn-nav-outline" to="/login" role="button">
                <i className="fa-solid fa-arrow-right-to-bracket me-1"></i> Login
              </Link>
              <Link className="btn btn-nav-primary" to="/signup" role="button">
                <i className="fa-solid fa-user-plus me-1"></i> Sign Up
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
              <button onClick={handleLogout} className="btn btn-nav-logout">
                <i className="fa-solid fa-arrow-right-from-bracket me-1"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
