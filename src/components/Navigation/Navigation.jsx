import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

function Navigation() {
  const buildNavLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div className={css.navContainer}>
      <nav className={css.nav}>
        <NavLink to="/" className={buildNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildNavLinkClass}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
}

export default Navigation;
