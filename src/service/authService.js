import Apiclient from "./apiClient.js"; // Import the reusable Axios client

const API_URL = "/api/v1/appuser/"; // Relative path for auth-related endpoints

// Register a new user
const handleRegister = async (name, email, password) => {
  try {
    const response = await Apiclient.post(API_URL + "register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Log in a user
const handleLogin = async (useremail, password) => {
  try {
    const response = await Apiclient.post(API_URL + "login", {
      email: useremail,
      password,
    });
    console.log(response.data);

    const appuser = response?.data?.data?.appuser; // Safe navigation
    const userId = response?.data?.data?.id;
    if (!appuser) {
      throw new Error("Invalid response data: appuser is undefined");
    }

    const { name, email, role } = appuser;
    return { id: userId, name, email, role };
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

// Log out a user
const logout = async () => {
  try {
    localStorage.removeItem("user"); // Remove user data from localStorage
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

const getUserDetails = async (role, id) => {
  try {
    const response = await Apiclient.get(
      API_URL + `getAppUser?id=${id}&role=${role}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during getting message list:", error);
    throw error;
  }
};

const updateUserDetails = async (role, id, updates) => {
  try {
    const response = await Apiclient.patch(
      `/api/v1/${role}/updateUser/${id}`,
      updates
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during updating user details:", error);
    throw error;
  }
};

const deleteUser = async (role, id) => {
  try {
    const response = await Apiclient.delete(
      API_URL + `deleteAppUser?id=${id}&role=${role}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during deleting the user:", error);
    throw error;
  }
};

export default {
  handleRegister,
  handleLogin,
  logout,
  getUserDetails,
  updateUserDetails,
  deleteUser,
};
