import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getContacts } from "../store";
import ContactCard from "../components/ContactCard";
import "./Home.css";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    getContacts(dispatch);
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">My <span>Contacts</span></h1>
        <button className="nav-btn" onClick={() => navigate("/add")}>
          + Add new contact
        </button>
      </div>

      {store.loading && <p className="home-loading">Loading...</p>}

      {!store.loading && store.contacts.length === 0 && (
        <p className="home-empty">No contacts yet. Add one!</p>
      )}

      {store.contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};