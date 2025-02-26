import { useState } from 'react';

// Sample data for demonstration
const sampleData = [
    {
      id: 1,
      date: '2024-03-01', // Main date outside formData
      patientName: 'John Doe',
      formData: {
        fromWhom: 'Public Health Dept',
        subject: 'Dengue Case Report',
        dateOfAnswer: '2024-03-02',
        remarks: 'Urgent attention required'
      }
    },
  ];

// Add this helper component
const DetailItem = ({ label, value, icon, fullWidth = false }) => (
    <div className={`${fullWidth ? 'col-span-2' : ''}`}>
      <div className="flex items-start gap-3">
        <div className="bg-emerald-100 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-gray-800 font-medium break-words">
            {value || <span className="text-gray-400">-</span>}
          </p>
        </div>
      </div>
    </div>
  );

export default function InwardTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedFormData, setSelectedFormData] = useState(null);
  const [data, setData] = useState(sampleData);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement actual search/filter logic here
    const filtered = sampleData.filter(item => item.date === selectedDate);
    setData(filtered);
  };

  const openModal = (item) => {
    setSelectedFormData({
        ...item.formData,
        mainDate: item.date,
    });
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="w-full p-6 rounded mt-8 flex justify-center gap-4">
        <input 
          type="date" 
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-1/2 p-2 border-2 border-gray-200 rounded" 
        /> 
        <button 
          type="submit"
          className="bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600"
        >
          Search
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 border-b text-left">H544 ID</th>
              <th className="px-4 py-3 border-b text-left">Date</th>
              <th className="px-4 py-3 border-b text-left">Patient Name</th>
              <th className="px-4 py-3 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b text-left">{item.id}</td>
                <td className="px-4 py-3 border-b text-left">{item.date}</td>
                <td className="px-4 py-3 border-b text-left">{item.patientName}</td>
                <td className="px-4 py-3 border-b text-left">
                  <button 
                    onClick={() => openModal(item)}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition-colors"
                  >
                    View Form
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {isOpen && (
            <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            >
                <div
                className="bg-white p-6 rounded-xl shadow-2xl w-[95%] max-w-2xl"
                onClick={(e) => e.stopPropagation()}
                >
                {/* Modal Header */}
                <div className="border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-emerald-600 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Document's Inward Register
                    </h2>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                    <DetailItem 
                        label="Date" 
                        value={selectedFormData?.mainDate}
                        icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                    <DetailItem 
                        label="From Whom" 
                        value={selectedFormData?.fromWhom} 
                        icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                    <DetailItem 
                        label="Subject" 
                        value={selectedFormData?.subject} 
                        icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                    </div>

                    <div className="space-y-3">
                    <DetailItem 
                        label="Date of Answer" 
                        value={selectedFormData?.dateOfAnswer} 
                        icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                    <DetailItem 
                        label="Remarks" 
                        value={selectedFormData?.remarks} 
                        icon="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        fullWidth
                    />
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t pt-4 flex justify-end">
                    <button
                    onClick={() => setIsOpen(false)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Close
                    </button>
                </div>
                </div>
            </div>
        )}

    </div>
  );
}