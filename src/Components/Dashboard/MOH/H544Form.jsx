// H544Form.js
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveDiseaseNotification } from "../../../service/mohService";

const H544Form = () => {
  const [formData, setFormData] = useState({
    institute: "",
    patientName: "",
    guardianName: "",
    address: "",
    labResults: "",
    bht: "",
    onsetDate: "",
    admissionDate: "",
    patientId: "",
    patientAge: "",
    ward: "",
    gender: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Handle back button
  const handleBack = () => {
    navigate("/dashboard"); // Navigate back to the previous page
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the form data and handle the onSubmit action
  const handleSubmit = async () => {
    try {
      const notificationData = {
        guardianName: formData.guardianName,
        name: formData.patientName,
        labResults: formData.labResults,
        dateOfOnset: formData.onsetDate, // Ensure format is correct
        dateOfAdmission: formData.admissionDate, // Ensure format is correct
        institute: formData.institute,
        ward: formData.ward,
        bedNumber: formData.bht,
        medicalOfficer: "", // Make sure this field exists in DTO
        patient: {
          nic: formData.patientId, // Ensure key matches DTO (was patientId, should be nic)
          name: formData.patientName,
          address: formData.address,
          notifierStatus: formData.notifierStatus || "Unknown", // Provide default if needed
          religion: formData.religion || null, // Handle optional fields
          race: formData.race || null,
          telephoneNumber: formData.telephone || null,
          occupation: formData.occupation || null,
          gender: formData.gender,
          nameOfNotifier: formData.nameOfNotifier || "Unknown",
          // Ensure correct date format
        },
      };

      const response = await saveDiseaseNotification(notificationData);
      console.log(response);
      navigate("/pending-table");
    } catch (error) {
      alert(error);
    }
    // if (formData.patientId) {
    //    // Pass the form data to the parent
    //   navigate("/pending-table"); // Navigate back to the pending table page
    // } else {
    //   alert("Please fill in the patient ID.");
    // }
  };

  return (
    <div>
      <div className="justify-items-center">
        <div className="w-2/3 items-center p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
          <h2 className="text-2xl text-center font-bold mb-20">H544 Form</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10 mr-10">
            <div>
              <label
                htmlFor="institute"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Institute
              </label>
              <input
                type="text"
                placeholder="Enter Institute"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="institute"
                name="institute"
                value={formData.institute}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="patientName"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Patient Name
              </label>
              <input
                type="text"
                placeholder="Enter Patient Name"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="guardianName"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Pediatric Patient - Name of Guardian
              </label>
              <input
                type="text"
                placeholder="Enter Name of Guardian"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="guardianName"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Patient Address
              </label>
              <input
                type="text"
                placeholder="Enter Patient Address"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="labResults"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Laboratory Results
              </label>
              <input
                type="text"
                placeholder="Enter Laboratory Results"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="labResults"
                name="labResults"
                value={formData.labResults}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="bht"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                B.H.T.No
              </label>
              <input
                type="text"
                placeholder="Enter B.H.T.No"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="bht"
                name="bht"
                value={formData.bht}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="onsetDate"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Date of Onset
              </label>
              <input
                type="date"
                placeholder="Enter Date of Onset"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="onsetDate"
                name="onsetDate"
                value={formData.onsetDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="admissionDate"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Date of Admission
              </label>
              <input
                type="date"
                placeholder="Enter Date of Admission"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="admissionDate"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10 mr-10">
            <div>
              <label
                htmlFor="patientId"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Patient ID
              </label>
              <input
                type="text"
                placeholder="Enter Patient ID"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="patientAge"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Patient Age
              </label>
              <input
                type="text"
                placeholder="Enter Patient Age"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="patientAge"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="ward"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Patient Ward
              </label>
              <input
                type="text"
                placeholder="Enter Patient Ward"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="ward"
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium mt-2 text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ml-10 mr-10">
            <button
              onClick={handleBack}
              className="bg-green-500 w-40 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 w-40  text-white px-4 mt-5 py-2 rounded-lg hover:bg-green-600"
            >
              {location.state && location.state.patient ? "Update " : "Submit "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default H544Form;
