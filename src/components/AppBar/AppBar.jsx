import s from "./AppBar.module.css";
import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSelectors";
import UserMenu from "../UserMenu/UserMenu";

const AppBar = () => {
  const isLogin = useSelector(selectIsLoggedIn);
  return (
    <header className={s.container}>
      <h2 className={s.headerName}>Contacts</h2>

      <nav className={s.navList}>
        <Navigation />
        {!isLogin ? <AuthNav /> : <UserMenu />}
      </nav>
    </header>
  );
};

export default AppBar;
