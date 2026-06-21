import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import GeneralContext from "./GeneralContext";

const Menu = () => {
  const { userEmail, logout } = useContext(GeneralContext);
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const getMenuClass = (path) => {
    return location.pathname === path ? "menu selected" : "menu";
  };

  const username = userEmail ? userEmail.split("@")[0].toUpperCase() : "USER";
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