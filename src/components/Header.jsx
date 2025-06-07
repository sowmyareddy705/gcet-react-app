// Header.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaBoxOpen, FaStore } from "react-icons/fa";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <header className="header">
      <div className="logo">
        <FaStore style={{ marginRight: "8px" }} />
        SKINCARE-STORE
      </div>
      <nav className="nav">
        <Link to="/">
          <FaHome style={{ marginRight: "5px" }} />
          Home
        </Link>
        <Link to="/cart">
          <FaShoppingCart style={{ marginRight: "5px" }} />
          Cart
        </Link>
        {user.token ? (
          <Link to="/logout">
            <FaSignOutAlt style={{ marginRight: "5px" }} />
            Logout
          </Link>
        ) : (
          <Link to="/login">
            <FaSignInAlt style={{ marginRight: "5px" }} />
            Login
          </Link>
        )}
        <Link to="/orders">
          <FaBoxOpen style={{ marginRight: "5px" }} />
          Orders
        </Link>
      </nav>
    </header>
  );
}
