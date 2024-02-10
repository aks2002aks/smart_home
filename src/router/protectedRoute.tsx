import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Outlet />;
};

export default ProtectedRoute;
