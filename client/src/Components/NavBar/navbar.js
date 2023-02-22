import React, { useState, useEffect } from 'react';
import './navbar.css'

function NavigationBar() {
  const [log, setLog] = useState("Login");
  const [loggedIn, setLoggedIn] = useState(false);

  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn) {
      setLoggedIn(true);
      setLog("Logout");
    }
    else {
      setLog("Login");
      setLoggedIn(false);
      // window.localStorage.clear();
    }
  }, [isLoggedIn, setLoggedIn])

  const handleLogBtn = () => {

    if (isLoggedIn) {
      window.localStorage.clear();
      setLoggedIn(false);
    }
    else {
      window.location.href = "/login";
    }
  };

  return (
    <nav className="nav-bar">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a href="/" className="nav-link">
            Movies
          </a>
        </li>
        <li className="nav-item">
          <a href="/newrentals" className="nav-link">
            New Rentals
          </a>
        </li>
        <li className="nav-item">
          <a href="/customers" className="nav-link">
            Customers
          </a>
        </li>
      </ul>
      <button
        onClick={handleLogBtn}
        className="btn btn-outline-dark"
      >
        {loggedIn ? "Logout" : "Login" }
      </button>
    </nav>
  );
}

export default NavigationBar;
