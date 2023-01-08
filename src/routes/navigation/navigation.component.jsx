import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.coponent";

// import { UserContext } from "../../contexts/user.context";
import { DropdownContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase.utils.js";

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from "./navigation.styles.jsx";

function Navigation() {
  //important : always use the use Context hook to rerender base on the currenUser who is logging in
  // const { currentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(DropdownContext);
  //function : that handler the sign out asynchronously
  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          <CartIcon />
          {isCartOpen && <CartDropdown />}
          {
            //* If there is a currentUser from the userContext
            //* render SIGN OUT lINK, else render SIGN-IN LINK
            currentUser ? (
              <NavLink as="span" onClick={signOutUser}>
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to="/auth">SIGN-IN</NavLink>
            )
          }
        </NavLinks>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}
export default Navigation;
