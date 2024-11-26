import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IoIosImage } from "react-icons/io";

import api from "../lib/api.js";

import Header from "../components/Header.tsx";

import { useItemData } from "../lib/hooks.tsx";

import "../styles/itemEdit.css";

function ItemEdit() {
  const { id } = useParams() as { id: string };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [image_url, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  const item = useItemData(id);

  useEffect(() => {
    if (item.data) {
      setTitle(item.data.title);
      setDescription(item.data.description);
      setImageURL(item.data.image);
    }
  }, [item.data]);

  function getFile(event) {
    console.log(`An Item image name is ${event.target.files[0]}`);
    console.log(`Image: ${event.target.files[0]}`);
    setImage(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
    console.log("The new image was set successfully!");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    image && formData.append("image", image, image.name);

    try {
      await api(`/items/${id}/`, {
        method: "PATCH",
        body: formData,
      });
      console.log(`Item pk=${id} was updated successfully!`);
    } catch (error) {
      alert(error);
      console.log("Something go wrong when updating user profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-item header-body">
      <Header />
      <div className="item-desc main-body">
        <div className="item-card">
          <form onSubmit={handleSubmit}>
            <div className="form-element">
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={getFile}
              />
              <label htmlFor="profile-image" id="profile-image-preview">
                <img src={image_url} alt="Item" />
                <div className="upload-content">
                  <div className="upload-image">
                    <IoIosImage />
                  </div>
                  <h2>Upload image</h2>
                </div>
              </label>
            </div>

            <div className="form-group position-relative">
              <label htmlFor="title" className="d-block">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control form-control-lg thick"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group message">
              <textarea
                id="formMessage"
                className="form-control form-control-lg"
                rows={7}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="btn-container">
              <button type="submit">
                Submit
                {loading && <div className="loader"></div>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ItemEdit;
