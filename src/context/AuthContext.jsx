import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";
import { io } from "socket.io-client";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [socket, setSocket] = useState(null);

  const login = (token) => {
    setAccessToken(token);
    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    const newSocket = io("http://localhost:3000", {
      auth: { token },
    });
    setSocket(newSocket);
  };
  const logout = () => {
    socket?.disconnect();
    setSocket(null);
    setAccessToken(null);
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, socket }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
