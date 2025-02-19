import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navigation/Navbar.jsx";
import Home from "./Components/Home/Home.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import About from "./Components/AboutUs/About.jsx";
import Contact from "./Components/ContactUs/Contact.jsx";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Login/Signup.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute.jsx";
import H544Table from './Components/Dashboard/PHI/H544Table.jsx';
import AcceptedRequestsTable from './Components/Dashboard/PHI/AcceptedRequestsTable.jsx';
import InwardForm from './Components/Dashboard/PHI/InwardForm.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

      <div className="flex-1 bg-white overflow-y-auto p-0 m-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/h544-table" element={<H544Table />} />
          <Route path="/accepted-requests" element={<AcceptedRequestsTable />} />
          <Route path="/inward-form/:patientId" element={<InwardForm />} />
        </Routes>
      </div>
      
      
      <Footer />
    </div>
  );
}

export default App;
