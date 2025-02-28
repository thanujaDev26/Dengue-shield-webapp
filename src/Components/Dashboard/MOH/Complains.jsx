import { useState } from 'react';
import { Card, CardContent, Modal } from '@mui/material';

const ComplaintsPage = () => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showPHIForm, setShowPHIForm] = useState(false);
  const [expandedComplaint, setExpandedComplaint] = useState(null);

  // Sample data
  const complaints = [
    {
      id: 1,
      title: "Garbage Accumulation",
      sender: "John Doe",
      date: "2024-03-15",
      address: "123 Main Street, Colombo",
      image: "images/Dashboard_main.jpeg",
      description: "Large garbage pile accumulating near the park...",
      phiAreas: ["Colombo Central", "Colombo North", "Colombo South"]
    },
    // Add more complaints
  ];

  const ComplaintCard = ({ complaint }) => (
    <Card className="mb-4 shadow-lg rounded-3xl transition duration-1000 ease-in-out hover:bg-gray-300">
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {/* Left Section */}
          <div className="col-span-2">
            <h3 className="text-xl font-bold text-emerald-600 mb-2">
              {complaint.title}
            </h3>
            <div className="space-y-1 mb-4">
              <div className='flex w-full justify-between'>
                <p className="text-gray-600">
                    <span className="font-medium">From:</span> {complaint.sender}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Date:</span> {complaint.date}
                </p>
              </div>
              <p className="text-gray-600">
                <span className="font-medium">Address:</span> {complaint.address}
              </p>
            </div>

            {expandedComplaint === complaint.id && (
              <p className="text-gray-700 mb-4">{complaint.description}</p>
            )}

            <div className="flex flex-col gap-4 mt-4">
              <button
                onClick={() => setExpandedComplaint(
                  expandedComplaint === complaint.id ? null : complaint.id
                )}
                className="text-emerald-600 hover:text-emerald-700"
              >
                {expandedComplaint === complaint.id ? "See Less" : "See More"}
              </button>
              <div>
                <button
                    onClick={() => setShowPHIForm(true)}
                    className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
                >
                    Send to PHI
                </button>
                &nbsp;
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Delete
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center items-start">
            <img
              src={complaint.image}
              alt="Complaint evidence"
              className="w-48 h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PHIFormModal = () => (
    <Modal open={showPHIForm} onClose={() => setShowPHIForm(false)}>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-xl font-bold text-emerald-600 mb-4">
            Send to Public Health Inspector
          </h3>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PHI Area
              </label>
              <select
                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Select PHI Area</option>
                {complaints[0]?.phiAreas?.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remarks
              </label>
              <textarea
                className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500"
                rows="4"
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowPHIForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
              >
                Send Complaint
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="p-4">      
      <div className="space-y-4">
        {complaints.map(complaint => (
          <>
            <ComplaintCard key={complaint.id} complaint={complaint} />
            <ComplaintCard key={complaint.id} complaint={complaint} />
          </>
        ))}
      </div>

      <PHIFormModal />
    </div>
  );
};

export default ComplaintsPage;