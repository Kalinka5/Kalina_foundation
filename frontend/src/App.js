import React from "react";
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
} from "./constants";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./components/AuthContext";
import EmailVerify from "./components/EmailVerify";

import Home from "./pages/Home";
import ItemEdit from "./pages/ItemEdit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";

import "./styles/index.css";

function Logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  return <Navigate to={`${HOME_PAGE}/1`} />;
}

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
      <div className="App">
        <Header links={auth ? authLinks : notAuthLinks} />
        <main>
          <Routes>
            <Route
              exact
              path={`${HOME_PAGE}/:n?`}
              element={<Home isAuth={auth ? true : false} />}
            />
            <Route exact path="item/:id/edit" element={<ItemEdit />} />
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
      </div>
    </Router>
  );
}

export default App;
