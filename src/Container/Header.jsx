import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = ({ toggleModalShow }) => {

  const [showList, setShowList ] = useState(false);

  const showModal = () => {
    toggleModalShow();
  };

  const showResponsiveList = () => {
    setShowList(!showList)
  }

  return (
    <header className={"header"}>
      <p className="header__logo">mook</p>
      <ul className={`header__list ${showList ? "header__list--responsive" : ""}`}>
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
          <span className="header__text header__login" onClick={showModal}>
            Join the team
          </span>
        </li>
      </ul>
      <GiHamburgerMenu className="header__hamburger" onClick={showResponsiveList}/>
    </header>
  );
};

export default Header;
