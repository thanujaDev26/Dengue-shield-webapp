import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../ProtectedRoutes/AuthContext.jsx";
import mohService from "../../../service/mohService.js";
import { User as UserIcon } from "lucide-react"; // Import Lucide icon
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SendH544Form() {
  const AuthUser = useAuth();
  const mohId = AuthUser.user.role === "ROLE_MOH" ? AuthUser.user.id : null;
  const [isLoading, setLoading] = useState(false);
  const [isSending, setSending] = useState(false);
  const [phiList, setPhiList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhi, setSelectedPhi] = useState(null);
  const { h544Id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPhiOfficerList() {
      setLoading(true); // Start loading
      try {
        const response = await mohService.getAssignedPhiOfficers(mohId);
        const phiData = response.data;
        const philist = phiData.map((phi) => ({
          id: phi.id,
          branch: phi.branch,
          area: phi.area,
          district: phi.district,
          name: phi.appuser.name || "Unknown", // Fallback in case name is missing
          email: phi.appuser.email,
          phone: phi.mobilenumber,
        }));
        setPhiList(philist);
      } catch (error) {
        console.error("Error fetching phi officers:", error);
      } finally {
        setLoading(false);
      }
    }
    getPhiOfficerList();
  }, [mohId]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectPhi = (phi) => {
    if (selectedPhi?.id === phi.id) {
      setSelectedPhi(null); // Deselect if the same PHI is clicked
    } else {
      setSelectedPhi(phi); // Select new PHI
    }
  };

  const handleSubmit = async () => {
    const message = {
      mohOfficerId: mohId,
      phiOfficerId: selectedPhi.id,
      h544Id: h544Id,
    };
    try {
      setSending(true);
      const response = await mohService.sendH544Form(message);
      console.log(response);
      toast.success("H544 sent succesfully");
      navigate("/pending-table");
    } catch (error) {
      console.log(error);
      toast.error("something error occured during sending");
    } finally {
      setSending(false);
    }
  };

  /*  private long mohOfficerId; // MOH who sent the message
    private long phiOfficerId; // PHI who received the message
    private long h544Id; */

  const filteredPhiList = phiList.filter((phi) => {
    const nameMatch =
      phi.name && phi.name.toLowerCase().includes(searchQuery.toLowerCase());
    const areaMatch =
      phi.area && phi.area.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || areaMatch;
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Select PHI Officer
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Choose the officer to send the H544 form to.
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or area"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900"
        />
      </div>

      <div className="h-72 overflow-y-auto bg-white rounded-lg border border-gray-300 shadow-md mb-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-4 border-t-4 border-green-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredPhiList.length > 0 ? (
          filteredPhiList.map((phi) => (
            <div
              key={phi.id}
              onClick={() => handleSelectPhi(phi)}
              className={`flex items-center p-6 cursor-pointer hover:bg-green-50 transition duration-300 ease-in-out transform hover:scale-105 ${
                selectedPhi?.id === phi.id ? "bg-green-100" : ""
              } rounded-lg border border-gray-300 mb-6`}
            >
              <UserIcon className="w-16 h-16 text-gray-600 mr-6" />
              <div className="flex-1">
                <h3 className="font-semibold text-xl text-gray-800">
                  {phi.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {phi.branch}, {phi.area}
                </p>
                {/* Email and Phone */}
                <div className="mt-3">
                  <p className="text-sm text-gray-600 flex items-center">
                    <span className="font-medium text-gray-800 mr-2">
                      Email:
                    </span>
                    <a
                      href={`mailto:${phi.email}`}
                      className="text-green-600 hover:text-green-800"
                    >
                      {phi.email}
                    </a>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center mt-2">
                    <span className="font-medium text-gray-800 mr-2">
                      Phone:
                    </span>
                    <a
                      href={`tel:${phi.phone}`}
                      className="text-green-600 hover:text-green-800"
                    >
                      {phi.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No PHI officers found
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className={`w-1/3 mx-auto py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out disabled:opacity-50 ${
          !selectedPhi ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={!selectedPhi}
      >
        {isSending ? "sending h544 form" : "Send H544 Form"}
      </button>
    </div>
  );
}
