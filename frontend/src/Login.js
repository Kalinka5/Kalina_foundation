import React from "react";
import "./css/login.css";

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <div class="login-background">
          <div class="login-shape"></div>
          <div class="login-shape"></div>
        </div>
        <form className="login-form">
          <h3>Login Here</h3>

          <label for="username">Username</label>
          <input type="text" placeholder="Email or Phone" id="username" />

          <label for="password">Password</label>
          <input type="password" placeholder="Password" id="password" />

          <button>Log In</button>

          <p>
            You don't have an account? <a href="/register">Register now</a>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
