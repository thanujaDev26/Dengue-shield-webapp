import { useEffect, useState } from "react";
import phiService from "../../../service/phiService";
import { useAuth } from "../../ProtectedRoutes/AuthContext";

const DetailItem = ({ label, value, icon, fullWidth = false }) => (
  <div className={`${fullWidth ? "col-span-2" : ""}`}>
    <div className="flex items-start gap-3">
      <div className="bg-emerald-100 p-2 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={icon}
          />
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
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFormData, setSelectedFormData] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await phiService.getCompleteMessageList(user.id);
        const messages = response?.data || [];

        const formattedData = messages.map((msg) => ({
          id: msg.h544.id,
          date: msg.h544?.dateOfOnset || "",
          patientName: msg.h544?.patient?.name || "",
          formData: {
            fromWhom: msg.mohOfficer?.appuser?.name || "",
            subject: msg.noteBook?.subject || "",
            dateOfAnswer: msg.noteBook?.createdAt?.split("T")[0] || "",
            remarks: msg.noteBook?.remarks || "",
          },
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = data.filter((item) => item.date === selectedDate);
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
      <form
        onSubmit={handleSearch}
        className="w-full p-6 rounded mt-8 flex justify-center gap-4"
      >
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
                <td className="px-4 py-3 border-b">{item.id}</td>
                <td className="px-4 py-3 border-b">{item.date}</td>
                <td className="px-4 py-3 border-b">{item.patientName}</td>
                <td className="px-4 py-3 border-b">
                  <button
                    onClick={() => openModal(item)}
                    className="bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && selectedFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-emerald-700">
              Message Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem
                label="Main Date"
                value={selectedFormData.mainDate}
                icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
              <DetailItem
                label="From Whom"
                value={selectedFormData.fromWhom}
                icon="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <DetailItem
                label="Subject"
                value={selectedFormData.subject}
                icon="M4 6h16M4 12h16M4 18h7"
              />
              <DetailItem
                label="Date of Answer"
                value={selectedFormData.dateOfAnswer}
                icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
              <DetailItem
                label="Remarks"
                value={selectedFormData.remarks}
                icon="M5 13l4 4L19 7"
                fullWidth
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
