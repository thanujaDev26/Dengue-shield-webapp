import Apiclient from "./apiClient.js"; // Import the reusable Axios client

const API_URL = "/api/v1/appuser/"; // Relative path for auth-related endpoints

// Register a new user
const register = async (name, email, password) => {
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
const login = async (email, password) => {
  try {
    const response = await Apiclient.post(API_URL + "login", {
      email,
      password,
    });

    console.log(response.data);
    return response.data;
    // Return the server response
  } catch (error) {
    console.error("Error during login:", error);
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
  register,
  login,
  logout,
};
