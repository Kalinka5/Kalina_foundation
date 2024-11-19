import React, { createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  HOME_PAGE,
  LOGIN_PAGE,
  REGISTER_PAGE,
  LOGOUT_PAGE,
  PROFILE_PAGE,
  DONATE_PAGE,
} from "./constants.js";

import ProtectedRoute from "./components/ProtectedRoute.js";
import { useAuth } from "./components/AuthContext.js";

import EmailVerify from "./pages/EmailVerify.tsx";
import Home from "./pages/Home.tsx";
import ItemEdit from "./pages/ItemEdit.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import Payment from "./pages/Payment.tsx";

import "./styles/index.css";

function Logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  return <Navigate to={`${HOME_PAGE}/1`} />;
}

type AuthContextType = {
  auth: boolean;
  authLinks: { id: number; urlLink: string; urlName: string }[];
  notAuthLinks: { id: number; urlLink: string; urlName: string }[];
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function App() {
  const { auth } = useAuth();
  const authLinks = [
    { id: 1, urlLink: `${PROFILE_PAGE}`, urlName: "profile" },
    { id: 2, urlLink: `${LOGOUT_PAGE}`, urlName: "logout" },
  ];
  const notAuthLinks = [
    { id: 1, urlLink: `${LOGIN_PAGE}`, urlName: "login" },
    { id: 2, urlLink: `${REGISTER_PAGE}`, urlName: "register" },
  ];

  return (
    <Router>
      <AuthContext.Provider value={{ auth: !!auth, authLinks, notAuthLinks }}>
        <main className="App">
          <Routes>
            <Route path={`${HOME_PAGE}/:n?`} element={<Home />} />
            <Route path="item/:id/edit" element={<ItemEdit />} />
            <Route path={LOGIN_PAGE} element={<Login />} />
            <Route path={REGISTER_PAGE} element={<Register />} />
            <Route path="email-verify/:uid/:token" element={<EmailVerify />} />
            <Route path={LOGOUT_PAGE} element={<Logout />} />
            <Route
              path={PROFILE_PAGE}
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path={DONATE_PAGE} element={<Payment />} />
            <Route
              path="*"
              element={<Navigate to={`${HOME_PAGE}/1`} replace />}
            />
          </Routes>
        </main>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
