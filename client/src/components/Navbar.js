import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Navbar() {
  const { user, logout } = useUser();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          App
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {user && user.roleId === "1" && (
              <li className="nav-item">
                <Link className="nav-link" to="/nurse">
                  Nurse Dashboard
                </Link>
              </li>
            )}
            {user && user.roleId === "2" && (
              <li className="nav-item">
                <Link className="nav-link" to="/patient">
                  Patient Dashboard
                </Link>
              </li>
            )}
            {user && user.roleId === "2" && (
              <li className="nav-item">
                <Link className="nav-link" to="/symptomChecker">
                  Symptom Checker
                </Link>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="">
                  Hello, {user.firstName}
                </Link>
              </li>
            )}
            {user ? (
              <li className="nav-item">
                <button onClick={logout} className="btn btn-link nav-link">
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
