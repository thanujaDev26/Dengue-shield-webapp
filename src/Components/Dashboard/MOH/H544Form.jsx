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
