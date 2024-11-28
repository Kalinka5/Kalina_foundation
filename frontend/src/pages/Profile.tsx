import React, { useEffect, useState } from "react";

import { IoMdAt } from "react-icons/io";
import { FaAutoprefixer, FaAustralSign } from "react-icons/fa6";

import api from "../lib/api.js";

import Header from "../components/Header.tsx";
import DeleteButton from "../components/DeleteButton.tsx";
import DeleteUserModal from "../components/Profile/DeleteUserModal.tsx";
import UploadImage from "../components/UploadImage.tsx";
import UsernameField from "../components/Profile/UsernameField.tsx";
import InputField from "../components/Profile/InputField.tsx";
import UpdateButton from "../components/Profile/UpdateButton.tsx";

import { User } from "../lib/types.tsx";

import { useUserData } from "../lib/hooks.tsx";

import "../styles/profile/profile.css";

function Profile() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const auth = true;

  const user = useUserData(auth);

  useEffect(() => {
    if (user.data) {
      const userData = user.data as User;
      setUsername(userData.username);
      setEmail(userData.email);
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
      setImageURL(userData.image);
    }
  }, [user.data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    image && formData.append("image", image, image.name);
    console.log(formData);

    try {
      console.log("Start updating User's profile data");
      const response = await api("profile", {
        method: "PATCH",
        body: formData,
      });
      console.log("User profile was updated successfully:", response);
    } catch (error) {
      console.error("Error updating User's profile:", error);
      alert("Something went wrong when updating the user profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile header-body">
      <Header />

      <div className="profile-field main-body">
        <form className="profile-card" onSubmit={handleSubmit}>
          <div className="profile-header">
            <UploadImage
              imageUrl={imageUrl}
              setImage={setImage}
              setImageURL={setImageURL}
            />

            <UsernameField username={username} setUsername={setUsername} />

            <DeleteButton
              onClick={async () => setIsOpen(true)}
              className="profile"
            />
          </div>
          <div className="profile-details">
            <InputField
              value={email}
              onChange={setEmail}
              label="email"
              tLabel="e-mail"
              type="email"
              placeholder="e-mail-input"
              icon={<IoMdAt />}
            />

            <InputField
              value={firstName}
              onChange={setFirstName}
              label="firstname"
              tLabel="firstname"
              type="text"
              placeholder="firstname-input"
              icon={<FaAutoprefixer />}
            />

            <InputField
              value={lastName}
              onChange={setLastName}
              label="lastname"
              tLabel="lastname"
              type="text"
              placeholder="lastname-input"
              icon={<FaAustralSign />}
            />

            <UpdateButton loading={loading} />
          </div>
        </form>
      </div>
      {isOpen && <DeleteUserModal setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Profile;
