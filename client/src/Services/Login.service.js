import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

const LoginService = {
  signup: async (signupForm) => {
    return await API.post('/users/signup', signupForm);
  },
  signin: async (signinForm) => {
    return await API.post('/users/signin', signinForm);
  }
  ,
  logout: async (id) => {
    return await API.get(`/users/logout/${id}`);
  },

};

export default LoginService;
