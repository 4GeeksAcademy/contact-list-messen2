import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import AddContact from "./pages/AddContacts";   // ← NUEVO

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        <Route path="/" element={<Home />} />
        <Route path="/single/:theId" element={<Single />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/add" element={<AddContact />} />          {/* ← NUEVO */}
        <Route path="/edit/:id" element={<AddContact />} />     {/* ← NUEVO */}

      </Route>
    )
);