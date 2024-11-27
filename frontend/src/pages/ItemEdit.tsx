import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { IoIosImage, IoIosCreate, IoIosKeypad } from "react-icons/io";

import Alert from "@mui/material/Alert";

import { useTranslation } from "react-i18next";

import api from "../lib/api.js";

import Header from "../components/Header.tsx";
import DeleteButton from "../components/Profile/DeleteButton.js";

import { HOME_PAGE } from "../lib/constants.js";

import { useItemData } from "../lib/hooks.tsx";

import "../styles/itemEdit.css";

function ItemEdit() {
  const { id } = useParams() as { id: string };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [image_url, setImageURL] = useState("");
  const [amount, setAmount] = useState(0);
  const [fullPrice, setFullPrice] = useState(0);
  const [collected, setCollected] = useState(0);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const item = useItemData(id);

  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    if (item.data) {
      setTitle(item.data.title);
      setDescription(item.data.description);
      setImageURL(item.data.image);
      setAmount(item.data.amount);
      setFullPrice(item.data.full_price);
      setCollected(item.data.collected);
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
    formData.append("amount", amount.toString());
    formData.append("full_price", fullPrice.toString());
    formData.append("collected", collected.toString());

    try {
      await api(`/items/${id}/`, {
        method: "PATCH",
        body: formData,
      });
      console.log(`Item (id=${id}) was updated successfully!`);
      setIsSuccess(true);
    } catch (error) {
      alert(error);
      console.log("Something go wrong when updating user profile!");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (e) => {
    e.preventDefault();
    try {
      await api(`/items/${id}/`, {
        method: "DELETE",
      });
      console.log(`Item (id=${id}) was deleted successfully!`);
      navigate(`${HOME_PAGE}`);
    } catch (error) {
      alert(error);
      console.log("Something go wrong when updating user profile!");
    }
  };

  return (
    <div className="edit-item header-body">
      <Header />
      <div className="item-desc main-body">
        {isSuccess && (
          <Alert
            variant="filled"
            severity="success"
            className="alert-message"
            onClose={() => {
              setIsSuccess(false);
            }}
          >
            Item (id={id}) was updated successfully!
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="item-card container">
          <div className="row">
            <h1>
              Item (<i>{id} id</i>)
            </h1>
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
          </div>
          <div className="row">
            <h4>Title</h4>
            <div className="input-group input-group-icon">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="input-icon">
                <i>
                  <IoIosCreate size={30} />
                </i>
              </div>
            </div>
          </div>
          <div className="row">
            <h4>Amount</h4>
            <div className="input-group input-group-icon">
              <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <div className="input-icon">
                <i>
                  <IoIosKeypad size={30} />
                </i>
              </div>
            </div>
          </div>
          <div className="row">
            <h4>Item Description</h4>
            <div className="description">
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
          </div>
          <div className="row columns">
            <div className="col-half">
              <h4>Full Price</h4>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="1000000"
                  value={fullPrice}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="col-half">
              <h4>Collected</h4>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="100"
                  value={collected}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="btn-container">
              <button type="submit">
                {t("submit")}
                {loading && <div className="loader"></div>}
              </button>
              <DeleteButton onClick={deleteItem} className="item" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemEdit;
