import React, { useEffect, useState } from "react";
import "../css/profile.css";
import api from "../api";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [image_url, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const getData = async () => {
    try {
      const res = await api.get("/profile");
      console.log(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setFirstName(res.data.first_name);
      setLastName(res.data.last_name);
      setImageURL(process.env.REACT_APP_API_URL + res.data.image);
    } catch (err) {
      alert(err);
    }
  };

  function getFile(event) {
    console.log(event.target.files[0]);
    setImage(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await sleep(20000);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("image", image, image.name);
    console.log(formData);

    try {
      await api.patch("/profile", formData);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile">
      <div
        className="profile-card animate__animated animate__fadeIn"
        id="profileCard"
      >
        <form onSubmit={handleSubmit}>
          <div className="profile-header">
            <div className="form-element">
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={getFile}
              />
              <label htmlFor="profile-image" id="profile-image-preview">
                <img src={image_url} alt="Profile" />
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
            <div className="btn-container">
              <button type="submit">
                Submit
                {loading && <div className="loader"></div>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
