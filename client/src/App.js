import React from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Customers from "./pages/Customers";
import Home from "./pages/Home";
import NewRentals from "./pages/NewRentals";
import MovieDetail from "./pages/movieDetail/movieDetail";
import Login from "./pages/Login/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import NoPage from "./pages/NoPage";
// import RequireAuth from "./Components/RequireAuth";

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
        <Route path="/newrentals" element={<NewRentals />} />
        <Route path="/movies/:id" element={<MovieDetail />}></Route>

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
