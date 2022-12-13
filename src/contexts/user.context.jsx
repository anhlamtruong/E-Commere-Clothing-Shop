import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils.js";
//* Seeing this as user value you want to access, not function
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//*function The provider is a function return UserContext,
//*function wrap around the other components to provide access to UserContext
export const UserProvider = ({ children }) => {
  //*use a hooks to keep track on the currentuser
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // signOutUser();

  //*We want to mount this function 1 times only, to run the onAuthStateChangedListener once
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
      if (user) {
        //* We don't know if the user is a new user or is already in db
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  //*This line happening because, we want to let children use both the currentuser andsetCurrentUser
  //*inside of the the UserContext
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
