import { useState } from "react";
import LoginModal from "./LoginModal";
import { NavLink } from "react-router-dom";

const Header = ({ toggleModalShow, showModal }) => {
  const [burgerAnimation, setBurgerAnimation] = useState(false);

  // for showing login/sign up modal
  const showModalButton = () => {
    toggleModalShow();
  };

  const handleBurgerAnimation = () => {
    setBurgerAnimation(!burgerAnimation);
  };

  const burgerListItemAnimation = burgerAnimation
    ? "header__item--animation"
    : "";
  const burgerIconAnimation = burgerAnimation
    ? "header__burger-line--animation"
    : "";

  return (
    <header className="header">
      <LoginModal toggleModalShow={toggleModalShow} showModal={showModal} />
      <NavLink className="header__logo" to="/">
        mook
      </NavLink>
      <ul
        className={`header__list ${
          burgerAnimation ? "header__list--responsive" : ""
        }`}
      >
        <li className={`header__item  ${burgerListItemAnimation}`}>
          <NavLink className="header__link" to="/">
            <span className="header__text">Home</span>
          </NavLink>
        </li>
        <li className={`header__item  ${burgerListItemAnimation}`}>
          <NavLink className="header__link" to="/games">
            <span className="header__text">Games</span>
          </NavLink>
        </li>
        <li className={`header__item  ${burgerListItemAnimation}`}>
          <NavLink
            className="header__text header__login"
            onClick={showModalButton}
            to="/"
          >
            Join the team
          </NavLink>
        </li>
      </ul>
      <div
        className={`header__burger ${burgerIconAnimation}`}
        onClick={handleBurgerAnimation}
      >
        <div className={"header__burger-line header__burger-line--1"}></div>
        <div className={"header__burger-line header__burger-line--2"}></div>
        <div className={"header__burger-line header__burger-line--3"}></div>
      </div>
    </header>
  );
};

export default Header;
