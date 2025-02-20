import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../ProtectedRoutes/AuthContext"; // Import the auth context

const MOHLayout = ({ children }) => {
  return <div className="moh-layout">{children}</div>;
};

const PHILayout = ({ children }) => {
  return <div className="phi-layout">{children}</div>;
};

const AuthLayout = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in"); // Redirect if user is not logged in
    }
  }, [user, navigate]);
  console.log(user.data.appuser.role);
  if (!user) return null; // Prevent rendering while checking authentication

  return user.data.appuser.role === "ROLE_MOH" ? (
    <MOHLayout>{children}</MOHLayout>
  ) : (
    <PHILayout>{children}</PHILayout>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
MOHLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
PHILayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
