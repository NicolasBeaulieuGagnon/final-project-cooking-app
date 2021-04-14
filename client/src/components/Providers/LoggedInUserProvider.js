import React, { createContext, useState, useEffect } from "react";

export const LoggedInUserContext = createContext(null);

export const LoggedInUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("logged in") === "true") {
      fetch(`/users/user/${localStorage.getItem("userId")}`).then((res) => {
        res.json().then((data) => {
          setLoggedInUser(data.data);
        });
      });
    }
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};
