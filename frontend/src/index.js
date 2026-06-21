/**
 * Frontend App - Entry Point (frontend/src/index.js)
 *
 * This is the React entry point for the FRONTEND (public) application (runs on port 3001).
 * It is a completely separate React app from the Dashboard (port 3000).
 *
 * Purpose:
 * This app serves all the public-facing pages that users see BEFORE they log in.
 * It handles the marketing/landing pages, user registration, and login.
 * After a successful login, this app redirects the user to the Dashboard app.
 *
 * Route Map (all routes share the same <Navbar /> at the top and <Footer /> at the bottom):
 *   /           -> <HomePage />    - The main landing/marketing page
 *   /signup     -> <Signup />      - New user registration form
 *   /login      -> <Loginpage />   - User login form (redirects to dashboard on success)
 *   /about      -> <AboutPage />   - Company/app information page
 *   /product    -> <ProductsPage />- Products & features overview
 *   /pricing    -> <PricingPage /> - Pricing and plans page
 *   /support    -> <SupportPage /> - Help and support page
 *   /*          -> <NotFound />    - 404 catch-all for invalid routes
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Page components for each route
import HomePage from "./landing_page/home/Homepage";
import Signup from "./landing_page/signup/Signup";
import AboutPage from "./landing_page/about/AboutPage";
import ProductsPage from "./landing_page/product/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import Loginpage from "./landing_page/login/Login";

import NotFound from "./landing_page/NotFound";
// Navbar and Footer wrap all routes (rendered once, persistent across all pages)
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";

// Mount the React app into the <div id="root"> in public/index.html
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar /> {/* Top navigation bar - always visible */}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Loginpage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product" element={<ProductsPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="*" element={<NotFound />} /> {/* Catch-all 404 */}
    </Routes>
    <Footer /> {/* Bottom footer - always visible */}
  </BrowserRouter>
);