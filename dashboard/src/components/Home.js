import React, { useEffect, useState } from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { GeneralContextProvider } from "./GeneralContext";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.history.replaceState({}, document.title, window.location.pathname);
      setIsAuthenticated(true);
    } else if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    } else {
      const frontendUrl = process.env.REACT_APP_FRONTEND_URL || `http://localhost:${window.location.port === "3000" ? "3001" : "3000"}`;
      window.location.href = `${frontendUrl}/login`;
    }
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <GeneralContextProvider>
      <TopBar />
      <Dashboard />
    </GeneralContextProvider>
  );
};

export default Home;