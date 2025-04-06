import { useEffect, useState } from "react";
import { useAuth } from "../../ProtectedRoutes/AuthContext";
import mohService from "../../../service/mohService";
import toast from "react-hot-toast";
import MoHStats from "./MoHStats";
import MessageMOH from "./MessageMOH";

export default function MOHpanel() {
  const { user } = useAuth();
  const userId = user.id;

  const [activeTab, setActiveTab] = useState("viewPHI");
  const [assignedPHIs, setAssignedPHIs] = useState([]);
  const [unassignedPHIs, setUnassignedPHIs] = useState([]);

  const [currentPageAssigned, setCurrentPageAssigned] = useState(1);
  const [currentPageUnassigned, setCurrentPageUnassigned] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchAllPhis = async () => {
      try {
        const response = await mohService.getAllThePhi(userId);
        const phis = response.data;

        const assigned = phis.filter((phi) => phi.mohOfficer !== null);
        const unassigned = phis.filter((phi) => phi.mohOfficer === null);

        setAssignedPHIs(assigned);
        setUnassignedPHIs(unassigned);
      } catch (error) {
        console.error("Error fetching PHI officers:", error);
      }
    };

    fetchAllPhis();
  }, [userId]);

  const handleAssignPhiOfficer = async (phiId) => {
    try {
      const response = await mohService.assignPhi(userId, phiId);
      console.log(response.data);

      const assignedPHI = unassignedPHIs.find((phi) => phi.id === phiId);
      if (!assignedPHI) return;

      setUnassignedPHIs((prev) => prev.filter((phi) => phi.id !== phiId));
      setAssignedPHIs((prev) => [
        ...prev,
        { ...assignedPHI, mohOfficer: { id: userId } },
      ]);

      toast.success("PHI Officer assigned successfully!");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while assigning PHI");
    }
  };

  const unassignPhiOfficer = async (phiId) => {
    try {
      const response = await mohService.unassignPhi(phiId);
      console.log(response.data);

      const unassignedPHI = assignedPHIs.find((phi) => phi.id === phiId);
      if (!unassignedPHI) return;

      setAssignedPHIs((prev) => prev.filter((phi) => phi.id !== phiId));
      setUnassignedPHIs((prev) => [
        ...prev,
        { ...unassignedPHI, mohOfficer: null },
      ]);

      toast.success("PHI Officer unassigned successfully!");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while unassigning PHI");
    }
  };

  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const totalPagesAssigned = Math.ceil(assignedPHIs.length / itemsPerPage);
  const totalPagesUnassigned = Math.ceil(unassignedPHIs.length / itemsPerPage);

  const messagePHI = (id) => {
    alert(`Messaging PHI Officer ${id}`);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-5xl mx-auto flex">
        {/* Sidebar Tabs */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            MOH Officer Panel
          </h2>
          <div className="space-y-4">
            {["viewPHI", "viewStats", "messagePHI"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full py-2 px-4 text-left rounded-lg ${
                  activeTab === tab
                    ? "bg-green-600 text-white"
                    : "bg-white text-green-700 hover:bg-green-100"
                }`}
              >
                {tab === "viewPHI" && "View PHI Officers"}
                {tab === "viewStats" && "View PHI Stats"}
                {tab === "messagePHI" && "Message PHI Officers"}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-3/4 ml-6">
          {/* View PHI Officers Tab */}
          {activeTab === "viewPHI" && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                Assigned PHI Officers
              </h3>
              <ul className="space-y-4">
                {paginate(assignedPHIs, currentPageAssigned).map((phi) => (
                  <li
                    key={phi.id}
                    className="flex justify-between items-center bg-green-100 p-4 rounded-xl shadow-sm"
                  >
                    <div>
                      <p className="text-lg font-semibold text-green-800">
                        {phi.appuser.name}
                      </p>
                      <p className="text-sm text-green-700">
                        Branch: {phi.branch} | Area: {phi.area}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => unassignPhiOfficer(phi.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Unassign
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  onClick={() =>
                    setCurrentPageAssigned((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPageAssigned === 1}
                  className={`px-3 py-1 rounded-full ${
                    currentPageAssigned === 1
                      ? "bg-gray-300 text-gray-500"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  &lt;
                </button>
                <span className="text-green-700">
                  Page {currentPageAssigned} of {totalPagesAssigned}
                </span>
                <button
                  onClick={() =>
                    setCurrentPageAssigned((prev) =>
                      Math.min(prev + 1, totalPagesAssigned)
                    )
                  }
                  disabled={currentPageAssigned === totalPagesAssigned}
                  className={`px-3 py-1 rounded-full ${
                    currentPageAssigned === totalPagesAssigned
                      ? "bg-gray-300 text-gray-500"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  &gt;
                </button>
              </div>

              <h3 className="text-xl font-semibold text-green-700 mt-8 mb-4">
                Unassigned PHI Officers
              </h3>
              <ul className="space-y-4">
                {paginate(unassignedPHIs, currentPageUnassigned).map((phi) => (
                  <li
                    key={phi.id}
                    className="flex justify-between items-center bg-green-100 p-4 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-green-800">
                        {phi.appuser.name}
                      </p>
                      <p className="text-sm text-green-600">
                        Branch: {phi.branch} | Area: {phi.area}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAssignPhiOfficer(phi.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                    >
                      Assign
                    </button>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  onClick={() =>
                    setCurrentPageUnassigned((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPageUnassigned === 1}
                  className={`px-3 py-1 rounded-full ${
                    currentPageUnassigned === 1
                      ? "bg-gray-300 text-gray-500"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  &lt;
                </button>
                <span className="text-green-700">
                  Page {currentPageUnassigned} of {totalPagesUnassigned}
                </span>
                <button
                  onClick={() =>
                    setCurrentPageUnassigned((prev) =>
                      Math.min(prev + 1, totalPagesUnassigned)
                    )
                  }
                  disabled={currentPageUnassigned === totalPagesUnassigned}
                  className={`px-3 py-1 rounded-full ${
                    currentPageUnassigned === totalPagesUnassigned
                      ? "bg-gray-300 text-gray-500"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}

          {/* View PHI Stats Tab */}
          {activeTab === "viewStats" && <MoHStats id={userId} />}

          {/* Message PHI Officers Tab */}
          {activeTab === "messagePHI" && (
            <MessageMOH assignedPHIs={assignedPHIs} />
          )}
        </div>
      </div>
    </div>
  );
}
