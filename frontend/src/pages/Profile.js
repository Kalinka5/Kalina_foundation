import React, { createContext, useEffect, useState } from "react";

import api from "../api";

import Header from "../components/Header";
import DeleteButton from "../components/profile/DeleteButton";
import DeleteUserModal from "../components/profile/DeleteUserModal";
import ProfileImage from "../components/profile/ProfileImage";
import UsernameField from "../components/profile/UsernameField";
import EmailField from "../components/profile/EmailField";
import FirstnameField from "../components/profile/FirstnameField";
import LastnameField from "../components/profile/LastnameField";
import UpdateButton from "../components/profile/UpdateButton";

import "../styles/profile/profile.css";

export const ProfileContext = createContext([{}]);

function Profile(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [image_url, setImageURL] = useState("");

  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const links = props.links;

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
    <div className="profile header-body">
      <Header links={links} fixed={false} />
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
          <div className="profile-card" id="profileCard">
            <form onSubmit={handleSubmit}>
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
        </div>
        {isOpen && <DeleteUserModal setIsOpen={setIsOpen} />}
      </ProfileContext.Provider>
    </div>
  );
}

export default Profile;
