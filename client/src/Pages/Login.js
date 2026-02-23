import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );
      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        toast.success("Login Successful");
        navigate("/");
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login Failed. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #673AB7, #3F51B5)",
        padding: 0,
        margin: 0,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#3F51B5",
            marginBottom: "30px",
          }}
        >
          Silent Bridge Login
        </h2>
        {error && (
          <p style={{ color: "#f44336", marginBottom: "16px" }}>{error}</p>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "1rem",
                color: "#555",
                marginBottom: "8px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "1rem",
                color: "#555",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#3F51B5",
              color: "white",
              padding: "14px 24px",
              borderRadius: "8px",
              border: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: "24px", fontSize: "0.9rem", color: "#777" }}>
          Don't have an account?{" "}
          <Link
            to="/silent-bridge/register"
            style={{ color: "#3F51B5", fontWeight: "bold", textDecoration: "none" }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;