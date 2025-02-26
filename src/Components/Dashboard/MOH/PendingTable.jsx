// PendingTable.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const PendingTable = () => {
    const sampleData = [
        {
            patientId: 1,
            address: 'address', // Main date outside formData
            patientName: 'John Doe',
        },
      ];
    const [patients] = useState(sampleData);

    const navigate = useNavigate();

    // Handle back button
    const handleBack = () => {
        navigate('/dashboard'); // Navigate back to the previous page
    };

    // Handle edit button click
    const handleEdit = (patient) => {
        navigate('/edit-form', { state: { patient } });
    };

    return (
        <div className="w-full p-6 rounded mt-8">
            <button
                onClick={handleBack}
                className="bg-emerald-800 text-white px-4 py-2 w-40 rounded-full hover:bg-emerald-500 mb-4"
            >
                Back
            </button>
            
            <div className="w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl text-center font-bold mb-5">Pending H544 Table</h2>
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Patient ID</th>
                            <th className="border px-4 py-2">Patient Name</th>
                            <th className="border px-4 py-2">Patient Address</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 text-center">{patient.patientId}</td>
                                <td className="border px-4 py-2 text-center">{patient.patientName}</td>
                                <td className="border px-4 py-2 text-center">{patient.address}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleEdit(patient)} // Pass patient data on edit
                                        className="bg-emerald-500 text-white px-4 py-2 rounded w-40 hover:bg-emerald-400"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingTable;
