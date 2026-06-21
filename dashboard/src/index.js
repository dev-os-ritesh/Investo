/**
 * Dashboard App - Entry Point (dashboard/src/index.js)
 *
 * This is the React entry point for the DASHBOARD application (runs on port 3000).
 * It is a separate React app from the Frontend (the public landing/auth site on port 3001).
 *
 * Application Flow:
 * 1. User logs in from the Frontend app (port 3001).
 * 2. The Frontend redirects the user to this Dashboard app with a JWT token in the URL (?token=...).
 * 3. The Home component (loaded at "/*") picks up that token, saves it to localStorage,
 *    and renders the full dashboard UI.
 * 4. All subsequent API calls to the Backend (port 3002) automatically include that JWT
 *    token via the Axios interceptor set up below.
 *
 * Component Tree:
 *   index.js -> Home.js -> GeneralContextProvider (state) + TopBar + Dashboard
 *                                                                     -> WatchList + (Routes -> Summary/Orders/Holdings/etc.)
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./index.css";
import Home from "./components/Home";

/**
 * Axios Request Interceptor
 * This runs before EVERY axios API call made in the entire dashboard app.
 * It automatically reads the JWT token from localStorage and injects it into
 * the Authorization header so all API calls to the backend are authenticated.
 * Without this, all protected routes like /allHoldings would return 401 Unauthorized.
 */
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Mount the React app into the <div id="root"> in public/index.html
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* All routes are handled inside the Home component */}
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

