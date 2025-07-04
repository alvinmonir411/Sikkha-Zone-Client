import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="text-center  flex justify-center items-center h-[30vh] font-bold text-blue-500">
        <div className="mx-auto border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
