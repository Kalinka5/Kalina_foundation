import "./css/main.css";
import React from "react";

import Header from "./components/Header";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./components/AuthContext";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

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
  return (
    <Router>
      <div className="App">
        {auth ? <Header links={authLinks} /> : <Header links={notAuthLinks} />}
        <main>
          <Routes>
            <Route exact path="/" element={<Slider />} />
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
