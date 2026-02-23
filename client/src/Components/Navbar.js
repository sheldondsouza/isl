import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/logo.png";
import { AuthContext } from "../context/AuthContext";

const buttonStyle = {
  padding: "8px 24px",
  borderRadius: "25px",
  background: "linear-gradient(to right, #f44336, #ff9800)",
  color: "white",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  border: "none",
  cursor: "pointer",
  fontSize: "1rem",
};

const mobileButtonLogoutStyle = {
  ...buttonStyle,
  width: "100%",
};

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const renderAvatar = () => {
  if (user?.profilePic) {
    return (
      <img
        src={user.profilePic}
        alt="Profile"
        style={{
          width: '2.5rem',       // Tailwind: w-10  (1rem = 16px, 10 * 16 = 40px => 40/16 = 2.5rem)
          height: '2.5rem',      // Tailwind: h-10
          borderRadius: '50%',    // Tailwind: rounded-full
          objectFit: 'cover',    // Tailwind: object-cover
          border: '2px solid #34d399', // Tailwind: border-2 border-green-500
        }}
      />
    );
  } else {
    const initial = user?.username?.[0]?.toUpperCase() || "U";
    return (
      <div style={{
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        backgroundColor: '#34d399', // Tailwind: bg-green-500
        color: '#fff',             // Tailwind: text-white
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',      // Tailwind: text-lg  20px / 16px = 1.25rem
        fontWeight: 'bold',         // Tailwind: font-bold
        border: '2px solid #16a34a'  // Tailwind: border-2 border-green-700
      }}>
        {initial}
      </div>
    );
  }
};

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const location = useLocation();

  if (
    location.pathname === "/silent-bridge/register" ||
    location.pathname === "/silent-bridge/login"
  )
    return null;
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top py-3"
      style={{
        background: "#3f3aaa",
        borderBottom: "none",
        marginBottom: "0",
        boxShadow: "none", // Remove shadow to blend with homepage
      }}
      id="mainNav"
    >
      <div className="container px-4 px-lg-5 d-flex justify-content-between align-items-center">
        {/* Logo & Brand Name */}
        <Link
          to="/silent-bridge/home"
          className="navbar-brand d-flex align-items-center"
        >
          <img src={logo} width="40" height="40" className="me-2" alt="Logo" />
          <span className="fw-bold fs-4 text-white">Silent Bridge</span>
        </Link>

        {/* Custom Navbar Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarResponsive"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <div
            className="d-flex flex-column justify-content-between"
            style={{ height: "24px" }}
          >
            <span
              className="bg-white rounded-pill"
              style={{ height: "3px", width: "24px", display: "block" }}
            ></span>
            <span
              className="bg-white rounded-pill"
              style={{ height: "3px", width: "24px", display: "block" }}
            ></span>
            <span
              className="bg-white rounded-pill"
              style={{ height: "3px", width: "24px", display: "block" }}
            ></span>
          </div>
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse justify-content-end ${
            isMenuOpen ? "show" : ""
          }`}
          id="navbarResponsive"
        >
          <ul className="navbar-nav d-flex align-items-center gap-4">
            <li className="nav-item">
              <Link
                to="/silent-bridge/home"
                className="nav-link fs-6 text-white"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/silent-bridge/convert"
                className="nav-link fs-6 text-white"
              >
                Convert
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/silent-bridge/learn-sign"
                className="nav-link fs-6 text-white"
              >
                Learn Sign
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="http://localhost:8501"
                className="nav-link fs-6 text-white"
                target="_blank" // Opens in a new tab
                rel="noopener noreferrer"
              >
                Live Translate
              </a>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link
                    to="/silent-bridge/profile"
                    className="nav-link fs-6 text-white"
                  >
                    {renderAvatar()}
                  </Link>
                </li>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  style={buttonStyle}
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <Link
                    to="/silent-bridge/login"
                    className="nav-link fs-6 text-white"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/silent-bridge/register"
                    className="nav-link fs-6 text-white"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-menu-overlay position-fixed w-100"
          style={{
            top: "76px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "#3f3aaa",
            zIndex: 999,
          }}
        >
          <div className="container py-4">
            <ul className="nav flex-column gap-3">
              <li className="nav-item">
                <Link
                  to="/silent-bridge/home"
                  className="nav-link fs-5 text-white"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/silent-bridge/convert"
                  className="nav-link fs-5 text-white"
                  onClick={toggleMenu}
                >
                  Convert
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/silent-bridge/learn-sign"
                  className="nav-link fs-5 text-white"
                  onClick={toggleMenu}
                >
                  Learn Sign
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="http://localhost:8501"
                  className="nav-link fs-5 text-white"
                  target="_blank" // Opens in a new tab
                  rel="noopener noreferrer"
                  onClick={toggleMenu}
                >
                  Live Translate
                </a>
              </li>
              {user && (
                <>
                  <li className="nav-item">
                    <Link
                      to="/silent-bridge/profile"
                      className="nav-link fs-6 text-white"
                    >
                      {renderAvatar()}
                    </Link>
                  </li>

                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    style={mobileButtonLogoutStyle}
                  >
                    Logout
                  </button>
                </>
              )}
              {!user && (
                <>
                  <li className="nav-item">
                    <Link
                      to="/silent-bridge/login"
                      className="nav-link fs-5 text-white"
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/silent-bridge/register"
                      className="nav-link fs-5 text-white"
                      onClick={toggleMenu}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
