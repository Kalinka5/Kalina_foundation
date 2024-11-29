import React, { createContext, useContext, useEffect, useState } from "react";

import {
  AuthContextType,
  AuthProviderProps,
  DecodedToken,
  TokenResponse,
} from "../lib/types";

import { jwtDecode } from "jwt-decode";

import api from "../lib/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../lib/constants";

const AuthContext = createContext<AuthContextType>({
  isAuthorized: false,
  setIsAuthorized: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const authenticate = async () => {
      try {
        await auth();
      } finally {
        setLoading(false); // Loading is complete
      }
    };
    authenticate();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const response = (await api("/token/refresh/", {
        method: "POST",
        body: JSON.stringify({ refresh: refreshToken }),
      })) as TokenResponse;

      if (response?.access) {
        localStorage.setItem(ACCESS_TOKEN, response.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decoded = jwtDecode<DecodedToken>(token);
    const tokenExpiration = decoded?.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
