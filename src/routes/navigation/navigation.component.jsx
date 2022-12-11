import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
function Navigation() {
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
          <Link className="nav__link" to="/auth">
            SIGN-IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}
export default Navigation;
