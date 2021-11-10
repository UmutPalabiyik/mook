import { useState } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { TiArrowRightThick, TiArrowLeftThick } from "react-icons/ti";
import {
  miniKratosBg,
  miniValhallaBg,
} from "../Utils/Helpers/Images.helpers";

const LoginModal = ({ showModal, toggleModalShow }) => {
  const [cover, setCover] = useState(true);

  const toggleCover = () => {
    setCover(!cover);
  };

  const closeModal = () => {
    toggleModalShow();
  };

  const LoginModelInput = ({ placeholder }) => {
    return <input placeholder={placeholder} className="login-modal__input" />;
  };

  return (
    <div className={`login-modal ${showModal ? "login-modal--show" : ""}`}>
      <div className="login-modal__container">
        <div
          className={`login-modal__cover ${
            cover ? "login-modal__cover--left" : "login-modal__cover--right"
          }`}
          style={{backgroundImage: `url(${cover ? miniKratosBg : miniValhallaBg})`}}
          onClick={toggleCover}
          alt="modal-cover"
        />
        <div className="login-modal__left">
          <div className="login-modal__header">
            <AiOutlineCloseCircle
              className="login-modal__icon login-modal__close"
              onClick={closeModal}
            />
            <div className="login-modal__icon-container" onClick={toggleCover}>
              <span className="login-modal__icon-text">Login</span>
              <TiArrowRightThick className="login-modal__icon  login-modal__icon--right" />
            </div>
          </div>

          <form className="login-modal__form" action="">
            <LoginModelInput placeholder="E-mail" />
            <LoginModelInput placeholder="Password" />
            <LoginModelInput placeholder="Re-Password" />
            <button className="login-modal__form-button login-modal__form-button--register">
              REGISTER
            </button>
          </form>
        </div>

        <div className="login-modal__right">
          <div className="login-modal__header">
            <div className="login-modal__icon-container" onClick={toggleCover}>
              <TiArrowLeftThick className="login-modal__icon  login-modal__icon--left" />
              <span className="login-modal__icon-text">Register</span>
            </div>
            <AiOutlineCloseCircle
              className="login-modal__icon login-modal__close"
              onClick={closeModal}
            />
          </div>

          <form className="login-modal__form" action="">
            <LoginModelInput placeholder="E-mail" />
            <LoginModelInput placeholder="Password" />
            <span className="login-modal__form-forget">Forget Password ?</span>
            <button className="login-modal__form-button login-modal__form-button--login">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
