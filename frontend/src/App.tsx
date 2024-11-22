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
} from "./lib/constants.js";

import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { useAuth } from "./components/AuthContext.tsx";

import EmailVerify from "./pages/EmailVerify.tsx";
import Home from "./pages/Home.tsx";
import ItemEdit from "./pages/ItemEdit.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import Payment from "./pages/Payment.tsx";

import { HeaderContextType } from "./lib/types.tsx";

import "./styles/index.css";

function Logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  return <Navigate to={`${HOME_PAGE}/1`} />;
}

export const HeaderContext = createContext<HeaderContextType | undefined>(
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
      <HeaderContext.Provider value={{ auth: !!auth, authLinks, notAuthLinks }}>
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
      </HeaderContext.Provider>
    </Router>
  );
}

export default App;
