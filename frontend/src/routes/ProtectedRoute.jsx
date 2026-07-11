import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  const authToken = token || localStorage.getItem("token");

  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;