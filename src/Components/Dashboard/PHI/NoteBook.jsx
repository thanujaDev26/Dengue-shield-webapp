import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import phiService from "../../../service/phiService";
import toast from "react-hot-toast";
import { useAuth } from "../../ProtectedRoutes/AuthContext";

const Notebook = () => {
  const AuthUser = useAuth();
  const phiId = AuthUser.user.role == "ROLE_PHI" ? AuthUser.user.id : null;
  const navigate = useNavigate();
  const { messageId } = useParams();
  console.log(messageId);
  const intialState = {
    messageId: messageId,
    h544Id: 0,
    patient: {},
    distance: "",
    subject: "",
    condition: "",
    isolation: "",
    termination: "",
    remarks: "",
  };
  const [formData, setFormData] = useState(intialState);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (formData) => {
    const requiredFields = [
      "h544Id",
      "distance",
      "subject",
      "condition",
      "isolation",
      "termination",
      "remarks",
    ];

    const patientRequiredFields = ["occupation", "religion", "race"];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        toast.error(`${field} is required!`);
        return false;
      }
    }

    for (const field of patientRequiredFields) {
      if (
        !formData.patient[field] ||
        formData.patient[field].toString().trim() === ""
      ) {
        toast.error(`${field} is required!`);
        return false;
      }
    }

    return true;
  };

  // Pre-filling the form data with location.state if available
  useEffect(() => {
    async function getMessage() {
      try {
        const response = await phiService.getMessagebyId(messageId);

        if (response.data) {
          setFormData((prevData) => ({
            ...prevData,
            h544Id: response.data.h544?.id || 0,
            patient: response.data.h544?.patient || {},
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMessage();
  }, [messageId]);

  // Handle form field changes (but since it's read-only, we may not need this)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name in prevData.patient) {
        return {
          ...prevData,
          patient: {
            ...prevData.patient,
            [name]: value,
          },
        };
      }
      return { ...prevData, [name]: value };
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!validateForm(formData)) return;
    try {
      await phiService.saveNote(phiId, formData);
      toast.success("You have successfully saved the note");
      setFormData(intialState);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while saving the note");
    }
  };
  const handleContinue = () => {
    navigate(`/h411-form/${messageId}`); // Navigate to Notebook with patientId
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleInfectedMemberChange = (index, value) => {
    const updated = [...formData.infectedMembers];
    updated[index] = value;
    setFormData({ ...formData, infectedMembers: updated });
  };

  const addInfectedMember = () => {
    setFormData({
      ...formData,
      infectedMembers: [...formData.infectedMembers, ""],
    });
  };

  const removeInfectedMember = (index) => {
    const updated = formData.infectedMembers.filter((_, i) => i !== index);
    setFormData({ ...formData, infectedMembers: updated });
  };

  return (
    <div className="justify-items-center">
      <div className="w-2/3 items-center p-6 bg-white rounded-lg shadow-md mt-6 mb-10">
        <h2 className="text-2xl text-center font-bold mb-20">
          Notebook for Patient {formData.patient.id}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10 mr-10">
          <div>
            <label
              htmlFor="patientId"
              className="block text-sm font-medium text-gray-700"
            >
              Patient ID
            </label>
            <input
              type="text"
              id="patientId"
              value={formData.patient.id || ""}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="h544Id"
              className="block text-sm font-medium text-gray-700"
            >
              H544 ID
            </label>
            <input
              type="text"
              id="h544Id"
              value={formData.h544Id}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="patientName"
              className="block text-sm font-medium text-gray-700"
            >
              Patient Name
            </label>
            <input
              type="text"
              id="patientName"
              value={formData.patient.name || ""}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="patientAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Patient Address
            </label>
            <input
              type="text"
              id="patientAddress"
              value={formData.patient.address || ""}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <input
              type="text"
              id="gender"
              value={formData.patient.gender || ""}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="text"
              id="age"
              value={formData.patient.age || ""}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="distance"
              className="block text-sm font-medium text-gray-700"
            >
              Distance(km)
            </label>
            <input
              type="number"
              id="distance"
              name="distance"
              placeholder="Distance from PHI Office to Pations House"
              value={formData.distance}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <select
              id="subject"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={handleChange}
              name="subject"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
              <option value="Cholera">Cholera</option>
              <option value="Plague">Plague</option>
              <option value="Yellow Fever">Yellow Fever</option>
              <option value="Acute Poliomyelitis / Acute Flaccid Paralysis">
                Acute Poliomyelitis / Acute Flaccid Paralysis
              </option>
              <option value="Chickenpox">Chickenpox</option>
              <option value="Dengue Fever / Dengue Haemorrhagic Fever">
                Dengue Fever / Dengue Haemorrhagic Fever
              </option>
              <option value="Diphtheria">Diphtheria</option>
              <option value="Dysentery">Dysentery</option>
              <option value="Encephalitis">Encephalitis</option>
              <option value="Enteric Fever (Typhoid & Paratyphoid Fever)">
                Enteric Fever (Typhoid & Paratyphoid Fever)
              </option>
              <option value="Food Poisoning">Food Poisoning</option>
              <option value="Human Rabies">Human Rabies</option>
              <option value="Leptospirosis">Leptospirosis</option>
              <option value="Malaria">Malaria</option>
              <option value="Measles">Measles</option>
              <option value="Meningitis">Meningitis</option>
              <option value="Mumps">Mumps</option>
              <option value="Rubella / Congenital Rubella Syndrome">
                Rubella / Congenital Rubella Syndrome
              </option>
              <option value="Simple Continued Fever of Over 7 Days or More">
                Simple Continued Fever of Over 7 Days or More
              </option>
              <option value="Tetanus">Tetanus</option>
              <option value="Neonatal Tetanus">Neonatal Tetanus</option>
              <option value="Typhus Fever">Typhus Fever</option>
              <option value="Viral Hepatitis">Viral Hepatitis</option>
              <option value="Whooping Cough (Pertussis)">
                Whooping Cough (Pertussis)
              </option>
              <option value="Tuberculosis">Tuberculosis</option>
              <option value="Leishmaniasis">Leishmaniasis</option>
              <option value="Leprosy">Leprosy</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="occupation"
              className="block text-sm font-medium text-gray-700"
            >
              Occupation
            </label>
            <select
              id="occupation"
              name="occupation"
              value={formData.patient.occupation || ""}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Select the Occupation
              </option>
              <option value="Farmer">Farmer</option>
              <option value="Teacher">Teacher</option>
              <option value="Doctor">Doctor</option>
              <option value="Engineer">Engineer</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Nurse">Nurse</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Accountant">Accountant</option>
              <option value="Construction Worker">Construction Worker</option>
              <option value="Fisherman">Fisherman</option>
              <option value="Police Officer">Police Officer</option>
              <option value="Soldier">Soldier</option>
              <option value="Driver">Driver</option>
              <option value="Chef">Chef</option>
              <option value="Electrician">Electrician</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Banker">Banker</option>
              <option value="Carpenter">Carpenter</option>
              <option value="Shopkeeper">Shopkeeper</option>
              <option value="Artist">Artist</option>
              <option value="Journalist">Journalist</option>
              <option value="Fashion Designer">Fashion Designer</option>
              <option value="Athlete">Athlete</option>
              <option value="Scientist">Scientist</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="distance"
              className="block text-sm font-medium text-gray-700"
            >
              Race
            </label>
            <select
              id="race"
              name="race"
              placeholder="Select the Race"
              value={formData.patient.race}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
              <option value="" disabled selected>
                Select the Race
              </option>
              <option value="Sinhalese">Sinhalese</option>
              <option value="Sri Lankan Tamils">Sri Lankan Tamils</option>
              <option value="Indian Tamils">Indian Tamils</option>
              <option value="Sri Lankan Moors">Sri Lankan Moors</option>
              <option value="Burghers">Burghers</option>
              <option value="Malays">Malays</option>
              <option value="Vedda">Vedda</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="religion"
              className="block text-sm font-medium text-gray-700"
            >
              Religion
            </label>
            <select
              id="religion"
              name="religion"
              value={formData.patient.religion}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
              <option value="" disabled selected>
                Select Your Religion
              </option>
              <option value="Buddhism">Buddhism</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Islam">Islam</option>
              <option value="Christianity">Christianity</option>
              <option value="Roman Catholicism">Roman Catholicism</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="houseCondition"
              className="block text-sm font-medium text-gray-700"
            >
              Nature of Condition
            </label>
            <select
              id="houseCondition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
              <option value="" disabled selected>
                Select the House Condition
              </option>
              <option value="Well-maintained">Well-maintained</option>
              <option value="Moderate">Moderate</option>
              <option value="Poorly Maintained">Poorly Maintained</option>
              <option value="Temporary Shelter">Temporary Shelter</option>
              <option value="Overcrowded">Overcrowded</option>
              <option value="Unsanitary">Unsanitary</option>
              <option value="Flood-prone Area">Flood-prone Area</option>
              <option value="Mosquito Breeding Risk">
                Mosquito Breeding Risk
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="isolation"
              className="block text-sm font-medium text-gray-700"
            >
              Isolation
            </label>
            <select
              id="isolation"
              name="isolation"
              value={formData.isolation}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
              <option value="" disabled selected>
                Select Isolation Type
              </option>
              <option value="Home">Home</option>
              <option value="Hospital">Hospital</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="termination"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Termination
            </label>
            <select
              id="termination"
              name="termination"
              value={formData.termination}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            >
              <option value="" disabled selected>
                Select Termination Type
              </option>
              <option value="Death">Death</option>
              <option value="Recovery">Recovery</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="distance"
              className="block text-sm font-medium text-gray-700"
            >
              Remarks
            </label>
            <textarea
              id="remarks"
              name="remarks"
              placeholder="Any Notes(If Any)"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-10 mr-10">
          <button
            disabled={isLoading}
            onClick={handleBack}
            className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Back
          </button>
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
          <button
            disabled={isLoading}
            onClick={handleContinue}
            className="bg-green-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notebook;
