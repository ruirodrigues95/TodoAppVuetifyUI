import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          axios.defaults.headers.common["x-access-token"] = response.data.token;
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem("user");
    delete axios.defaults.headers.common['x-access-token']
  }

  register(user) {
    return axios
      .post(API_URL + "register", {
        username: user.username,
        password: user.password,
      })
      .catch((e) => console.log(e));
  }
}

export default new AuthService()