import PropTypes from "prop-types";

export default function H544FormBody({ formData, handleChange }) {
  return (
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
          Notifier's Name
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
          Notifire's Status
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
            Select Notifire's Status
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
    </div>
  );
}

H544FormBody.propTypes = {
  formData: PropTypes.shape({
    institute: PropTypes.string.isRequired,
    patient: PropTypes.shape({
      name: PropTypes.string.isRequired,
      guardianName: PropTypes.string,
      address: PropTypes.string,
      id: PropTypes.string,
      age: PropTypes.number,
      gender: PropTypes.string,
      telephoneNumber: PropTypes.string,
    }).isRequired,
    ward: PropTypes.number.isRequired,
    labResults: PropTypes.string.isRequired,
    bedNumber: PropTypes.number.isRequired,
    dateOfOnset: PropTypes.string.isRequired,
    dateOfAdmission: PropTypes.string.isRequired,
    nameOfNotifier: PropTypes.string.isRequired,
    notifierStatus: PropTypes.string.isRequired,
    diseaseName: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};
