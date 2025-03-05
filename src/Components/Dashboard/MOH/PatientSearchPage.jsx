import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pateintService from "../../../service/pateintService.js";

import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const PatientSearchPage = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getAllPatients() {
      setLoading(true);
      try {
        const response = await pateintService.fetchAllPateints();
        //console.log(response.data);
        setPatients(response.data);
        // console.log(patients);
        // Initialize patients in the try block
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    }
    getAllPatients();
  }, []);

  console.log(patients);

  // State management
  const [searchTerms, setSearchTerms] = useState({
    name: "",
    age: "",
    address: "",
    telephone: "",
  });

  // Search filter function
  const filteredPatients = patients.filter((patient) => {
    const nameMatch = patient.name
      .toLowerCase()
      .includes(searchTerms.name.toLowerCase());
    const ageMatch = patient.age.toString().includes(searchTerms.age);
    const addressMatch = patient.address
      .toLowerCase()
      .includes(searchTerms.address.toLowerCase());
    const telephoneMatch = patient.telephoneNumber
      .replace(/\D/g, "")
      .includes(searchTerms.telephone.replace(/\D/g, ""));

    return nameMatch && ageMatch && addressMatch && telephoneMatch;
  });

  // Handle search input changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Clear all search filters
  const clearFilters = () => {
    setSearchTerms({
      name: "",
      age: "",
      address: "",
      telephone: "",
    });
  };

  // Navigation
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Patient Management
        </h1>
        <div className="border-b-2 border-emerald-500 w-20"></div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Search by Name"
            className="p-2 border rounded focus:ring-2 focus:ring-emerald-500"
            value={searchTerms.name}
            onChange={handleSearchChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Search by Age"
            className="p-2 border rounded focus:ring-2 focus:ring-emerald-500"
            value={searchTerms.age}
            onChange={handleSearchChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Search by Address"
            className="p-2 border rounded focus:ring-2 focus:ring-emerald-500"
            value={searchTerms.address}
            onChange={handleSearchChange}
          />
          <input
            type="tel"
            name="telephone"
            placeholder="Search by Telephone"
            className="p-2 border rounded focus:ring-2 focus:ring-emerald-500"
            value={searchTerms.telephone}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button
              className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 flex items-center"
              onClick={clearFilters}
            >
              <XMarkIcon className="h-5 w-5 mr-2" />
              Clear Filters
            </button>
          </div>
          <button
            onClick={() => navigate("/h544form")}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 flex items-center"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Create New Patient
          </button>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        {/* Loading Spinner */}
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">
            Loading patients...
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Telephone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {patient.age}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {patient.address}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {patient.telephoneNumber}
                    </td>
                    <td className="px-6 py-4">
                      <button className="mx-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">
                        Update Patient
                      </button>

                      <button
                        className="px-4 py-2 text-emerald-600 border border-emerald-600 rounded-md shadow 
                        hover:bg-emerald-600 hover:text-white transition"
                      >
                        Go to H544 Form
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPatients.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No patients found matching your search criteria
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PatientSearchPage;
