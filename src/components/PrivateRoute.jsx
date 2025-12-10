import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth";

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div className="p-4">Checking authentication…</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};
