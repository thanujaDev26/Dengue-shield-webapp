// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import H544Table from './PHI/H544Table';
import AcceptedRequestsTable from './PHI/AcceptedRequestsTable';


function LandingApp() {
  return (
    <Router>
      <div className="App">
        <Routes>
            
          <Route path="/h544-table" element={<H544Table />} />
          <Route path="/accepted-requests" element={<AcceptedRequestsTable />} />
          <Route path="/inward-form/:patientId" element={<InwardForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default LandingApp;
