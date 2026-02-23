import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      if (res.status === 201) {
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        console.log("Unexpected response structure", res);
        setError("Invalid response from server");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setError(
        error.response?.data?.message ||
          "Registration Failed. Please try again."
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
        background: `linear-gradient(135deg, #9C27B0, #7B1FA2, #673AB7)`,
        padding: "0",
        margin: "0",
        position: "fixed", // <--- Add this line
        top: 0, // <--- Add this line
        left: 0, // <--- Add this line
        zIndex: 0,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
          borderRadius: "16px",
          padding: "30px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          marginTop: "0", // Added to remove top margin
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#7B1FA2",
            marginBottom: "25px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Silent Bridge Registration
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
              style={{
                display: "block",
                fontSize: "1rem",
                color: "#555",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #BDBDBD",
                fontSize: "1rem",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                "&:focus": {
                  borderColor: "#7B1FA2",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                },
              }}
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "1rem",
                color: "#555",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #BDBDBD",
                fontSize: "1rem",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                "&:focus": {
                  borderColor: "#7B1FA2",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                },
              }}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "1rem",
                color: "#555",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #BDBDBD",
                fontSize: "1rem",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                "&:focus": {
                  borderColor: "#7B1FA2",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                },
              }}
              placeholder="Create a password"
              required
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "1rem",
                color: "#555",
                marginBottom: "8px",
                fontWeight: "600",
              }}
            >
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #BDBDBD",
                fontSize: "1rem",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                "&:focus": {
                  borderColor: "#7B1FA2",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#7B1FA2",
              color: "#fff",
              padding: "14px 24px",
              borderRadius: "10px",
              border: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition:
                "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
              "&:hover": {
                backgroundColor: "#6A1B9A",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Register
          </button>
        </form>
        <p
          style={{
            marginTop: "24px",
            fontSize: "0.9rem",
            color: "#777",
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/silent-bridge/login"
            style={{
              color: "#7B1FA2",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
