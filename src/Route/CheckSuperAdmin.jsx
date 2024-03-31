import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import { AuthContext } from "../providers/AuthProvider";

const CheckSuperAdmin = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && user && user?.role === "superAdmin") {
    return children;
  }
  if (!isLoading && user?.role !== "superAdmin") {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }
};

export default CheckSuperAdmin;
