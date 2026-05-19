import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid Credentials");

    }
  };

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h2 className="mb-4">Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />

          <button className="btn btn-success w-100">
            Login
          </button>

        </form>

        <p className="mt-3">
          Don't have account? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>
  );
};

export default Login;