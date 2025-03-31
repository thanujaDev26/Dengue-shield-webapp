// H544Form.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import mohService from "../../../service/mohService.js";
import pateintService from "../../../service/pateintService.js";
import { useAuth } from "../../ProtectedRoutes/AuthContext.jsx";
import H544FormBody from "./H544FormBody.jsx";

const H544Form = () => {
  const AuthUser = useAuth();
  const mohId = AuthUser.user.role == "ROLE_MOH" ? AuthUser.user.id : null;
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    labResults: "",
    dateOfOnset: "",
    dateOfAdmission: "",
    institute: "",
    ward: "",
    bedNumber: "",
    nameOfNotifier: "",
    notifierStatus: "",
    diseaseName: "",
    mohOfficerId: null,
    patient: {},
  });
  const navigate = useNavigate();

  //validating errors
  const validateForm = (formData) => {
    // Define required fields with human-readable labels
    const requiredFields = {
      diseaseName: "Disease name",
      labResults: "Lab results",
      dateOfOnset: "Date of onset",
      dateOfAdmission: "Date of admission",
      institute: "Institute name",
      ward: "Ward",
      bedNumber: "Bed number",
      nameOfNotifier: "Name of notifier",
      notifierStatus: "Notifier status",
    };

    // Loop through each required field and validate
    for (const [key, label] of Object.entries(requiredFields)) {
      if (!formData[key] || formData[key].trim() === "") {
        toast.error(`${label} is required!`);
        return false;
      }
    }

    return true; // All validations passed
  };

  // Handle back button
  const handleBack = () => {
    navigate("/patient-search-page"); // Navigate back to the previous page
  };

  useEffect(() => {
    async function getOnePatient() {
      try {
        const response = await pateintService.getPatientById(patientId);
        const patientData = response.data;
        setFormData((prevData) => ({
          ...prevData,
          mohOfficerId: mohId,
          patient: patientData,
        }));
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }
    getOnePatient();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the form data and handle the onSubmit action
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;

    try {
      const response = await mohService.saveDiseaseNotification(formData);
      toast.success("H544 form  save successfully saved!");
      console.log(response);
      navigate(`/send-h544-form/${response.data.id}`);
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="justify-items-center">
        <div className="w-2/3 items-center p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
          <h2 className="text-2xl text-center font-bold mb-20">H544 Form</h2>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10 mr-10">
            <div>
              <label
                htmlFor="institute"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Institute
              </label>
              <input
                type="text"
                placeholder="Enter Hospital/Institute Name"
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
                value={formData.patient.name}
                readOnly
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
                value={formData.patient.guardianName || ""}
                readOnly
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
                value={formData.patient.address || ""}
                readOnly
              />
            </div>
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
                value={formData.patient.id || ""}
                readOnly
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
                type="Number"
                placeholder="Enter Patient Age"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="patientAge"
                name="patientAge"
                value={formData.patient.age || ""}
                readOnly
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
                type="Number"
                placeholder="Enter Patient Ward Number"
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
              <input
                type="text"
                id="gender"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                name="patientGender"
                value={formData.patient.gender || ""}
                placeholder="Patient Gender"
                readOnly
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
                placeholder="Enter Laboratory Results(If Available)"
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
                type="Number"
                placeholder="Enter Bed Head Ticket Number"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="bht"
                name="bedNumber"
                value={formData.bedNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="onsetDate"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Date of Onset (Infected Date)
              </label>
              <input
                type="date"
                placeholder="Enter Date of Onset"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="onsetDate"
                name="dateOfOnset"
                value={formData.dateOfOnset}
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
                placeholder="Enter Admitted Date"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="admissionDate"
                name="dateOfAdmission"
                value={formData.dateOfAdmission}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="notifier"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Notifier s Name
              </label>
              <input
                type="text"
                placeholder="Enter Name of the Notifier"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="notifier"
                name="nameOfNotifier"
                value={formData.nameOfNotifier}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="notifireStatus"
                className="block text-sm font-medium mt-2 text-gray-700"
              >
                Notifire s Status
              </label>
              <select
                id="notifireStatus"
                name="notifierStatus"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={formData.notifierStatus}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Notifire s Status
                </option>
                <option value="onDuty">On Duty</option>
                <option value="offDuty">Off Duty</option>
                <option value="onCall">On Call</option>
                <option value="leave">Leave</option>
                <option value="residentDoctor">Resident Doctor</option>
                <option value="consultant">Consultant</option>
                <option value="visitingConsultant">Visiting Consultant</option>
                <option value="intern">Intern</option>
                <option value="imo">IMO</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="telephone"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Telephone Number
              </label>
              <input
                type="tel"
                placeholder="Enter Sri Lankan Phone Number (e.g. 077XXXXXXX)"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="telephone"
                name="telephone"
                value={formData.patient.telephoneNumber}
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="diseaseName"
                className="block text-sm mt-2 font-medium text-gray-700"
              >
                Disease Name
              </label>
              <input
                type="text"
                placeholder="Enter Disease Name"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                id="diseaseName"
                name="diseaseName"
                value={formData.diseaseName}
                onChange={handleChange}
                required
              />
            </div>
          </div> */}
          <H544FormBody formData={formData} handleChange={handleChange} />
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
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default H544Form;
