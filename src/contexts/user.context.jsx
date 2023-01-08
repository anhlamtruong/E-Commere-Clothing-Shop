import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase.utils.js";
import { createAction } from "../utils/reducer/reducer.utils.js";
//* Seeing this as user value you want to access, not function
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const INITIAL_STATE = {
  currentUser: null,
};

//function using reducer hooks
//param state, dispatched
const userReducer = (state, action) => {
  // console.log("dispatch");
  // console.log(action);
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

//*function The provider is a function return UserContext,
//*function wrap around the other components to provide access to UserContext
export const UserProvider = ({ children }) => {
  //*use a hooks to keep track on the currentuser
  // const [currentUser, setCurrentUser] = useState(null);

  //*use Reduction Methods
  //*initial state of user usingReducer
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  // console.log(currentUser);
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  // signOutUser();

  //*We want to mount this function 1 times only, to run the onAuthStateChangedListener once
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // console.log(user);
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

/*
    const userReducer=(state, action)=> {
      return {
        currentUser: 
      }
    }
*/
