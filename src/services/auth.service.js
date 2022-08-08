import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const API_URL = "http://127.0.0.1:3000/api/v1/";

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response);

      if (response.status === 200) {
        const { token } = response.data.token;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setAuthToken(token);
      }
      else {        
        throw new Error(response.data.failure);
      }

    });
};

const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
  setAuthToken(false);
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
  }
  export default AuthService;