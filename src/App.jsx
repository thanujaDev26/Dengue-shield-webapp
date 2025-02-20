import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navigation/Navbar.jsx";
import Home from "./Components/Home/Home.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import About from "./Components/AboutUs/About.jsx";
import Contact from "./Components/ContactUs/Contact.jsx";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Login/Signup.jsx";
import Footer from "./Components/Footer/Footer.jsx";


import H544Table from "./Components/Dashboard/PHI/H544Table.jsx";
import AcceptedRequestsTable from "./Components/Dashboard/PHI/AcceptedRequestsTable.jsx";
import InwardForm from "./Components/Dashboard/PHI/InwardForm.jsx";


import OnwardForm from "./Components/Dashboard/PHI/OnwardForm.jsx";
import H411Form from "./Components/Dashboard/MOH/h411Form.jsx";
import InfectionsDiseasesTable from "./Components/Dashboard/InfectionsDiseasesTable.jsx";

import NoteBook from "./Components/Dashboard/PHI/NoteBook.jsx";
import Outwardform from "./Components/Dashboard/PHI/Outwardform.jsx";
import { Toaster } from "react-hot-toast";
import H544Form from "./Components/Dashboard/MOH/H544Form.jsx";
import PendingTable from "./Components/Dashboard/MOH/PendingTable.jsx";
import VisitInward from "./Components/Dashboard/MOH/VisitInward.jsx";
import VisitInwardForm from "./Components/Dashboard/MOH/VisitInwardForm.jsx";


function App() {
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  const [patients, setPatients] = useState([]);

  const handleFormSubmit = (patient) => {
      // Check if it's an update or new submission
      if (patients.some(p => p.patientId === patient.patientId)) {
          // Update existing patient
          setPatients((prevPatients) =>
              prevPatients.map((p) => (p.patientId === patient.patientId ? patient : p))
          );
      } else {
          // Add new patient
          setPatients((prevPatients) => [...prevPatients, patient]);
      }
  };



  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <Navbar />

      <div className="flex-1 bg-white overflow-y-auto p-0 m-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />

          <Route path="/h544-table" element={<H544Table />} />
          <Route path="/accepted-requests" element={<AcceptedRequestsTable />} />
          <Route path="/inward-form/:patientId" element={<InwardForm />} />
          <Route path="/onward-form" element={<OnwardForm />} />
          <Route path="/h411-form" element={<H411Form />} />
          <Route path="/infections-diseases-table" element={<InfectionsDiseasesTable />} />


          <Route
            path="/h544-table"
            element={<H544Table setAcceptedRequests={setAcceptedRequests} />}
          />
          <Route
            path="/accepted-requests"
            element={
              <AcceptedRequestsTable
                acceptedRequests={acceptedRequests}
                setAcceptedRequests={setAcceptedRequests}
              />
            }
          />
          <Route path="/inward-form/:patientId" element={<InwardForm />} />
          <Route
            path="/inward-form"
            element={
              <InwardForm
              // Make sure to pass any necessary props here
              />
            }
          />
          <Route path="/inward-form" element={<InwardForm />} />
          <Route path="/notebook" element={<NoteBook />} />

          <Route path="/outwardform" element={<Outwardform />} />
          <Route
            path="/inward-form"
            element={
              <InwardForm

              />
            }
          />
          <Route
            path="/notebook"
            element={
              <NoteBook />
            }
          />
          <Route
            path="/visit-inward"
            element={
              <VisitInward />
            }
          />

<Route
            path="/visit-inward-form"
            element={
              <VisitInwardForm />
            }
          />


          <Route
            path="/outwardform"
            element={
              <Outwardform />
            }
          />

          <Route
            path="/h544form"
            element={<H544Form onSubmit={handleFormSubmit} />}
          />
          <Route
            path="/pending-table"
            element={<PendingTable patients={patients} />}
          />
          <Route
            path="/edit-form"
            element={<H544Form onSubmit={handleFormSubmit} />}
          />


        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
