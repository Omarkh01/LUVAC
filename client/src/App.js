import React, { Component } from 'react'
import Customers from "./Components/Customers";
import Movies from "./Components/Movies";
import NewRentals from "./Components/NewRentals";
import Home from './Components/Home';
import Login from "./Components/Login"
import Register from "./Components/Register";
import NavigationBar from './Components/NavigationBar';
import Unauthorized from "./Components/Unauthorized";
import NoPage from './Components/NoPage';
import RequireAuth from './Components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

class App extends Component {
    render() {
    return (
      <>
        <Routes>
            {/* public routes */}
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* private routes */}
            <Route element={<RequireAuth isAdmin={true} />}>
              <Route path="/customers" element={<Customers />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/newrentals" element={<NewRentals />} />
              <Route path="/movies" element={<Movies />} />
            </Route>

            {/* catch all*/}
            <Route path="*" element={<NoPage />} />
        </Routes>
      </>
    );
  }
}

export default App