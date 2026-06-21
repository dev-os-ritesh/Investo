/**
 * Home.js - Authentication Gate & App Shell
 *
 * This is the first React component that loads after index.js.
 * Its primary job is to act as an AUTH GUARD: it checks whether the user
 * has a valid JWT token before rendering the actual dashboard UI.
 *
 * Auth Flow (on every page load/refresh):
 * 1. Check the URL for a "?token=..." parameter (set by the Frontend after login).
 *    - If found: save token to localStorage and clear it from the URL (for security).
 * 2. Check localStorage for an existing token (user is already logged in).
 *    - If found: set isAuthenticated = true and render the dashboard.
 * 3. If neither found: redirect the user to the Frontend's /login page.
 *
 * Once authenticated, it renders the full layout:
 *   <GeneralContextProvider> - wraps everything in the global state provider
 *     <TopBar />             - the live market indices bar + navigation menu
 *     <Dashboard />          - the main content area with route-based views
 *   </GeneralContextProvider>
 */
import React, { useEffect, useState } from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { GeneralContextProvider } from "./GeneralContext";

const Home = () => {
  // Tracks whether the user has passed the auth check
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Step 1: Check if token was passed in URL query params (redirect from login page)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (tokenFromUrl) {
      // Save the token to localStorage for future requests
      localStorage.setItem("token", tokenFromUrl);
      // Clean the token from the URL to avoid accidental sharing/leaking
      window.history.replaceState({}, document.title, window.location.pathname);
      setIsAuthenticated(true);
    } else if (localStorage.getItem("token")) {
      // Step 2: Token already exists in storage (returning user)
      setIsAuthenticated(true);
    } else {
      // Step 3: No token found anywhere - redirect to the login page
      const frontendUrl = process.env.REACT_APP_FRONTEND_URL || `http://localhost:${window.location.port === "3000" ? "3001" : "3000"}`;
      window.location.href = `${frontendUrl}/login`;
    }
  }, []);

  // Show a loading state while the auth check is happening
  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  // Authenticated: render the full dashboard wrapped in the global context provider
  return (
    <GeneralContextProvider>
      <TopBar />
      <Dashboard />
    </GeneralContextProvider>
  );
};

export default Home;