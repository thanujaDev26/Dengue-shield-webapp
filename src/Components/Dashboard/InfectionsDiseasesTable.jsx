import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@mui/material";

const InfectionsDiseasesTable = () => {
  const [searchTerm, setSearchTerm] = useState({
    name: '',
    caseNo: '',
    date: '',
    investigator: ''
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data
  const data = [
    { 
      serialNo: 1,
      caseNo: 'H544-001', 
      dateOfReceipt: '2025-02-10',
      districtDivision: 'Colombo 1',
      locality: 'Wattala',
      nameOfPatient: 'John Doe',
      age: 35,
      sex: 'Male',
      race: 'Sinhalese',
      occupation: 'Engineer',
      religion: 'Buddhist',
      natureOfDisease: 'Dengue Fever',
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
  ];

  const filteredData = data.filter(item => {
    return (
      item.nameOfPatient.toLowerCase().includes(searchTerm.name.toLowerCase()) &&
      item.caseNo.includes(searchTerm.caseNo) &&
      item.dateOfTermination.includes(searchTerm.date) &&
      item.byWhomInvestigated.toLowerCase().includes(searchTerm.investigator.toLowerCase())
    );
  });

  const openReport = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <Card>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Infectious Case Report</h1>
          <div className="border-b-2 border-emerald-500 w-20"></div>
        </div>
        <CardContent>
          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by Name"
              className="p-2 border rounded"
              value={searchTerm.name}
              onChange={(e) => setSearchTerm({...searchTerm, name: e.target.value})}
            />
            <input
              type="text"
              placeholder="Search by H544 ID"
              className="p-2 border rounded"
              value={searchTerm.caseNo}
              onChange={(e) => setSearchTerm({...searchTerm, caseNo: e.target.value})}
            />
            <input
              type="date"
              className="p-2 border rounded"
              value={searchTerm.date}
              onChange={(e) => setSearchTerm({...searchTerm, date: e.target.value})}
            />
            <input
              type="text"
              placeholder="Search by Investigator"
              className="p-2 border rounded"
              value={searchTerm.investigator}
              onChange={(e) => setSearchTerm({...searchTerm, investigator: e.target.value})}
            />
          </div>

          {/* Simplified Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">H544 ID</th>
                  <th className="px-4 py-2 text-left">Patient Name</th>
                  <th className="px-4 py-2 text-left">Completed Date</th>
                  <th className="px-4 py-2 text-left">Investigated By</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.caseNo} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{item.caseNo}</td>
                    <td className="px-4 py-2">{item.nameOfPatient}</td>
                    <td className="px-4 py-2">{item.dateOfTermination}</td>
                    <td className="px-4 py-2">{item.byWhomInvestigated}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => openReport(item)}
                        className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Report Details Modal */}
          {isModalOpen && selectedReport && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-emerald-600">
                      Case Report: {selectedReport.caseNo}
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Patient Details */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Patient Details</h3>
                      <DetailRow label="Name" value={selectedReport.nameOfPatient} />
                      <DetailRow label="Age" value={selectedReport.age} />
                      <DetailRow label="Sex" value={selectedReport.sex} />
                      <DetailRow label="Occupation" value={selectedReport.occupation} />
                      <DetailRow label="Locality" value={selectedReport.locality} />
                    </div>

                    {/* Case Details */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Case Details</h3>
                      <DetailRow label="Disease" value={selectedReport.natureOfDisease} />
                      <DetailRow label="Onset Date" value={selectedReport.dateOfOnset} />
                      <DetailRow label="Lab Result" value={selectedReport.labResult} />
                      <DetailRow label="Isolation" value={selectedReport.isolation} />
                      <DetailRow label="Source of Infection" value={selectedReport.sourceOfInfection} />
                    </div>

                    {/* Investigation Details */}
                    <div className="col-span-full space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">Investigation Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <DetailRow label="Investigation Date" value={selectedReport.dateOfInvestigation} />
                        <DetailRow label="Investigated By" value={selectedReport.byWhomInvestigated} />
                        <DetailRow label="Notification Date" value={selectedReport.dateOfReceipt} />
                        <DetailRow label="Notified By" value={selectedReport.byWhomNotified} />
                        <DetailRow label="Termination Date" value={selectedReport.dateOfTermination} />
                        <DetailRow label="Disinfection Date" value={selectedReport.terminalDisinfectionDate} />
                      </div>
                    </div>

                    {/* Remarks */}
                    <div className="col-span-full">
                      <DetailRow label="Remarks" value={selectedReport.remarks} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b py-2">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-800">{value || '-'}</span>
  </div>
);

export default InfectionsDiseasesTable;