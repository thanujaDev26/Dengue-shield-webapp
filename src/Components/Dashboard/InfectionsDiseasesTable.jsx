import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Modal,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import infectiousReportService from "../../service/infectiousReportService";

const InfectionsDiseasesTable = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    name: "",
    caseNo: "",
    date: "",
    investigator: "",
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await infectiousReportService.getReportById();
        const fetchedReports = response.data.map((report) => ({
          raw: report,
          serialNo: report.id,
          caseNo: `H544-${report.message?.h544?.id}`,
          dateOfReceipt: report.message?.h544?.dateOfAdmission,
          districtDivision: report.message?.mohOfficer?.district,
          locality: report.message?.phiOfficer?.area,
          nameOfPatient: report.message?.h544?.patient?.name,
          age: report.message?.h544?.patient?.age,
          sex: report.message?.h544?.patient?.gender,
          race: report.message?.h544?.patient?.race,
          occupation: report.message?.h544?.patient?.occupation,
          religion: report.message?.h544?.patient?.religion,
          natureOfDisease: report.message?.h544?.diseaseName,
          dateOfOnset: report.message?.h544?.dateOfOnset,
          notification: "Yes",
          byWhomNotified: report.message?.mohOfficer?.appuser?.name,
          dateOfInvestigation: report.message?.h411?.diseaseAsNotifiedDate,
          byWhomInvestigated: report.message?.phiOfficer?.appuser?.name,
          labResult: report.message?.h411?.laboratoryFindings,
          isolation: report.message?.noteBook?.isolation,
          dateOfTermination: report.message?.h411?.dateOfDischarge,
          terminalDisinfectionDate:
            report.message?.h411?.terminalDisinfectionDate || "-",
          sourceOfInfection: "Unknown",
          remarks: report.message?.noteBook?.remarks,
        }));
        setReports(fetchedReports);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      }
    };

    fetchReports();
  }, []);

  const filteredData = reports.filter((item) => {
    return (
      item.nameOfPatient
        ?.toLowerCase()
        .includes(searchTerm.name.toLowerCase()) &&
      item.caseNo?.includes(searchTerm.caseNo) &&
      item.dateOfTermination?.includes(searchTerm.date) &&
      item.byWhomInvestigated
        ?.toLowerCase()
        .includes(searchTerm.investigator.toLowerCase())
    );
  });

  const openReport = (report) => {
    setSelectedReport(report.raw);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <Card className="shadow-lg">
        <div className="mb-8 p-6 bg-green-100 rounded-t-md">
          <h1 className="text-3xl font-bold text-green-800">
            Infectious Case Report
          </h1>
          <div className="border-b-4 border-green-500 w-20 mt-2"></div>
        </div>
        <CardContent className="bg-white">
          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by Name"
              className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={searchTerm.name}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Search by H544 ID"
              className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={searchTerm.caseNo}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, caseNo: e.target.value })
              }
            />
            <input
              type="date"
              className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={searchTerm.date}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, date: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Search by Investigator"
              className="p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={searchTerm.investigator}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, investigator: e.target.value })
              }
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded border border-green-100">
            <Table>
              <TableHead className="bg-green-100">
                <TableRow>
                  <TableCell className="font-bold text-green-800">
                    Serial No
                  </TableCell>
                  <TableCell className="font-bold text-green-800">
                    Patient Name
                  </TableCell>
                  <TableCell className="font-bold text-green-800">
                    H544 ID
                  </TableCell>
                  <TableCell className="font-bold text-green-800">
                    Investigator
                  </TableCell>
                  <TableCell className="font-bold text-green-800">
                    Date of Termination
                  </TableCell>
                  <TableCell className="font-bold text-green-800">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <TableRow
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-green-50"}
                    >
                      <TableCell>{item.serialNo}</TableCell>
                      <TableCell>{item.nameOfPatient}</TableCell>
                      <TableCell>{item.caseNo}</TableCell>
                      <TableCell>{item.byWhomInvestigated}</TableCell>
                      <TableCell>{item.dateOfTermination}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => openReport(item)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded transition duration-200"
                        >
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No reports found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal for Report Details */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box className="bg-white max-h-[90vh] overflow-y-auto p-6 rounded-md w-[95%] md:w-[80%] lg:w-[60%] mx-auto mt-20 shadow-xl outline-none border-t-4 border-green-500">
          <Typography
            variant="h5"
            className="mb-6 font-bold text-green-700 text-center"
          >
            Full Infectious Case Report
          </Typography>
          {selectedReport && (
            <div className="space-y-6 text-sm text-gray-800">
              {/* Patient Info */}
              <div>
                <h2 className="font-semibold text-green-600 mb-2">
                  Patient Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p>
                    <strong>Name:</strong>{" "}
                    {selectedReport.message.h544?.patient?.name}
                  </p>
                  <p>
                    <strong>Age:</strong>{" "}
                    {selectedReport.message.h544?.patient?.age}
                  </p>
                  <p>
                    <strong>Gender:</strong>{" "}
                    {selectedReport.message.h544?.patient?.gender}
                  </p>
                  <p>
                    <strong>Race:</strong>{" "}
                    {selectedReport.message.h544?.patient?.race}
                  </p>
                  <p>
                    <strong>Occupation:</strong>{" "}
                    {selectedReport.message.h544?.patient?.occupation}
                  </p>
                  <p>
                    <strong>Religion:</strong>{" "}
                    {selectedReport.message.h544?.patient?.religion}
                  </p>
                </div>
              </div>

              {/* Case Info */}
              <div>
                <h2 className="font-semibold text-green-600 mb-2">
                  Case Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p>
                    <strong>H544 ID:</strong> H544-
                    {selectedReport.message.h544?.id}
                  </p>
                  <p>
                    <strong>Date of Admission:</strong>{" "}
                    {selectedReport.message.h544?.dateOfAdmission}
                  </p>
                  <p>
                    <strong>Disease:</strong>{" "}
                    {selectedReport.message.h544?.diseaseName}
                  </p>
                  <p>
                    <strong>Date of Onset:</strong>{" "}
                    {selectedReport.message.h544?.dateOfOnset}
                  </p>
                  <p>
                    <strong>Notification:</strong> Yes
                  </p>
                  <p>
                    <strong>By Whom Notified:</strong>{" "}
                    {selectedReport.message.mohOfficer?.appuser?.name}
                  </p>
                </div>
              </div>

              {/* Investigation */}
              <div>
                <h2 className="font-semibold text-green-600 mb-2">
                  Investigation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p>
                    <strong>Investigator:</strong>{" "}
                    {selectedReport.message.phiOfficer?.appuser?.name}
                  </p>
                  <p>
                    <strong>District:</strong>{" "}
                    {selectedReport.message.mohOfficer?.district}
                  </p>
                  <p>
                    <strong>Locality:</strong>{" "}
                    {selectedReport.message.phiOfficer?.area}
                  </p>
                  <p>
                    <strong>Date of Investigation:</strong>{" "}
                    {selectedReport.message.h411?.diseaseAsNotifiedDate}
                  </p>
                  <p>
                    <strong>Lab Results:</strong>{" "}
                    {selectedReport.message.h411?.laboratoryFindings || "N/A"}
                  </p>
                </div>
              </div>

              {/* Isolation & Termination */}
              <div>
                <h2 className="font-semibold text-green-600 mb-2">
                  Isolation & Discharge
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p>
                    <strong>Isolation:</strong>{" "}
                    {selectedReport.message.noteBook?.isolation || "No"}
                  </p>
                  <p>
                    <strong>Date of Termination:</strong>{" "}
                    {selectedReport.message.h411?.dateOfDischarge || "N/A"}
                  </p>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <h2 className="font-semibold text-green-600 mb-2">Remarks</h2>
                <p>{selectedReport.message.noteBook?.remarks || "N/A"}</p>
              </div>
            </div>
          )}

          <div className="text-center mt-6">
            <button
              onClick={closeModal}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition duration-200"
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default InfectionsDiseasesTable;
