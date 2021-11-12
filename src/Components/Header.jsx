import { useState } from 'react';
import LoginModal from '../Container/LoginModal';

const Header = ({ toggleModalShow, showModal }) => {

  const [burgerAnimation, setBurgerAnimation] = useState(false)

  // for showing login/sign up modal
  const showModalButton = () => {
    toggleModalShow();
  };

  const handleBurgerAnimation = () => {
      setBurgerAnimation(!burgerAnimation);
  };

  const burgerListItemAnimation = burgerAnimation ? "header__item--animation" : "";
  const burgerIconAnimation = burgerAnimation ? "header__burger-line--animation" : "";

  return (
    <header className={"header"}>
      <LoginModal toggleModalShow={toggleModalShow} showModal={showModal}/>
      <p className="header__logo">mook</p>
      <ul className={`header__list ${burgerAnimation ? "header__list--responsive" : ""}`}>
        <li className={`header__item  ${burgerListItemAnimation}`}>
          <a className="header__link" href="/">
            <span className="header__text">Home</span>
          </a>
        </li>
        <li className={`header__item  ${burgerListItemAnimation}`}>
          <a className="header__link" href="/">
            <span className="header__text">About</span>
          </a>
        </li>
        <li className={`header__item  ${burgerListItemAnimation}`}>
          <a className="header__link" href="/">
            <span className="header__text">Services</span>
          </a>
        </li>
        <li className={`header__item  ${burgerListItemAnimation}`}>
          <span className="header__text header__login" onClick={showModalButton}>
            Join the team
          </span>
        </li>
      </ul>
      <div className={`header__burger ${burgerIconAnimation}`} onClick={handleBurgerAnimation}>
        <div className={"header__burger-line header__burger-line--1"}></div>
        <div className={"header__burger-line header__burger-line--2"}></div>
        <div className={"header__burger-line header__burger-line--3"}></div>
      </div>
    </header>
  );
};

export default Header;

