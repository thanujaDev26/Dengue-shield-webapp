import { useState } from "react";
import pateintService from "../../service/pateintService.js";
import toast from "react-hot-toast";
import { useAuth } from "../ProtectedRoutes/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const intialdata = {
  id: "",
  name: "",
  address: "",
  religion: "",
  race: "",
  telephoneNumber: "",
  occupation: "",
  gender: "Male",
  guardianName: "",
  age: "",
};

const PatientForm = () => {
  const navigate = useNavigate();
  const Authuser = useAuth();

  const role = Authuser?.user?.role || "ROLE_PHI"; // Default to PHI if role is not available
  console.log("Current User Role:", role);

  const [formData, setFormData] = useState(intialdata);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the field is "age" and sanitize it as an integer
    if (name === "age") {
      setFormData({ ...formData, [name]: value ? parseInt(value, 10) : "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Conditionally set religion, race, occupation to null for ROLE_MOH
    if (role === "ROLE_MOH") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        religion: null,
        race: null,
        occupation: null,
      }));
    }

    try {
      await pateintService.registerPatient(formData);
      toast.success("Patient registered successfully!");
      setFormData(intialdata);
    } catch (error) {
      console.error(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showH544Form = (id) => {
    if (id) {
      navigate(`/h544form/${id}`);
    } else {
      toast.error("Please enter a valid Patient ID first.");
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100 ">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {role == "ROLE_MOH" ? "Patient Registration" : "Update Patient"}
        </h2>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4"
          onSubmit={handleSave}
        >
          {[
            { name: "id", placeholder: "Patient ID" },
            { name: "name", placeholder: "Patient Name" },
            { name: "address", placeholder: "Address" },
            {
              name: "telephoneNumber",
              placeholder: "Telephone Number",
              type: "tel",
            },
            { name: "guardianName", placeholder: "Guardian Name" },
            { name: "age", placeholder: "Age", type: "number" },
          ].map(({ name, placeholder, type = "text" }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {placeholder}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${placeholder}`}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                required
              />
            </div>
          ))}

          {/* Only show these fields for non-MOH users */}
          {role !== "ROLE_MOH" && (
            <>
              <div>
                <label
                  htmlFor="religion"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Religion
                </label>
                <input
                  type="text"
                  name="religion"
                  id="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  placeholder="Enter Religion"
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="race"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Race
                </label>
                <input
                  type="text"
                  name="race"
                  id="race"
                  value={formData.race}
                  onChange={handleChange}
                  placeholder="Enter Race"
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  id="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Enter Occupation"
                  className="w-full p-2 mb-4 border border-gray-300 rounded"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </form>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-green-500 w-full sm:w-40 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            disabled={isLoading}
          >
            Back
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 w-full sm:w-40 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            disabled={isLoading}
          >
            Save
          </button>
          <button
            onClick={() => showH544Form(formData.id)}
            className="bg-blue-500 w-full sm:w-40 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Go to H544 Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
