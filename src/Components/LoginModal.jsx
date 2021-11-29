import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { TiArrowRightThick, TiArrowLeftThick } from "react-icons/ti";
import { miniKratosBg, miniValhallaBg } from "../Utils/Helpers/Images.helpers";

import LoginModelInput from "./LoginModalInput";
import { errorResponse, handleError, userRegister } from "../Features/User/userSlice";

const LoginModal = ({ showModal, toggleModalShow }) => {
  const dispatch = useDispatch();
  const modalError = useSelector(errorResponse);

  const [cover, setCover] = useState(true);
  const initialRegisterForm = {
    email: "",
    password: "",
    repassword: "",
  };
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);

  const toggleCover = () => {
    setCover(!cover);
    dispatch(handleError(null));
  };

  const closeModal = () => {
    toggleModalShow();
    dispatch(handleError(null));

  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(userRegister({ registerForm, closeModal, dispatch }));
  };

  return (
    <div className={`login-modal ${showModal ? "login-modal--show" : ""}`}>
      <div className="login-modal__container">
        <div
          className={`login-modal__cover ${
            cover ? "login-modal__cover--left" : "login-modal__cover--right"
          }`}
          style={{
            backgroundImage: `url(${cover ? miniKratosBg : miniValhallaBg})`,
          }}
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

          <form className="login-modal__form" onSubmit={handleRegister}>
            <LoginModelInput
              placeholder="E-mail"
              type="email"
              isRequired={true}
              className="login-modal__input"
              name="email"
              registerForm={registerForm}
              setRegisterForm={setRegisterForm}
            />
            <LoginModelInput
              placeholder="Password"
              type="password"
              isRequired={true}
              className="login-modal__input"
              name="password"
              registerForm={registerForm}
              setRegisterForm={setRegisterForm}
            />
            <LoginModelInput
              placeholder="Re-Password"
              type="password"
              isRequired={true}
              className="login-modal__input"
              name="repassword"
              registerForm={registerForm}
              setRegisterForm={setRegisterForm}
            />
            <button className="login-modal__form-button login-modal__form-button--register">
              REGISTER
            </button>
            <span className="login-modal__error">{modalError}</span>
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
            <LoginModelInput
              placeholder="E-mail"
              type="email"
              isRequired={true}
              className="login-modal__input"
            />
            <LoginModelInput
              placeholder="Password"
              type="password"
              isRequired={true}
              className="login-modal__input"
            />
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
