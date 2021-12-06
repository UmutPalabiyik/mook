import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    req.headers.authorization = `Bearer ${user.accessToken}`;
  }
  return req;
});

const LoginService = {
  signup: async (signupForm) => {
    return await API.post("/users/signup", signupForm);
  },
  signin: async (signinForm) => {
    return await API.post("/users/signin", signinForm);
  },
  logout: async (id) => {
    return await API.get(`/users/logout/${id}`);
  },
  refreshAccessToken: async (id) => {
    return await API.get(`users/refresh/${id}`);
  },
  userId: () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.user?._id;
    return userId;
  },
};

export default LoginService;
