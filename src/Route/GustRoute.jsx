import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import { AuthContext } from "../providers/AuthProvider";

const GustRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && user) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }
  if (!isLoading && !user) {
    return children;
  }
};

export default GustRoute;
