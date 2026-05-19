import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="container ">

      <div className="card shadow w-50">

        <h1 className="mb-4 fw-bold ">
         💐 Welcome To Dashboard 💐
        </h1>

        <button
          className="btn btn-primary p-2 fw-bold "
          onClick={() => navigate("/tasks")}
        >
          Manage Tasks
        </button>

        <button
          className="btn btn-danger mt-3 fw-bold"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Dashboard;