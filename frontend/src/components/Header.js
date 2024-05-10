import React from "react";
import "../css/header.css";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div class="logo">
          <a href="/">Kalina Fond</a>
        </div>
        <div class="nav">
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
