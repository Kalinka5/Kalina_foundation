import React, { useEffect, useState } from "react";

import { IoMdAt, IoIosContact, IoIosImage } from "react-icons/io";
import { FaAutoprefixer, FaAustralSign } from "react-icons/fa6";

import api from "../api";

import Modal from "../components/DeleteModal";

import { API_URL } from "../constants";

import "../styles/profile.css";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [image_url, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      console.log("Start to sending a request to backend /profile");
      const res = await api.get("/profile");
      console.log("The request was sending successfully!");
      console.log(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setFirstName(res.data.first_name);
      setLastName(res.data.last_name);
      setImageURL(API_URL + res.data.image);
    } catch (err) {
      alert(err);
      console.log(
        "Something go wrong when sending backend request to /profile"
      );
    }
  };

  function getFile(event) {
    console.log(`A Profile image name is ${event.target.files[0]}`);
    setImage(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
    console.log("The new image was set successfully!");
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    image && formData.append("image", image, image.name);
    console.log(formData);

    try {
      console.log("Start updating User's profile data");
      await api.patch("/profile", formData);
      console.log("User profile was updated successfully");
    } catch (error) {
      alert(error);
      console.log("Something go wrong when updating user profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile">
      <div className="profile-card" id="profileCard">
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
                <div className="upload-content">
                  <div className="upload-image">
                    <IoIosImage />
                  </div>
                  <h2>Upload image</h2>
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
              <i className="icon">
                <IoIosContact />
              </i>
            </div>
            <div className="delete-button">
              <button
                className="btn btn-delete"
                type="button"
                id="submit1"
                onClick={() => setIsOpen(true)}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="profile-details">
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <div className="input-icon">
                <input
                  type="email"
                  name="logemail"
                  className="form-style"
                  placeholder="Your Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="icon">
                  <IoMdAt />
                </i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="firstname">Firstname:</label>
              <div className="input-icon">
                <input
                  type="text"
                  name="firstname"
                  className="form-style"
                  placeholder="Your First Name"
                  id="firstname"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <i className="icon">
                  <FaAutoprefixer />
                </i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Lastname:</label>
              <div className="input-icon">
                <input
                  type="text"
                  name="lastname"
                  className="form-style"
                  placeholder="Your Last Name"
                  id="lastname"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <i className="icon">
                  <FaAustralSign />
                </i>
              </div>
            </div>
            <div className="btn-container">
              <button type="submit" id="submit2">
                Submit
                {loading && <div className="loader"></div>}
              </button>
            </div>
          </div>
        </form>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Profile;
