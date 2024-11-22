import React, { createContext, useContext, useEffect, useState } from "react";

import { ACCESS_TOKEN } from "../lib/constants";

import { AuthContextType, AuthProviderProps } from "../lib/types";

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setAuth(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
