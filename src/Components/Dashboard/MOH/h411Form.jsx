import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import phiService from "../../../service/phiService";
import toast from "react-hot-toast";

export default function H411Form() {
  const [phiData, setPhiData] = useState({
    phiReferenceNo: "",
    mohNotificationNo: "",
    phiRegisterNo: "",
    phiRange: "",
    mohArea: "",
    diseaseAsNotified: "",
    diseaseAsNotifiedDate: "",
    diseaseConfirm: "",
    diseaseConfirmDate: "",
    nameOfPatient: "",
    address: "",
    age: "",
    sex: "",
    ethnicGroup: "",
    dateOfOnset: "",
    dateOfHospitalization: "",
    dateOfDischarge: "",
    nameOfHospital: "",
    outcome: "",
    natureOfCase: "",
    laboratoryFindings: "",
    familyMembers: [""],
  });

  const { messageId } = useParams();
  const navigate = useNavigate();

  const handlePhiChange = (e) => {
    const { name, value } = e.target;
    setPhiData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFamilyMemberChange = (index, value) => {
    const updatedMembers = [...phiData.familyMembers];
    updatedMembers[index] = value;
    setPhiData((prevData) => ({
      ...prevData,
      familyMembers: updatedMembers,
    }));
  };

  const addFamilyMember = () => {
    setPhiData((prevData) => ({
      ...prevData,
      familyMembers: [...prevData.familyMembers, ""],
    }));
  };

  const removeFamilyMember = (index) => {
    const updatedMembers = [...phiData.familyMembers];
    updatedMembers.splice(index, 1);
    setPhiData((prevData) => ({
      ...prevData,
      familyMembers: updatedMembers,
    }));
  };

  const handleSubmit = async () => {
    // Get only the editable fields to check if they're filled
    const editableFields = {
      diseaseAsNotifiedDate: phiData.diseaseAsNotifiedDate,
      diseaseConfirmDate: phiData.diseaseConfirmDate,
      dateOfDischarge: phiData.dateOfDischarge,
      natureOfCase: phiData.natureOfCase,
      laboratoryFindings: phiData.laboratoryFindings,
      outcome: phiData.outcome,
    };

    if (Object.values(editableFields).some((val) => val === "")) {
      toast.error("Please fill out all  fields.");
      return;
    }

    try {
      // Save only the fields that are not disabled
      const dataToSubmit = {
        diseaseAsNotifiedDate: phiData.diseaseAsNotifiedDate,
        diseaseConfirmDate: phiData.diseaseConfirmDate,
        dateOfDischarge: phiData.dateOfDischarge,
        natureOfCase: phiData.natureOfCase,
        laboratoryFindings: phiData.laboratoryFindings,
        outcome: phiData.outcome,
        familyMembers: phiData.familyMembers.filter(
          (member) => member.trim() !== ""
        ),
      };

      // Call your API to save the data
      await phiService.saveExtendedFormData(messageId, dataToSubmit);
      toast.success("Form data saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving form data:", error);
      toast.error("Failed to save form data. Please try again.");
    }
  };

  useEffect(() => {
    async function getMessage() {
      try {
        const response = await phiService.getMessagebyId(messageId);
        if (response.data) {
          setPhiData({
            phiReferenceNo: response?.data?.phiOfficer.appuser.name || "",
            mohNotificationNo: response?.data?.mohOfficer.appuser.name || "",
            phiRegisterNo: response?.data?.phiOfficer.id || 0,
            phiRange: response.data.phiOfficer.area,
            mohArea: response.data.mohOfficer.branch,
            diseaseAsNotified: response.data.h544.diseaseName,
            diseaseAsNotifiedDate: "",
            diseaseConfirm: response.data.h544.diseaseName,
            diseaseConfirmDate: "",
            nameOfPatient: response.data.h544.patient.name,
            address: response.data.h544.patient.address,
            age: response.data.h544.patient.age,
            sex: response.data.h544.patient.gender,
            ethnicGroup: response.data.h544.patient.race,
            dateOfOnset: response.data.h544.dateOfOnset,
            dateOfHospitalization: response.data.h544.dateOfAdmission,
            dateOfDischarge: "",
            nameOfHospital: response.data.h544.institute,
            outcome: "",
            natureOfCase: "",
            laboratoryFindings: "",
            familyMembers: [""],
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMessage();
  }, [messageId]);

  return (
    <form className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Extended P.H.I Form for Patient
        </h2>
        <p className="text-gray-500 mt-2">
          Please review the pre-filled data and submit.
        </p>
      </div>

      {/* PHI & MOH Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
          PHI & MOH Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { id: "phiReferenceNo", label: "P.H.I Name", disabled: true },
            { id: "mohNotificationNo", label: "M.O.H. Name", disabled: true },
            {
              id: "phiRegisterNo",
              label: "P.H.I. Register No",
              disabled: false,
            },
            { id: "phiRange", label: "P.H.I. Range", disabled: true },
            { id: "mohArea", label: "M.O.H. Area", disabled: true },
            {
              id: "diseaseAsNotified",
              label: "Disease as Notified",
              disabled: true,
            },
            {
              id: "diseaseAsNotifiedDate",
              label: "Date of Disease Notified",
              type: "date",
              disabled: false,
            },
            {
              id: "diseaseConfirm",
              label: "Disease Confirmed",
              disabled: true,
            },
            {
              id: "diseaseConfirmDate",
              label: "Date of Disease Confirmation",
              type: "date",
              disabled: false,
            },
          ].map(({ id, label, type = "text", disabled }) => (
            <div key={id}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={phiData[id]}
                onChange={handlePhiChange}
                disabled={disabled}
                className="w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Patient Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
          Patient Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { id: "nameOfPatient", label: "Name of Patient", disabled: true },
            { id: "address", label: "Address", disabled: true },
            { id: "age", label: "Age", type: "number", disabled: true },
            { id: "sex", label: "Sex", disabled: true },
            { id: "ethnicGroup", label: "Ethnic Group", disabled: true },
            {
              id: "dateOfOnset",
              label: "Date of Onset",
              type: "date",
              disabled: true,
            },
            {
              id: "dateOfHospitalization",
              label: "Date of Hospitalization",
              type: "date",
              disabled: true,
            },
            {
              id: "dateOfDischarge",
              label: "Date of Discharge",
              type: "date",
              disabled: false,
            },
            { id: "nameOfHospital", label: "Name of Hospital", disabled: true },
            { id: "outcome", label: "Outcome", disabled: false },
            { id: "natureOfCase", label: "Nature of Case", disabled: false },
            {
              id: "laboratoryFindings",
              label: "Laboratory Findings",
              disabled: false,
            },
          ].map(({ id, label, type = "text", disabled }) => (
            <div key={id} className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={phiData[id]}
                onChange={handlePhiChange}
                disabled={disabled}
                className="w-full p-3 mt-1 border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Family Members */}
      <div className="col-span-full">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Family Members
        </label>
        <div className="space-y-3">
          {phiData.familyMembers.map((member, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder={`Family Member ${index + 1}`}
                value={member}
                onChange={(e) =>
                  handleFamilyMemberChange(index, e.target.value)
                }
                className="flex-1 p-3 border border-gray-300 rounded"
              />
              {phiData.familyMembers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFamilyMember(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addFamilyMember}
          className="mt-3 bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
        >
          + Add Family Member
        </button>
      </div>

      {/* Submit Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
