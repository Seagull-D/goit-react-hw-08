import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const AuthNav = () => {
  return (
    <ul className={s.headerNavLis}>
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
  );
};

export default AuthNav;
