import { createContext, useContext, useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

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
