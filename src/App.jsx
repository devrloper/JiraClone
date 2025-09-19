import React from "react";
import Dashboard from "./Pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import CardDetails from "./Components/DetailCard";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<SignupPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
