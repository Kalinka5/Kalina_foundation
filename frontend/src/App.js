import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./components/AuthContext";

import bpla from "./img/bpla.jpg";
import communication from "./img/communication.jpg";
import drones from "./img/drones.jpg";
import optical_devices from "./img/optical_devices.jpg";
import transport from "./img/transport.jpg";

import "./css/main.css";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
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
    { src: bpla, alt: "BPLA", hrefPrev: "/6", hrefNext: "/2" },
    {
      src: communication,
      alt: "Communication",
      hrefPrev: "/1",
      hrefNext: "/3",
    },
    { src: drones, alt: "Drones", hrefPrev: "/2", hrefNext: "/4" },
    {
      src: optical_devices,
      alt: "Optical devices",
      hrefPrev: "/3",
      hrefNext: "/5",
    },
    { src: transport, alt: "Transport", hrefPrev: "/4", hrefNext: "/1" },
  ];

  return (
    <Router>
      <div className="App">
        {auth ? <Header links={authLinks} /> : <Header links={notAuthLinks} />}
        <main>
          <Routes>
            <Route exact path="/:n" element={<Main images={images} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
