import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../service/authService";
import { User } from "lucide-react"; // Import Lucide React Avatar
import toast from "react-hot-toast";
import { useAuth } from "../ProtectedRoutes/AuthContext";

export default function Profile() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { id, role } = location.state || {}; // Assuming role is passed with state

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    district: "",
    branch: "",
    area: "",
  });

  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user details and populate formData
  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const response = await authService.getUserDetails(role, id);
        const data = response.data;
        setUserDetails(data);
        setFormData({
          name: data.appuser?.name || "",
          email: data.appuser?.email || "",
          mobilenumber: data.mobilenumber || "",
          district: data.district || "",
          branch: data.branch || "",
          area: data.area || "",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id && role) fetchUserDetails();
  }, [id, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      let updatedData;

      // Destructure formData and exclude 'area' if the role is not PHI
      if (role === "ROLE_PHI") {
        updatedData = { ...formData };
      } else {
        const { area, ...rest } = formData;
        updatedData = rest;
      }
      let Role = role === "ROLE_MOH" ? "moh" : "phi";
      const response = await authService.updateUserDetails(
        Role,
        id,
        updatedData
      );
      console.log(response.data);
      toast.success("Successfully updated the user");
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Error updating data");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await authService.deleteUser(role, id);
      console.log(response.data);
      toast.success("succesfully deleted the account");
      logout();
      navigate("/sign-in"); // Redirect to login after account deletion
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("error deleting account");
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenUpdateModal = () => setIsUpdateModalOpen(true);
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <div className="spinner-border animate-spin inline-block w-24 h-24 border-4 border-green-500 rounded-full" />
      </div>
    );
  }

  if (!userDetails) return <div>No user details found!</div>;

  return (
    <div className="min-h-screen bg-green-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
        <div className="flex flex-col items-center">
          <User size={96} color="green" className="rounded-full mb-4" />
          <h1 className="text-3xl font-bold text-green-700">
            {userDetails.appuser.name}
          </h1>
          <p className="text-gray-600 mt-2">{userDetails.appuser.email}</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Mobile Number:</span>
            <span>{userDetails.mobilenumber || "N/A"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Branch:</span>
            <span>{userDetails.branch}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">District:</span>
            <span>{userDetails.district}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handleOpenUpdateModal}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Update Details
          </button>
          <button
            onClick={handleOpenModal}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Confirmation Modal for Deleting Account */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-80 max-w-full">
            <h2 className="text-xl font-semibold text-gray-700">
              Are you sure?
            </h2>
            <p className="text-gray-600 mt-2">
              Deleting your account is permanent and cannot be undone.
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-80 max-w-full">
            <h2 className="text-xl font-semibold text-gray-700">
              Update Details
            </h2>
            <form>
              {Object.keys(formData).map((key) => {
                if (key === "area" && role !== "ROLE_PHI") return null; // Skip 'area' if not PHI

                return (
                  <div key={key} className="mt-4">
                    <label className="block text-gray-700 capitalize">
                      {key}
                    </label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 mt-2 border rounded-md"
                    />
                  </div>
                );
              })}
            </form>

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleCloseUpdateModal}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
