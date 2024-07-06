import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { useMediaQuery } from "@uidotdev/usehooks";

import {
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

import Home from "./pages/Home";
import ItemEdit from "./pages/ItemEdit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";

import bpla from "./img/bpla.jpg";
import bplaMobile from "./img/bpla_mobile.jpeg";
import communication from "./img/communication.jpg";
import communicationMobile from "./img/communication_mobile.jpg";
import drones from "./img/naval_drones.jpg";
import dronesMobile from "./img/drones_mobile.jpg";
import opticalDevices from "./img/optical_devices.jpg";
import opticalDevMobile from "./img/optical_dev_mobile.jpg";
import transport from "./img/transport.jpg";
import transportMobile from "./img/transport_mobile.jpeg";

import "./styles/index.css";

function Logout() {
  localStorage.clear();
  return <Navigate to={`${HOME_PAGE}/1`} />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const { auth } = useAuth();
  const authLinks = [
    { id: 1, urlLink: `${LOGOUT_PAGE}`, urlName: "Logout" },
    { id: 2, urlLink: `${PROFILE_PAGE}`, urlName: "Profile" },
  ];
  const notAuthLinks = [
    { id: 1, urlLink: `${REGISTER_PAGE}`, urlName: "Register" },
    { id: 2, urlLink: `${LOGIN_PAGE}`, urlName: "Login" },
  ];
  const isMobile = useMediaQuery("only screen and (max-width: 479px)");
  const images = [
    {
      src: isMobile ? bplaMobile : bpla,
      alt: "BPLA",
      hrefPrev: `${HOME_PAGE}/5`,
      hrefNext: `${HOME_PAGE}/2`,
    },
    {
      src: isMobile ? communicationMobile : communication,
      alt: "Communication",
      hrefPrev: `${HOME_PAGE}/1`,
      hrefNext: `${HOME_PAGE}/3`,
    },
    {
      src: isMobile ? dronesMobile : drones,
      alt: "Drones",
      hrefPrev: `${HOME_PAGE}/2`,
      hrefNext: `${HOME_PAGE}/4`,
    },
    {
      src: isMobile ? opticalDevMobile : opticalDevices,
      alt: "Optical devices",
      hrefPrev: `${HOME_PAGE}/3`,
      hrefNext: `${HOME_PAGE}/5`,
    },
    {
      src: isMobile ? transportMobile : transport,
      alt: "Transport",
      hrefPrev: `${HOME_PAGE}/4`,
      hrefNext: `${HOME_PAGE}/1`,
    },
  ];

  return (
    <Router>
      <div className="App">
        {auth ? <Header links={authLinks} /> : <Header links={notAuthLinks} />}
        <main>
          <Routes>
            <Route
              exact
              path={`${HOME_PAGE}/:n?`}
              element={<Home images={images} />}
            />
            <Route exact path="item/:id/edit" element={<ItemEdit />} />
            <Route path={LOGIN_PAGE} element={<Login />} />
            <Route path={REGISTER_PAGE} element={<RegisterAndLogout />} />
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
