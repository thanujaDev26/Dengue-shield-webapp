import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const PatientSearchPage = () => {
  // Sample patient data
  const initialPatients = [
    {
      name: 'John Doe',
      age: 35,
      address: '123 Main St, Colombo',
      telephone: '+94 77 123 4567'
    },
    {
      name: 'Jane Smith',
      age: 28,
      address: '456 Galle Road, Kollupitiya',
      telephone: '+94 76 234 5678'
    },
  ];

  // State management
  const [searchTerms, setSearchTerms] = useState({
    name: '',
    age: '',
    address: '',
    telephone: ''
  });

  const [patients, setPatients] = useState(initialPatients);

  // Search filter function
  const filteredPatients = patients.filter(patient => {
    const nameMatch = patient.name.toLowerCase().includes(searchTerms.name.toLowerCase());
    const ageMatch = patient.age.toString().includes(searchTerms.age);
    const addressMatch = patient.address.toLowerCase().includes(searchTerms.address.toLowerCase());
    const telephoneMatch = patient.telephone.replace(/\D/g, '').includes(searchTerms.telephone.replace(/\D/g, ''));

    return nameMatch && ageMatch && addressMatch && telephoneMatch;
  });

  // Handle search input changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Clear all search filters
  const clearFilters = () => {
    setSearchTerms({
      name: '',
      age: '',
      address: '',
      telephone: ''
    });
  };

  // Navigation
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Patient Management</h1>
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
          <button onClick={() => navigate('/h544form')} className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 flex items-center">
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Create New Patient
          </button>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Patient Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Age</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Address</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Telephone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map(patient => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{patient.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{patient.age}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{patient.address}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{patient.telephone}</td>
                <td className="px-6 py-4">
                  <button className="text-emerald-600 hover:text-emerald-700">
                    Select This Patient
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
      </div>
    </div>
  );
};

export default PatientSearchPage;