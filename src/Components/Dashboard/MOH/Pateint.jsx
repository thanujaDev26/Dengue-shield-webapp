import { useState } from "react";

export default function Patient() {
  const [formData, setFormData] = useState({
    name: "kamal",
    guardianName: "A.nimal",
    address: "No 500/B, galle road",
    id: "DEN121",
    age: 28,
    gender: "male",
    occupation: "Worker",
    race: "Sinhala",
    religion: "Christianiaty",
    telephoneNumber: "0767174567",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    console.log("Updated Data:", formData);
    alert("Details updated successfully!");
  };

  const handleCancel = () => {
    console.log("Update cancelled");
    alert("Update cancelled");
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Update Patient Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Update Details
          </button>
        </div>
      </div>
    </div>
  );
}
