import React, { createContext, useState, useEffect } from "react";

export const LoggedInUserContext = createContext(null);

// provider for the logged in user and their cookbook if their is one.
export const LoggedInUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [updatingUser, setUpdatingUser] = useState(true);
  const [loggedInUserCookBook, setLoggedInUserCookBook] = useState({});
  console.log(loggedInUser);
  useEffect(() => {
    if (localStorage.getItem("logged in") === "true") {
      fetch(`/users/user/${localStorage.getItem("userId")}`).then((res) => {
        res.json().then((data) => {
          setLoggedInUser(data.data);

          if (data.data.hasCookBook === true) {
            fetch(`/cookbook/${data.data.cookBook}`).then((res) => {
              res.json().then((data) => {
                setLoggedInUserCookBook(data.data);
              });
            });
          }
        });
      });
    }
  }, [updatingUser]);

  return (
    <LoggedInUserContext.Provider
      value={{
        updatingUser,
        setUpdatingUser,
        loggedInUser,
        setLoggedInUser,
        loggedInUserCookBook,
        setLoggedInUserCookBook,
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
};
