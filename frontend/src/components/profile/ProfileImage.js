import React, { useContext } from "react";

import { IoIosImage } from "react-icons/io";

import { useTranslation } from "react-i18next";

import { ProfileContext } from "../../pages/Profile.tsx";

import "../../styles/profile/profileImage.css";

function ProfileImage() {
  const { image_url, setImage, setImageURL } = useContext(ProfileContext);

  const { t } = useTranslation();

  function getFile(event) {
    console.log(`A Profile image name is ${event.target.files[0]}`);
    setImage(event.target.files[0]);
    setImageURL(URL.createObjectURL(event.target.files[0]));
    console.log("The new image was set successfully!");
  }

  return (
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
          <h2>{t("upload-image")}</h2>
        </div>
      </label>
    </div>
  );
}

export default ProfileImage;
