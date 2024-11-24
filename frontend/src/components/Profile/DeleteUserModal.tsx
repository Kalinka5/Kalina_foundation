import React from "react";

import { useNavigate } from "react-router-dom";

import { RiCloseLine } from "react-icons/ri";

import { useTranslation } from "react-i18next";

import api from "../../lib/api";

import { LOGIN_PAGE } from "../../lib/constants";

import { DeleteUserModalProps } from "../../lib/types";

import "../../styles/profile/modal.css";

const DeleteUserModal = ({ setIsOpen }: DeleteUserModalProps) => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const DeleteUser = async (e) => {
    e.preventDefault();
    try {
      setIsOpen(false);
      console.log("Start deleting User");
      await api("/profile", {
        method: "DELETE",
      });
      console.log("User was deleted successfully");
      localStorage.clear();
      navigate(LOGIN_PAGE);
      navigate(0); // Refresh page
    } catch (error) {
      alert(error);
      console.log("Something go wrong when deleting user profile!");
    }
  };

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">{t("confirmation")}</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine />
          </button>
          <div className="modalContent">{t("are-you-sure")}</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" onClick={DeleteUser}>
                {t("delete-button")}
              </button>
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteUserModal;
