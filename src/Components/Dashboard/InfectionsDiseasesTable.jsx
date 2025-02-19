import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const PatientRecordsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data
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
    {
      serialNo: 2,
      caseNo: 'A002',
      dateOfReceipt: '2025-02-11',
      districtDivision: 'Colombo 2',
      locality: 'Dehiwala',
      nameOfPatient: 'Jane Smith',
      age: 28,
      sex: 'Female',
      race: 'Tamil',
      occupation: 'Teacher',
      religion: 'Hindu',
      natureOfDisease: 'Dengue',
      dateOfOnset: '2025-02-06',
      notification: 'Yes',
      byWhomNotified: 'Dr. Jones',
      dateOfInvestigation: '2025-02-13',
      byWhomInvestigated: 'Dr. Brown',
      labResult: 'Positive',
      isolation: 'Home',
      dateOfTermination: '2025-02-18',
      terminalDisinfectionDate: '2025-02-19',
      sourceOfInfection: 'Mosquito',
      remarks: 'Under observation',
    }
  ];

  // Filter data based on search term
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Patient Records</CardTitle>
        <Input
          placeholder="Search records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Serial No</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Case No</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Date of Receipt</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">District Division</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Locality</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Patient Name</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Age</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Sex</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Race</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Occupation</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Religion</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Disease</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Onset Date</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Notification</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Notified By</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Investigation Date</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Investigated By</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Lab Result</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Isolation</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Termination Date</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Disinfection Date</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Infection Source</th>
                <th className="whitespace-nowrap border-b p-2 text-left font-medium text-gray-600">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.caseNo} className="border-b hover:bg-gray-50">
                  <td className="p-2 text-sm text-gray-800">{item.serialNo}</td>
                  <td className="p-2 text-sm text-gray-800">{item.caseNo}</td>
                  <td className="p-2 text-sm text-gray-800">{item.dateOfReceipt}</td>
                  <td className="p-2 text-sm text-gray-800">{item.districtDivision}</td>
                  <td className="p-2 text-sm text-gray-800">{item.locality}</td>
                  <td className="p-2 text-sm text-gray-800">{item.nameOfPatient}</td>
                  <td className="p-2 text-sm text-gray-800">{item.age}</td>
                  <td className="p-2 text-sm text-gray-800">{item.sex}</td>
                  <td className="p-2 text-sm text-gray-800">{item.race}</td>
                  <td className="p-2 text-sm text-gray-800">{item.occupation}</td>
                  <td className="p-2 text-sm text-gray-800">{item.religion}</td>
                  <td className="p-2 text-sm text-gray-800">{item.natureOfDisease}</td>
                  <td className="p-2 text-sm text-gray-800">{item.dateOfOnset}</td>
                  <td className="p-2 text-sm text-gray-800">{item.notification}</td>
                  <td className="p-2 text-sm text-gray-800">{item.byWhomNotified}</td>
                  <td className="p-2 text-sm text-gray-800">{item.dateOfInvestigation}</td>
                  <td className="p-2 text-sm text-gray-800">{item.byWhomInvestigated}</td>
                  <td className="p-2 text-sm text-gray-800">{item.labResult}</td>
                  <td className="p-2 text-sm text-gray-800">{item.isolation}</td>
                  <td className="p-2 text-sm text-gray-800">{item.dateOfTermination}</td>
                  <td className="p-2 text-sm text-gray-800">{item.terminalDisinfectionDate}</td>
                  <td className="p-2 text-sm text-gray-800">{item.sourceOfInfection}</td>
                  <td className="p-2 text-sm text-gray-800">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientRecordsTable;