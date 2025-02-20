import AuthLayout from "../ProtectedRoutes/AuthLayout";
import LandingMOH from "./LandingMOH";
import LandingPHI from "./LandingPHI";
import { useAuth } from "../ProtectedRoutes/AuthContext";

export default function Landing() {
  const { user } = useAuth(); // Get user role from context

  return (
    <AuthLayout>
      <div className="flex flex-col md:flex-row items-center bg-transparent min-h-1/2 m-0 w-full p-0">
        {/* Render MOH or PHI Component Based on Role */}

        {user.data.appuser.role === "ROLE_MOH" ? (
          <LandingMOH />
        ) : (
          <LandingPHI />
        )}
        {/* Image section */}
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent md:block hidden"></div>
          <img
            src="images/Dashboard_main.jpeg"
            alt="Dashboard Illustration"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </AuthLayout>
  );
}
