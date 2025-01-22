import React, { useState } from 'react';

const WorkingAreaTable = () => {
  const data = [
    {
      district: "Matara",
      moh1: "Dewndara",
      headOfMoh: "W.H. Sarath Perera",
      phone: "041 3456789",
      workingAreas: [
        {
          area: "Gandara",
          phi: "W.H. Idunil Perera",
          contact: "071 3456789",
        },
        {
          area: "Weligama",
          phi: "K.A. Priyanka",
          contact: "071 9876543",
        },
      ],
    },
    {
      district: "Matara",
      moh1: "Akuressa",
      headOfMoh: "J.D. Anura Jayasinghe",
      phone: "041 1234567",
      workingAreas: [
        {
          area: "Kamburupitiya",
          phi: "B.R. Priyanthi",
          contact: "071 2345678",
        },
        {
          area: "Hakmana",
          phi: "M.L. Ruwanthi",
          contact: "071 8765432",
        },
      ],
    },
    {
      district: "Colombo",
      moh1: "Malabe",
      headOfMoh: "S.E. Ajith Bandara",
      phone: "041 3456789",
      workingAreas: [
        {
          area: "Gandara",
          phi: "W.H. Idunil Perera",
          contact: "071 3456789",
        },
        {
          area: "Kaduwela",
          phi: "A.C. Saman",
          contact: "072 3456789",
        },
      ],
    },
    // More data...
  ];

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedMoh, setSelectedMoh] = useState('');

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedMoh('');
  };

  const handleMohChange = (event) => {
    setSelectedMoh(event.target.value);
  };

  const filteredMoh = data.filter(item => item.district === selectedDistrict);
  const selectedData = filteredMoh.find(item => item.moh1 === selectedMoh);

  return (
    <div className="p-6">
      {/* District selection dropdown */}
      <div className="mb-6 text-center">
        <label className="block text-xl font-medium text-gray-700">Select District:</label>
        <select 
          value={selectedDistrict} 
          onChange={handleDistrictChange} 
          className="mt-2 p-3 border border-gray-300 rounded-xl shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">--Select District--</option>
          {[...new Set(data.map(item => item.district))].map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      {/* MOH selection dropdown */}
      {selectedDistrict && (
        <div className="mb-6 text-center">
          <label className="block text-xl font-medium text-gray-700">Select MOH Location:</label>
          <select 
            value={selectedMoh} 
            onChange={handleMohChange} 
            className="mt-2 p-3 border border-gray-300 rounded-xl shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select MOH--</option>
            {filteredMoh.map(item => (
              <option key={item.moh1} value={item.moh1}>{item.moh1}</option>
            ))}
          </select>
        </div>
      )}

      {/* Head of MOH Table */}
      {selectedData && (
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Head of MOH Details</h2>
          <table className="min-w-full mx-auto table-auto border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-lg font-semibold">District</th>
                <th className="px-6 py-4 text-left text-lg font-semibold">Head of MOH</th>
                <th className="px-6 py-4 text-left text-lg font-semibold">Phone</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-t">
                <td className="px-6 py-4">{selectedData.district}</td>
                <td className="px-6 py-4">{selectedData.headOfMoh}</td>
                <td className="px-6 py-4">{selectedData.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* PHI Details Table */}
      {selectedData && selectedData.workingAreas.length > 0 && (
        <div>
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">PHI Details</h2>
          <table className="min-w-full mx-auto table-auto border-collapse bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-lg font-semibold">Area</th>
                <th className="px-6 py-4 text-left text-lg font-semibold">PHI</th>
                <th className="px-6 py-4 text-left text-lg font-semibold">Contact</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {selectedData.workingAreas.map(area => (
                <tr key={area.area} className="border-t">
                  <td className="px-6 py-4">{area.area}</td>
                  <td className="px-6 py-4">{area.phi}</td>
                  <td className="px-6 py-4">{area.contact}</td>
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
