import React from "react";
import "./css/profile.css";

class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <div
          class="profile-card animate__animated animate__fadeIn"
          id="profileCard"
        >
          <div class="profile-header">
            <div class="profile-picture">
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20230816191453/gfglogo.png"
                alt="User"
              />
            </div>
            <h2 class="profile-username">Username</h2>
          </div>
          <div class="profile-details">
            <div class="user-data">
              <label for="email">E-mail:</label>
              <input type="email" id="email" value="Email" />
            </div>
            <div class="user-data">
              <label for="firstname">Firstname:</label>
              <input type="text" id="firstname" value="Firstname" />
            </div>
            <div class="user-data">
              <label for="lastname">Lastname:</label>
              <input type="text" id="lastname" value="Lastname" />
            </div>
            <input type="submit" id="submit" value="SUBMIT" title="Submit" />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
