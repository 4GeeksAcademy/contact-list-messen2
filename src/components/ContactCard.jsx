import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { deleteContact } from "../store";
import { getLocalAvatar } from "../utils/animeAvatar";
import "./ContactCard.css";

const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const avatar = getLocalAvatar(contact.id) || "https://i.pravatar.cc/80";

  const handleDelete = async () => {
    await deleteContact(dispatch, contact.id);
    setShowModal(false);
  };

  return (
    <>
      <div className="contact-card">
        <img
          src={avatar}
          alt={contact.name}
          className="contact-avatar"
        />
        <div className="contact-info">
          <p className="contact-name">{contact.name}</p>
          <p className="contact-detail"><i className="fas fa-map-marker-alt"></i> {contact.address}</p>
          <p className="contact-detail"><i className="fas fa-phone"></i> {contact.phone}</p>
          <p className="contact-detail"><i className="fas fa-envelope"></i> {contact.email}</p>
        </div>
        <div className="contact-actions">
          <button className="btn-edit" onClick={() => navigate(`/edit/${contact.id}`)}>
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button className="btn-delete" onClick={() => setShowModal(true)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-glass">
            <p className="modal-title">Confirm Delete</p>
            <p className="modal-text">
              Are you sure you want to delete <strong>{contact.name}</strong>?
            </p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-confirm-delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactCard;