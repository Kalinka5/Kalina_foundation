import React, { createContext, useEffect, useState } from "react";

import api from "../lib/api.js";

import Header from "../components/Header.tsx";
import DeleteButton from "../components/profile/DeleteButton.js";
import DeleteUserModal from "../components/profile/DeleteUserModal.js";
import ProfileImage from "../components/profile/ProfileImage.js";
import UsernameField from "../components/profile/UsernameField.js";
import EmailField from "../components/profile/EmailField.js";
import FirstnameField from "../components/profile/FirstnameField.js";
import LastnameField from "../components/profile/LastnameField.js";
import UpdateButton from "../components/profile/UpdateButton.js";

import "../styles/profile/profile.css";

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

function Profile() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [image_url, setImageURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      setImageURL(res.data.image);
    } catch (err) {
      alert(err);
      console.log(
        "Something go wrong when sending backend request to /profile"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="profile header-body">
      <Header />
      <ProfileContext.Provider
        value={{
          isOpen,
          setIsOpen,
          loading,
          image_url,
          setImage,
          setImageURL,
          username,
          setUsername,
          email,
          setEmail,
          first_name,
          setFirstName,
          last_name,
          setLastName,
        }}
      >
        <div className="profile-field main-body">
          <form className="profile-card" onSubmit={handleSubmit}>
            <div className="profile-header">
              <ProfileImage />

              <UsernameField />

              <DeleteButton />
            </div>
            <div className="profile-details">
              <EmailField />

              <FirstnameField />

              <LastnameField />

              <UpdateButton />
            </div>
          </form>
        </div>
        {isOpen && <DeleteUserModal setIsOpen={setIsOpen} />}
      </ProfileContext.Provider>
    </div>
  );
}

export default Profile;
