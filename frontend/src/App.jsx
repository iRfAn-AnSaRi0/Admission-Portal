import React from "react"
import LandingPage from "./pages/LandingPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginAndSignup from "./admin/LoginAndSignup";
import ApplicationDeatils from "./admin/ApplicationDeatils";
import AdminDashboard from "./admin/AdminDashboard";
import Application from "./pages/Application";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  

  return (
    <>
    <Router>
    <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
      <Route path="/" element={ <LandingPage />} />
        <Route path="/admin" element={<LoginAndSignup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/application/:id" element={<ApplicationDeatils />} />
        <Route path="/apply" element={<Application />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
