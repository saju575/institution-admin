import { createContext, useEffect, useState } from "react";
import axios from "../utills/axiosInstance";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/admin/admin-profile");

      setUser(response.data.payload);
      setIsLoading(false); // Set isLoading to false when user data is fetched
    } catch (error) {
      setIsLoading(false); // Set isLoading to false in case of an error
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
