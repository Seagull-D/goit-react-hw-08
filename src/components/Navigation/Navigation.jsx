import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSelectors";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  const isLogin = useSelector(selectIsLoggedIn);
  return (
    <ul className={s.headerNavLis}>
      <li>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
      </li>
      {isLogin && (
        <li>
          <NavLink className={buildLinkClass} to="/contacts">
            Contacts
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default Navigation;
