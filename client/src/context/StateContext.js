import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [movies, setMovies] = useState([]);

  return (
    <Context.Provider value={{ movies, setMovies, setAuth, auth }} >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);