import React from "react";
import "../css/header.css";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="logo">
          <a href="/">Kalina Fond</a>
        </div>
        <div className="nav">
          <ul>
            <li id="show-nails">
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
