const isLoggedIn = () => {
  const isLogin = JSON.parse(localStorage.getItem("user"));
  return isLogin;
};

export default isLoggedIn;
