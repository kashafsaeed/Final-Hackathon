import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({
  allowedRole,
}) => {

  const {
    user,
    loading,
  } = useAuth();


  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1FAEE] flex items-center justify-center">
        <p className="text-[#457B9D] font-semibold">
          Loading...
        </p>
      </div>
    );
  }


  // Not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  // Wrong role
  if (
    allowedRole &&
    user.role !== allowedRole
  ) {
    if (user.role === "admin") {
      return (
        <Navigate
          to="/admin"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }


  return <Outlet />;
};


export default ProtectedRoute;