import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact, updateContact } from "../store";
import { getAnimeAvatar, saveAvatarLocally } from "../utils/animeAvatar";
import "./AddContacts.css";

const emptyForm = { name: "", email: "", phone: "", address: "", gender: "male" };

const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(emptyForm);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const found = store.contacts.find((c) => c.id === parseInt(id));
      if (found) setForm(found);
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingAvatar(true);

    const avatar = await getAnimeAvatar(form.gender);

    const { name, email, phone, address } = form;
    const success = isEditing
      ? await updateContact(dispatch, parseInt(id), { name, email, phone, address })
      : await createContact(dispatch, { name, email, phone, address });

    setLoadingAvatar(false);

    if (success) {
      if (avatar) {
        const contacts = await fetch("https://playground.4geeks.com/contact/agendas/mi-agenda/contacts")
          .then(r => r.json())
          .then(d => d.contacts);

        const match = isEditing
          ? { id: parseInt(id) }
          : contacts[contacts.length - 1];

        if (match) saveAvatarLocally(match.id, avatar);
      }
      navigate("/");
    } else {
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="add-container">
      <div className="add-card">
        <h2 className="add-title">
          {isEditing ? "Edit" : "Add a new"} <span>contact</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" type="text" name="name"
              placeholder="Full Name" value={form.name}
              onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" name="email"
              placeholder="Enter email" value={form.email}
              onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-input" type="text" name="phone"
              placeholder="Enter phone" value={form.phone}
              onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input className="form-input" type="text" name="address"
              placeholder="Enter address" value={form.address}
              onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <div className="gender-selector">
              <button
                type="button"
                className={`gender-btn ${form.gender === "male" ? "active" : ""}`}
                onClick={() => setForm({ ...form, gender: "male" })}
              >
                ♂ Male
              </button>
              <button
                type="button"
                className={`gender-btn ${form.gender === "female" ? "active" : ""}`}
                onClick={() => setForm({ ...form, gender: "female" })}
              >
                ♀ Female
              </button>
            </div>
          </div>

          <button type="submit" className="btn-save" disabled={loadingAvatar}>
            {loadingAvatar ? "Getting avatar..." : isEditing ? "Update contact" : "Save contact"}
          </button>
        </form>
        <span className="back-link" onClick={() => navigate("/")}>
          or get back to contacts
        </span>
      </div>
    </div>
  );
};

export default AddContact;