import React from "react";
import { Navigate } from "react-router-dom";
import Customers from "./Components/Customers";
import Movies from "./Components/Movie/Movies";
import NewRentals from "./Components/NewRentals";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Unauthorized from "./Components/Unauthorized";
import NoPage from "./Components/NoPage";
// import RequireAuth from "./Components/RequireAuth";
import { Routes, Route } from "react-router-dom";

function App() {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const isAdmin = window.localStorage.getItem("isAdmin");
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* private routes */}
        <Route
          path="/movies"
          element={
            isLoggedIn === "true" ? <Movies /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/newrentals"
          element={
            isLoggedIn === "true" ? <NewRentals /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/customers"
          element={
            isLoggedIn === "true" ? (
              isAdmin === "true" ? (
                <Customers />
              ) : (
                <Navigate to="/unauthorized" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* catch all*/}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
}

export default App;
