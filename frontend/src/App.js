import "./css/main.css";
import React from "react";

import Header from "./components/Header";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import Login from "./Login";
import Register from "./Register";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route exact path="/" element={<Slider />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
