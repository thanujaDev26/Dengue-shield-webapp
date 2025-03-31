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

    if (!appuser) {
      throw new Error("Invalid response data: appuser is undefined");
    }

    const { id, name, email, role } = appuser;
    return { id, name, email, role };
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

export default {
  handleRegister,
  handleLogin,
  logout,
};
