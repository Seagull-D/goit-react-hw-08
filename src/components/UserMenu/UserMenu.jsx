import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/auth/authOperations";
import { selectUser } from "../../redux/auth/authSelectors";
import s from "./UserMenu.module.css";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className={s.userMenu}>
      <p className={s.userName}>Вітаю, {user.name}!</p>
      <button className={s.logoutBtn} onClick={() => handleLogout()}>
        Вийти
      </button>
    </div>
  );
};

export default UserMenu;
