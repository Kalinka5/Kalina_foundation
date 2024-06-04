import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IoMdAt, IoIosContact, IoIosImage } from "react-icons/io";
import { FaAutoprefixer, FaAustralSign } from "react-icons/fa6";

import api from "../api";

import { API_URL } from "../constants";

import "../styles/itemEdit.css";

function ItemEdit() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [full_price, setFullPrice] = useState("");
  const [image, setImage] = useState("");
  const [image_url, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await api.get(`items/${id}/`);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setAmount(res.data.amount);
      setFullPrice(res.data.full_price);
      setImageURL(API_URL + res.data.image);
    } catch (err) {
      alert(err);
      console.log(
        "Something go wrong when sending backend request to /profile"
      );
    }
  };

  function getFile(event) {
    console.log(`An Item image name is ${event.target.files[0]}`);
    console.log(`Image: ${event.target.files[0]}`);
    setImage(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
    console.log("The new image was set successfully!");
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("full_price", full_price);
    image && formData.append("image", image, image.name);
    console.log(image.name);

    try {
      await api.patch(`/items/${id}/`, formData);
      console.log(`Item pk=${id} was updated successfully!`);
    } catch (error) {
      alert(error);
      console.log("Something go wrong when updating user profile!");
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
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <div className="underline"></div>
              <label htmlFor="title">Title</label>
              <i className="icon uil uil-at">
                <IoIosContact />
              </i>
            </div>
          </div>
          <div className="profile-details">
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <div className="input-icon">
                <textarea
                  type="text"
                  name="description"
                  className="form-style"
                  placeholder="Your description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <i className="icon uil uil-at">
                  <IoMdAt />
                </i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <div className="input-icon">
                <input
                  type="text"
                  name="amount"
                  className="form-style"
                  placeholder="Amount"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <i className="icon uil uil-user">
                  <FaAutoprefixer />
                </i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="full_price">Full price:</label>
              <div className="input-icon">
                <input
                  type="text"
                  name="full_price"
                  className="form-style"
                  placeholder="Full price"
                  id="full_price"
                  value={full_price}
                  onChange={(e) => setFullPrice(e.target.value)}
                />
                <i className="icon uil uil-user">
                  <FaAustralSign />
                </i>
              </div>
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

export default ItemEdit;
