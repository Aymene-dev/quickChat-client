import { createContext, useContext, useEffect, useRef, useState } from "react";
import api from "../api/axios.js";
import axios from "axios";
import { io } from "socket.io-client";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const tokenRef = useRef(null);

  useEffect(() => {
    api.interceptors.request.use((config) => {
      if (tokenRef.current) {
        config.headers.Authorization = `Bearer ${tokenRef.current}`;
      }
      return config;
    });
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/auth/refresh",
          { refreshToken },
        );
        const newAccessToken = response.data.accessToken;
        login(newAccessToken);
      } catch (error) {
        console.error("Refresh token error:", error);
        localStorage.removeItem("refreshToken");
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = (token) => {
    tokenRef.current = token;
    setAccessToken(token);

    const newSocket = io("http://localhost:3000", {
      auth: { token },
    });
    setSocket(newSocket);
  };

  const logout = () => {
    tokenRef.current = null;
    socket?.disconnect();
    setSocket(null);
    setAccessToken(null);
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, socket, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
