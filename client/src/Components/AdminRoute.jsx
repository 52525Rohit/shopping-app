import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    toast.error("Please login to access this page");
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    toast.error("Admin access required");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
