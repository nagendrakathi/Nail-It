import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authorized", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // const fetchAllSessions = async () => {
  //   try {
  //     const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
  //     setSessions(response.data);
  //   } catch (error) {
  //     console.error("Error fetching session data:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchAllSessions();
  // }, []);

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
