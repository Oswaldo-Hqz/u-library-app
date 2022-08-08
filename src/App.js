import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardBorrowedBooks from "./components/BorrowedBooks";
import BorrowingsBoard from "./components/Borrowings";

const App = () => {
  const [showLibrarianBoard, setShowLibrarianBoard] = useState(false);
  const [showStudentBoard, setShowStudentBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowStudentBoard(user.role_name === "Student" ? true : false);
      setShowLibrarianBoard(user.role_name === "Librarian" ? true : false);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowLibrarianBoard(false);
    setShowStudentBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          <Link to={"/"} className="navbar-brand">
            U Library
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">

              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showLibrarianBoard && (
                <li className="nav-item">
                  <Link to={"/BoardBorrowedBooks"} className="nav-link">
                    Borrowed Books
                  </Link>
                </li>
              )}

              {showStudentBoard && (
                <li className="nav-item">
                  <Link to={"/borrowings"} className="nav-link">
                    borrowings
                  </Link>
                </li>
              )}

            </ul>
          </div>

          {currentUser ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.first_name + " profile"}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          )}

        </div>
      </nav>

      <div className="container mt-3">
        <div className="row">
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/borrowings" element={<BorrowingsBoard />} />
            <Route path="/librarian" element={<BoardBorrowedBooks />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
