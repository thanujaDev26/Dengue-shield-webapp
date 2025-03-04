import { useState } from "react";
import PropTypes from "prop-types";

const PatientSearchBar = ({ onSearch }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSearch = () => {
    onSearch({ name, age, address, mobileNumber });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col gap-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🔍 Search Patients
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Name</label>
          <input
            type="text"
            placeholder="Search by Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Age</label>
          <input
            type="number"
            placeholder="Search by Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Address</label>
          <input
            type="text"
            placeholder="Search by Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Mobile Number</label>
          <input
            type="text"
            placeholder="Search by Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none shadow-sm"
          />
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-200"
      >
        Search
      </button>
    </div>
  );
};

PatientSearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default PatientSearchBar;
