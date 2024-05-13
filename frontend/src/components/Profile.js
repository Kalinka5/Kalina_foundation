import React, { useEffect, useState } from "react";
import "../css/profile.css";
import api from "../api";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getData();
  });

  const getData = () => {
    api
      .get("/profile")
      .then((res) => res.data)
      .then((data) => {
        setUsername(data.username);
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setImage(data.image);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  function getFile(event) {
    setImage(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <div className="profile">
      <div
        className="profile-card animate__animated animate__fadeIn"
        id="profileCard"
      >
        <div className="profile-header">
          <div className="form-element">
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={getFile}
            />
            <label htmlFor="profile-image" id="profile-image-preview">
              <img src={image} alt="Profile" />
              <div>
                <span>+</span>
              </div>
            </label>
          </div>
          <div className="input-data">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="underline"></div>
            <label htmlFor="username">Username</label>
          </div>
        </div>
        <div className="profile-details">
          <div className="user-data">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="user-data">
            <label htmlFor="firstname">Firstname:</label>
            <input
              type="text"
              id="firstname"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="user-data">
            <label htmlFor="lastname">Lastname:</label>
            <input
              type="text"
              id="lastname"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input type="submit" id="submit" value="SUBMIT" title="Submit" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
