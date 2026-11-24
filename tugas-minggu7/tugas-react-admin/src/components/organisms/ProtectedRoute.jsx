import { Navigate, Outlet } from "react-router-dom";
import { useAuthStateContext } from "../../utils/contexts/AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuthStateContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}