import React, { useContext } from "react";
import Spinner from "../components/spinner/Spinner";
import { AuthContext } from "../providers/AuthProvider";

const CheckLoading = ({ children }) => {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  if (!isLoading) {
    return children;
  }
};

export default CheckLoading;
