import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (
    !isLoading &&
    user &&
    (user?.role === "admin" || user?.role === "superAdmin")
  ) {
    return children;
  }
  if (!isLoading && (user?.role !== "admin" || user?.role !== "superAdmin")) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
