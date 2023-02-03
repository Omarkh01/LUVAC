import React, { createContext, useContext, useState } from 'react';

const Context = createContext(" ");

export const StateContext = ({ children }) => {
  const [success, setSuccess] = useState(false);
  const [auth, setAuth] = useState({});

  return (
    <Context.Provider value={{ setAuth, auth, success, setSuccess }} >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);