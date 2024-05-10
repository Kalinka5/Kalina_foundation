import React from "react";
import "./css/register.css";

class Register extends React.Component {
  render() {
    return (
      <div class="register">
        <div class="register-background">
          <div class="register-shape"></div>
          <div class="register-shape"></div>
        </div>
        <form className="register-form" action="#">
          <h2>Registration</h2>

          <div class="input-box">
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div class="input-box">
            <input type="text" placeholder="Enter your email" required />
          </div>

          <div class="input-box">
            <input type="password" placeholder="Create password" required />
          </div>

          <div class="input-box">
            <input type="password" placeholder="Confirm password" required />
          </div>

          <div class="policy">
            <input type="checkbox" />
            <h3>I accept all terms & condition</h3>
          </div>

          <div class="input-box button">
            <input type="Submit" value="Register Now" />
          </div>

          <div class="text">
            <h3>
              Already have an account? <a href="/login">Login now</a>
            </h3>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
