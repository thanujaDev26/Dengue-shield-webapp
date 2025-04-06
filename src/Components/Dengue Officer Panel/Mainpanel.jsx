import { useAuth } from "../ProtectedRoutes/AuthContext";
import AuthLayout from "../ProtectedRoutes/AuthLayout";
import MOHpanel from "./MOH/MOHpanel";
import PhiPanel from "./PHI/PhiPanel";

export default function Mainpanel() {
  const { user } = useAuth();
  return (
    <div>
      <AuthLayout>
        {user.role == "ROLE_MOH" ? <MOHpanel /> : <PhiPanel />}
      </AuthLayout>
    </div>
  );
}
