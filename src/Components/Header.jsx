import "../Styles/main.scss";

const Header = () => {
  return (
    <header className="header">
        <p className="header__logo">mook</p>
      <ul className="header__list">
        <li className="header__item">
          <a className="header__link" href="/">
            <span className="header__text">About</span>
          </a>
        </li>
        <li className="header__item">
          <a className="header__link" href="/">
            <span className="header__text">Contact</span>
          </a>
        </li>
        <li className="header__item">
            <span className="header__text header__login">Sign Up / Login</span>
        </li>
      </ul>
    </header>
  );
};

export default Header;
