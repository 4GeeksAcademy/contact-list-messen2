const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA = "mi-agenda";

export const initialStore = () => {
  return {
    contacts: [],
    loading: false,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "set_loading":
      return { ...store, loading: action.payload };

    case "set_contacts":
      return { ...store, contacts: action.payload };

    default:
      throw Error("Unknown action: " + action.type);
  }
}

// ── ACTIONS (funciones async que usan dispatch) ──────────────────────────

export const getContacts = async (dispatch) => {
  dispatch({ type: "set_loading", payload: true });
  try {
    const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`);
    if (resp.status === 404) {
      // La agenda no existe, la creamos
      await fetch(`${BASE_URL}/agendas/${AGENDA}`, { method: "POST" });
      dispatch({ type: "set_contacts", payload: [] });
      return;
    }
    const data = await resp.json();
    dispatch({ type: "set_contacts", payload: data.contacts || [] });
  } catch (err) {
    console.error("Error al cargar contactos:", err);
  } finally {
    dispatch({ type: "set_loading", payload: false });
  }
};

export const createContact = async (dispatch, contactData) => {
  const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  });
  if (resp.ok) await getContacts(dispatch);
  return resp.ok;
};

export const updateContact = async (dispatch, id, contactData) => {
  const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  });
  if (resp.ok) await getContacts(dispatch);
  return resp.ok;
};

export const deleteContact = async (dispatch, id) => {
  const resp = await fetch(`${BASE_URL}/agendas/${AGENDA}/contacts/${id}`, {
    method: "DELETE",
  });
  if (resp.ok) await getContacts(dispatch);
  return resp.ok;
};

