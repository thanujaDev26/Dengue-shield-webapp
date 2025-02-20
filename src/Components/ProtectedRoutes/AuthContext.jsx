import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const userDetailsString = localStorage.getItem("user");
      console.log(userDetailsString);
      

    if (userDetailsString) {
      try {
        const userDetails = JSON.parse(userDetailsString);
        if (userDetails.appuser && userDetails.appuser.role) {
          setUser(userDetails); // Store user in context
        } else {
          logout(); // Invalid data, force logout
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
      }
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
