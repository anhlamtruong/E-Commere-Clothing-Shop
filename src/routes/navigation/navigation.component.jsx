import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.coponent";

import { UserContext } from "../../contexts/user.context";
import { DropdownContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils.js";

import "./navigation.styles.scss";

function Navigation() {
  //important : always use the use Context hook to rerender base on the currenUser who is logging in
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(DropdownContext);
  //function : that handler the sign out asynchronously
  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // };

  return (
    <Fragment>
      <div className="nav">
        <Link className="nav__logo" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav__links-container">
          <Link className="nav__link" to="/shop">
            SHOP
          </Link>
          <CartIcon />
          {isCartOpen && <CartDropdown />}
          {
            //* If there is a currentUser from the userContext
            //* render SIGN OUT lINK, else render SIGN-IN LINK
            currentUser ? (
              <span className="nav__link" onClick={signOutUser}>
                SIGN OUT
              </span>
            ) : (
              <Link className="nav__link" to="/auth">
                SIGN-IN
              </Link>
            )
          }
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}
export default Navigation;
