import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { TiArrowRightThick, TiArrowLeftThick } from "react-icons/ti";
import { miniKratosBg, miniValhallaBg } from "../Utils/Helpers/Images.helpers";
import { useNavigate } from "react-router";
import LoginService from "../Services/Login.service";
import { CirclesLoader } from "./Loaders"

import LoginModelInput from "./LoginModalInput";
import {
  errorResponse,
  handleError,
  userSubmit,
  status
} from "../Features/User/userSlice";

const LoginModal = ({ showModal, toggleModalShow }) => {
  const dispatch = useDispatch();
  const modalError = useSelector(errorResponse);
  const submitStatus = useSelector(status);
  const navigate = useNavigate();

  const [cover, setCover] = useState(submitStatus);
  const initialSignupForm = {
    email: "",
    password: "",
    repassword: "",
  };
  const initialSigninForm = {
    email: "",
    password: "",
  };


  const [signupForm, setSignupForm] = useState(initialSignupForm);
  const [signinForm, setSigninForm] = useState(initialSigninForm);

  const toggleCover = () => {
    setCover(!cover);
    dispatch(handleError(null));
    clearForm();
  };

  const closeModal = () => {
    toggleModalShow();
    dispatch(handleError(null));
    clearForm();
  };

  const clearForm = () => {
    setSignupForm(initialSignupForm);
    setSigninForm(initialSigninForm);
  };

  const handleSubmit = (e, submitFunc, submitForm) => {
    e.preventDefault();
    dispatch(
      userSubmit({
        submitFunc,
        submitForm,
        signinForm,
        closeModal,
        dispatch,
        navigate,
      })
    );
  };

  return (
    <div className={`login-modal ${showModal ? "login-modal--show" : ""}`}>
     {
       submitStatus === "loading" ? <CirclesLoader /> :  <div className="login-modal__container">
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
             <span className="login-modal__icon-text">To Login</span>
             <TiArrowRightThick className="login-modal__icon  login-modal__icon--right" />
           </div>
         </div>

         <form
           className="login-modal__form"
           onSubmit={(e) => handleSubmit(e, LoginService.signup, signupForm)}
         >
           <LoginModelInput
             placeholder="E-mail"
             type="email"
             isRequired={true}
             className="login-modal__input"
             name="email"
             formData={signupForm}
             setFormData={setSignupForm}
           />
           <LoginModelInput
             placeholder="Password"
             type="password"
             isRequired={true}
             className="login-modal__input"
             name="password"
             formData={signupForm}
             setFormData={setSignupForm}
           />
           <LoginModelInput
             placeholder="Re-Password"
             type="password"
             isRequired={true}
             className="login-modal__input"
             name="repassword"
             formData={signupForm}
             setFormData={setSignupForm}
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
             <span className="login-modal__icon-text">To Register</span>
           </div>
           <AiOutlineCloseCircle
             className="login-modal__icon login-modal__close"
             onClick={closeModal}
           />
         </div>

         <form
           className="login-modal__form"
           action=""
           onSubmit={(e) => handleSubmit(e, LoginService.signin, signinForm)}
         >
           <LoginModelInput
             placeholder="E-mail"
             type="email"
             isRequired={true}
             className="login-modal__input"
             name="email"
             formData={signinForm}
             setFormData={setSigninForm}
           />
           <LoginModelInput
             placeholder="Password"
             type="password"
             isRequired={true}
             className="login-modal__input"
             name="password"
             formData={signinForm}
             setFormData={setSigninForm}
           />
           <span className="login-modal__form-forget">Forget Password ?</span>
           <button className="login-modal__form-button login-modal__form-button--login">
             LOGIN
           </button>
           <span className="login-modal__error">{modalError}</span>
         </form>
       </div>
     </div>
     }
    </div>
  );
};

export default LoginModal;
