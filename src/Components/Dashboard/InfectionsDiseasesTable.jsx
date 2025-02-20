import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const InfectionsDiseasesTable = () => {
  // Sample data for the table
  const data = [
    { 
      serialNo: 1,
      caseNo: 'A001', 
      dateOfReceipt: '2025-02-10', 
      districtDivision: 'Colombo 1', 
      locality: 'Wattala', 
      nameOfPatient: 'John Doe', 
      age: 35, 
      sex: 'Male', 
      race: 'Sinhalese', 
      occupation: 'Engineer', 
      religion: 'Buddhist', 
      natureOfDisease: 'Fever', 
      dateOfOnset: '2025-02-05', 
      notification: 'Yes', 
      byWhomNotified: 'Dr. Smith', 
      dateOfInvestigation: '2025-02-12', 
      byWhomInvestigated: 'Dr. Watson', 
      labResult: 'Negative', 
      isolation: 'Hospital', 
      dateOfTermination: '2025-02-15', 
      terminalDisinfectionDate: '2025-02-16', 
      sourceOfInfection: 'Unknown', 
      remarks: 'Recovered',
    },
    // Add more sample data here
  ];

  return (
    <div className="overflow-x-auto p-4">
      <Card>
        <CardHeader title="Infections and Diseases Table" />
        <CardContent>
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Serial No</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Case No</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date of Receipt of I.D. Card</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">District Revenue Officer's Division</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Locality</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name of Patient</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Age</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Sex</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Race</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Occupation</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Religion</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nature of Disease</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date of Onset</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Notification</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">By Whom Notified</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date of Investigation</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">By Whom Investigated</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Result of Laboratory Examination</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Isolation (Home, Hospital)</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date of Termination (Death, Recovery)</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date of Terminal Disinfection</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Source of Infection</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.caseNo} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{item.serialNo}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.caseNo}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.dateOfReceipt}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.districtDivision}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.locality}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.nameOfPatient}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.age}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.sex}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.race}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.occupation}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.religion}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.natureOfDisease}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.dateOfOnset}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.notification}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.byWhomNotified}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.dateOfInvestigation}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.byWhomInvestigated}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.labResult}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.isolation}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.dateOfTermination}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.terminalDisinfectionDate}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.sourceOfInfection}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfectionsDiseasesTable;
