import { useState, useEffect, useCallback } from "react";
import LoginModal from "./LoginModal";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout, userRefreshAccessToken } from "../Features/User/userSlice";
import decode from "jwt-decode";
import LoginService from "../Services/Login.service";

const Header = ({ toggleModalShow, showModal }) => {
  const [burgerAnimation, setBurgerAnimation] = useState(false);
  const [user, setUser] = useState();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = LoginService.userId();

  // for showing login/sign up modal
  const showModalButton = () => {
    toggleModalShow();
  };

  const handleBurgerAnimation = () => {
    setBurgerAnimation(!burgerAnimation);
  };

  const handleLogout = async (id) => {
    await dispatch(userLogout({ id, navigate, dispatch }));
    setUser(null);
  };

  const burgerListItemAnimation = burgerAnimation
    ? "header__item--animation"
    : "";
  const burgerIconAnimation = burgerAnimation
    ? "header__burger-line--animation"
    : "";

  const guestHeader = (
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
        <NavLink className="header__link" to="/">
          <span className="header__text">Jobs</span>
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
  );

  const userHeader = (
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
        <NavLink className="header__link" to="/account">
          <span className="header__text">Account</span>
        </NavLink>
      </li>
      <li className={`header__item  ${burgerListItemAnimation}`}>
        <NavLink
          className="header__text header__logout"
          to="/"
          onClick={() => handleLogout(userId)}
        >
          Logout
        </NavLink>
      </li>
    </ul>
  );

  const renewAccessToken = useCallback(
    
    async (id) => {
      await dispatch(userRefreshAccessToken({ id }));
      setUser(JSON.parse(localStorage.getItem("user")));
    },
    [dispatch]
  );

  useEffect(() => {
    if (localStorage.getItem("user") && !user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    const interval = setInterval(() => {
      const accessToken = user?.accessToken;

      if (accessToken) {
        const decodedAccessToken = decode(accessToken);

        if (decodedAccessToken.exp * 1000 < new Date().getTime()) {
          renewAccessToken(userId)
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [location, user, renewAccessToken, userId ]);

  return (
    <header className="header">
      <LoginModal toggleModalShow={toggleModalShow} showModal={showModal} />
      <NavLink className="header__logo" to="/">
        moo<span>k</span>
      </NavLink>
      {user ? userHeader : guestHeader}
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
