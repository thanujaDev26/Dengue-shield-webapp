import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import pateintService from "../../../service/pateintService.js";
import toast from "react-hot-toast";

const Patient = ({ patientData, closeModal, updatePatientInTable }) => {
  const [tempFormData, setTempFormData] = useState(patientData || {});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(patientData || {});

  useEffect(() => {
    if (patientData) {
      setFormData(patientData);
      setTempFormData(patientData);
    }
  }, [patientData]);

  const resetToDefault = () => {
    setFormData(tempFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    console.log("Updated details:", formData);
    setIsLoading(true); // Start loading
    try {
      const response = await pateintService.updatePatient(
        formData.id,
        formData
      );
      console.log("Response from backend:", response);
      toast.success("Patient details updated successfully!");
      updatePatientInTable(formData);
      closeModal();
    } catch (error) {
      console.error("Error updating patient details:", error);
      toast.error("Failed to update patient details. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-4xl mx-4 md:mx-auto overflow-y-auto max-h-[90vh]">
        {/* Close Button (X) */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Patient Details
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="mb-1 font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                name={key}
                disabled={key == "id" ? true : false}
                value={formData[key]}
                onChange={handleChange}
                className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${key
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}`}
              />
            </div>
          ))}

          <div className="flex justify-center gap-4 mt-6 col-span-2">
            <button
              onClick={resetToDefault}
              type="button"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Reset
            </button>
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              type="button"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {isLoading ? "Updating..." : "Update Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PropTypes for type checking
Patient.propTypes = {
  patientData: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  updatePatientInTable: PropTypes.func.isRequired,
};

export default Patient;
