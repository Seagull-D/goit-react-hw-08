import { NavLink } from "react-router-dom";
import s from "./AppBar.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const AppBar = () => {
  return (
    <header className={s.container}>
      <h2 className={s.headerName}>Contacts</h2>
      <nav>
        <ul className={s.headerNavLis}>
          <li>
            <NavLink className={buildLinkClass} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={buildLinkClass} to="/contacts">
              Contacts
            </NavLink>
          </li>
          <li>
            <NavLink className={buildLinkClass} to="/registration">
              Registration
            </NavLink>
          </li>
          <li>
            <NavLink className={buildLinkClass} to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppBar;
