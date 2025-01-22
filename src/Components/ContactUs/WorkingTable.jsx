import React, { useState } from "react";

const WorkingAreaTable = () => {
  const data = [
   
    {
      district: "Matara",
      moh1: "Akuressa",
      headOfMoh: "J.D. Anura Jayasinghe",
      phone: "041 1234567",
      workingAreas: [
        { area: "Kamburupitiya", phi: "B.R. Priyanthi", contact: "071 2345678" },
        { area: "Hakmana", phi: "M.L. Ruwanthi", contact: "071 8765432" },
      ],
    },
    {
      district: "Kaluthara",
      moh1: "Pasgoda",
      headOfMoh: "J.D. Anura Jayasinghe",
      phone: "041 1234567",
      workingAreas: [
        { area: "Mathugama", phi: "B.R. Priyanthi", contact: "071 2345678" },
        { area: "Panadura", phi: "M.L. Ruwanthi", contact: "071 8765432" },
      ],
    },
    {
      district: "Mathale",
      moh1: "Dabhulla",
      headOfMoh: "J.D. Anura Jayasinghe",
      phone: "041 1234567",
      workingAreas: [
        { area: "Galewela", phi: "B.R. Priyanthi", contact: "071 2345678" },
        { area: "Hakmana", phi: "M.L. Ruwanthi", contact: "071 8765432" },
      ],
    },
    {
      district: "Colombo",
      moh1: "Malabe",
      headOfMoh: "S.E. Ajith Bandara",
      phone: "041 3456789",
      workingAreas: [
        { area: "Gandara", phi: "W.H. Idunil Perera", contact: "071 3456789" },
        { area: "Kaduwela", phi: "A.C. Saman", contact: "072 3456789" },
      ],
    },
    
    // More districts and MOH locations can be added here...
  ];

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMohLocation, setSelectedMohLocation] = useState("");
  const [mohLocations, setMohLocations] = useState([]);
  const [selectedMohData, setSelectedMohData] = useState(null);

  // Filter unique districts
  const uniqueDistricts = Array.from(new Set(data.map((item) => item.district)));

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    const selectedDistrictData = data.filter((item) => item.district === district);
    if (selectedDistrictData) {
      setMohLocations(selectedDistrictData);
    }
    setSelectedMohLocation(""); // Reset MOH location when district changes
    setSelectedMohData(null); // Reset MOH data
  };

  const handleMohLocationChange = (e) => {
    const mohLocation = e.target.value;
    setSelectedMohLocation(mohLocation);
    const selectedMohData = mohLocations.find((item) => item.moh1 === mohLocation);
    setSelectedMohData(selectedMohData); // Set the selected MOH location data
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Working Area Table</h2>

      <div className="flex justify-center space-x-6 mb-6">
        <div>
          <label className="block text-sm font-medium">Select District:</label>
          <select
            onChange={handleDistrictChange}
            value={selectedDistrict}
            className="mt-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Select District</option>
            {uniqueDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {selectedDistrict && (
          <div>
            <label className="block text-sm font-medium">Select MOH Location:</label>
            <select
              onChange={handleMohLocationChange}
              value={selectedMohLocation}
              className="mt-2 p-2 border border-gray-300 rounded"
            >
              <option value="">Select MOH Location</option>
              {mohLocations.map((location, index) => (
                <option key={index} value={location.moh1}>
                  {location.moh1}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedDistrict && selectedMohLocation && selectedMohData && (
        <div className="mb-6 text-center justify-items-center ">
          <h3 className="text-xl font-semibold">MOH Head Details:</h3>
          <table className="md:w-5/6 w-full table-auto  border-separate border border-gray-300 rounded-lg shadow-lg mb-6">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="p-3 text-center border border-gray-300">District</th>
                <th className="p-3 text-center border border-gray-300">MOH Location</th>
                <th className="p-3 text-center border border-gray-300">Head of MOH</th>
                <th className="p-3 ext-center border border-gray-300">Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border text-center border-gray-300">{selectedDistrict}</td>
                <td className="p-3 border text-center border-gray-300">{selectedMohData.moh1}</td>
                <td className="p-3 border text-center border-gray-300">{selectedMohData.headOfMoh}</td>
                <td className="p-3 border text-center border-gray-400">{selectedMohData.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedDistrict && selectedMohLocation && selectedMohData && selectedMohData.workingAreas && (
        <div className="mb-6 text-center justify-items-center">
          <h3 className="text-xl font-semibold mb-4">PHI Details:</h3>
          <table className="md:w-5/6 w-full table-auto border-separate border  border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-teal-600 text-white">
              <tr> 
                <th className="p-3 text-center border border-gray-400">Area</th>
                <th className="p-3 text-center border border-gray-400">PHI Name</th>
                <th className="p-3 text-center  border border-gray-400">Contact</th>
              </tr>
            </thead>
            <tbody>
              {selectedMohData.workingAreas.map((area, index) => (
                <tr key={index}>
                  <td className="p-3  border border-gray-400">{area.area}</td>
                  <td className="p-3  border border-gray-400">{area.phi}</td>
                  <td className="p-3  border border-gray-400" >{area.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WorkingAreaTable;
