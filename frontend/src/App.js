import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./components/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";

import bpla from "./img/bpla.jpg";
import communication from "./img/communication.jpg";
import drones from "./img/naval_drones.jpg";
import optical_devices from "./img/optical_devices.jpg";
import transport from "./img/transport.jpg";

import "./styles/index.css";

function Logout() {
  localStorage.clear();
  return <Navigate to="/1" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const { auth } = useAuth();
  const authLinks = [
    { id: 1, urlLink: "/logout", urlName: "Logout" },
    { id: 2, urlLink: "/profile", urlName: "Profile" },
  ];
  const notAuthLinks = [
    { id: 1, urlLink: "/register", urlName: "Register" },
    { id: 2, urlLink: "/login", urlName: "Login" },
  ];
  const images = [
    { src: bpla, alt: "BPLA", hrefPrev: "/home/5", hrefNext: "/home/2" },
    {
      src: communication,
      alt: "Communication",
      hrefPrev: "/home/1",
      hrefNext: "/home/3",
    },
    { src: drones, alt: "Drones", hrefPrev: "/home/2", hrefNext: "/home/4" },
    {
      src: optical_devices,
      alt: "Optical devices",
      hrefPrev: "/home/3",
      hrefNext: "/home/5",
    },
    {
      src: transport,
      alt: "Transport",
      hrefPrev: "/home/4",
      hrefNext: "/home/1",
    },
  ];

  return (
    <Router>
      <div className="App">
        {auth ? <Header links={authLinks} /> : <Header links={notAuthLinks} />}
        <main>
          <Routes>
            <Route exact path="home/:n?" element={<Home images={images} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/donate" element={<Payment />} />
            <Route path="*" element={<Navigate to="home/1" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
