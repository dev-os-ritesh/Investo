/**
 * Menu.js - Left Navigation Menu
 *
 * Renders the vertical navigation sidebar of the dashboard.
 * It reads from GeneralContext to display the logged-in user's details.
 *
 * Structure:
 * - Logo image at the top
 * - Navigation links: Dashboard, Orders, Holdings, Positions, Funds, Apps
 *   (each link highlights itself when its path matches the current URL via `useLocation`)
 * - Profile section at the bottom:
 *   - Shows a 2-letter avatar and the username derived from the user's email
 *   - Clicking the avatar toggles a dropdown showing the email and a Logout button
 */
import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import GeneralContext from "./GeneralContext";

const Menu = () => {
  const { userEmail, logout } = useContext(GeneralContext);
  const location = useLocation(); // Used to track the currently active URL path
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  /** Toggles the profile info dropdown on/off */
  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  /**
   * Returns the CSS class for a menu item.
   * If the given path matches the current URL, adds "selected" class for styling.
   * @param {string} path - The route path to check (e.g., "/orders")
   */
  const getMenuClass = (path) => {
    return location.pathname === path ? "menu selected" : "menu";
  };

  // Derive a display username from the email (e.g., "john@gmail.com" -> "JOHN")
  const username = userEmail ? userEmail.split("@")[0].toUpperCase() : "USER";
  // Use the first 2 characters as the avatar initials
  const avatar = username.substring(0, 2);

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/">
              <p className={getMenuClass("/")}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders">
              <p className={getMenuClass("/orders")}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings">
              <p className={getMenuClass("/holdings")}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions">
              <p className={getMenuClass("/positions")}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/funds">
              <p className={getMenuClass("/funds")}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/apps">
              <p className={getMenuClass("/apps")}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        {/* Profile Section - click avatar to toggle dropdown */}
        <div className="profile-wrapper">
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">{avatar}</div>
            <p className="username">{username}</p>
          </div>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <p className="label">Account</p>
              <p className="email">{userEmail}</p>
              <hr style={{ margin: "10px 0", borderTop: "1px solid #eee" }} />
              {/* Calls logout() from GeneralContext which clears the token and redirects */}
              <p className="logout-btn" onClick={logout}>
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;