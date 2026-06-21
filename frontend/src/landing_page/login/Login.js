import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
    axios.post(`${apiUrl}/login`, form)
      .then((res) => {
        const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || `http://localhost:${window.location.port === "3000" ? "3001" : "3000"}`;
        window.location.href = `${dashboardUrl}/?token=` + res.data.token;
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Login Failed!");
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Your Account</h2>
        <p className="subtitle">Welcome back! Continue your investing journey.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
