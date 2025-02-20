import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VisitInwardForm() {
    const location = useLocation();
    const { patientId } = location.state || {};
    const navigate = useNavigate();
  
    // Example data based on patientId (this can come from an API in real use cases)
    const patientData = {
      P001: {
        patientId: 'P001',
        phiId: 'PHI001',
        address: '123 Street, City',
        date: '2025-02-15',
        dateOfAnswer: '2025-02-16',
        invoiceNo: 'INV123',
        originalNo: 'ORG001',
        fromWhom: 'John Doe',
        subject: 'Routine Checkup',
        remarks: 'All good, follow-up after 6 months.',
        dateReciept: '2025-02-10',
      },
      P002: {
        patientId: 'P002',
        phiId: 'PHI002',
        address: '456 Avenue, Town',
        date: '2025-02-10',
        dateOfAnswer: '2025-02-12',
        invoiceNo: 'INV124',
        originalNo: 'ORG002',
        fromWhom: 'Jane Smith',
        subject: 'Emergency Consultation',
        remarks: 'Emergency treatment, follow-up next week.',
        dateReciept: '2025-02-09',
      },
      // Add more patient data as needed...
    };
  
    const [arrivalData] = useState(patientData[patientId] || {});
  
  
    const handleBack = () => {
      navigate(-1); // Navigate back to the previous page
    };
  
    return (
      <div className='justify-items-center'>
        <div className="w-2/3 items-center p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
          <h2 className="text-2xl text-center font-bold mb-10">
           Inward Form for Patient {patientId}
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10 mr-10">
            <div>
              <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
                Visit (Patient ID)
              </label>
              <p className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100">{arrivalData.patientId}</p>
            </div>
  
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <p className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100">{arrivalData.date}</p>
            </div>
  
            <div>
              <label htmlFor="invoiceNo" className="block text-sm font-medium text-gray-700">
                Invoice No
              </label>
              <p className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100">{arrivalData.invoiceNo}</p>
            </div>
  
            <div>
              <label htmlFor="dateReciept" className="block text-sm font-medium text-gray-700">
                Date of Receipt
              </label>
              <p className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100">{arrivalData.dateReciept}</p>
            </div>
  
            <div>
              <label htmlFor="fromWhom" className="block text-sm font-medium text-gray-700">
                From Whom
              </label>
              <p className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100">{arrivalData.fromWhom}</p>
            </div>
  
            <div>
              <label htmlFor="originalNo" className="block text-sm font-medium text-gray-700">
                Original Number
              </label>
              <p className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100">{arrivalData.originalNo}</p>
            </div>
  
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <p className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100">{arrivalData.subject}</p>
            </div>
  
            <div>
              <label htmlFor="dateOfAnswer" className="block text-sm font-medium text-gray-700">
                Date of Answer
              </label>
              <p className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100">{arrivalData.dateOfAnswer}</p>
            </div>
  
            <div>
              <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">
                Remarks
              </label>
              <p className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100">{arrivalData.remarks}</p>
            </div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 ml-10 mr-10'>
            <button
              onClick={handleBack}
              className="bg-green-500 w-40 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Back
            </button>
    
          </div>
        </div>
      </div>
    );
  }