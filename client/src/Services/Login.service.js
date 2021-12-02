import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

const LoginService = {
  register: async (registerData) => {
    return await API.post("/users/register", registerData);
  },
  logout: async (id) => {
    return await API.get(`/users/logout/${id}`);
  },
};

export default LoginService;
