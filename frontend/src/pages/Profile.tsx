import React, { createContext, useEffect, useState } from "react";

import { IoMdAt } from "react-icons/io";
import { FaAutoprefixer, FaAustralSign } from "react-icons/fa6";

import { useQuery } from "@tanstack/react-query";

import api from "../lib/api.js";

import Header from "../components/Header.tsx";
import DeleteButton from "../components/Profile/DeleteButton.js";
import DeleteUserModal from "../components/Profile/DeleteUserModal.tsx";
import ProfileImage from "../components/Profile/ProfileImage.js";
import UsernameField from "../components/Profile/UsernameField.js";
import InputField from "../components/Profile/InputField.tsx";
import UpdateButton from "../components/Profile/UpdateButton.js";

import { ProfileContextType, User } from "../lib/types.tsx";

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

  const getUser = async (): Promise<User | {}> => {
    try {
      console.log("Start to sending a request to backend /profile");
      const response = await api("/profile");
      console.log("The request was sending successfully!");
      return response as unknown as User;
    } catch (error) {
      console.error("Error fetching User data:", (error as Error).message);
      return {};
    }
  };

  const user = useQuery<User | {}>({
    queryKey: ["items"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (user.data && "username" in user.data) {
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
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    image && formData.append("image", image, image.name);
    console.log(formData);

    try {
      console.log("Start updating User's profile data");
      const response = await api("/profile", {
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
                value={first_name}
                onChange={setFirstName}
                label="firstname"
                tLabel="firstname"
                type="text"
                placeholder="firstname-input"
                icon={<FaAutoprefixer />}
              />

              <InputField
                value={last_name}
                onChange={setLastName}
                label="lastname"
                tLabel="lastname"
                type="text"
                placeholder="lastname-input"
                icon={<FaAustralSign />}
              />

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
