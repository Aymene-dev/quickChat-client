import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) return <div>Chargement...</div>;
  if (!accessToken) return <Navigate to="/login" />;
  return children;
}

export default ProtectedRoute;
