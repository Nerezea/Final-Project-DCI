import api from "./api";

export const AuthApi = {
  login(email, password) {
    return api.post("/auth/login", {
      email,
      password,
    });
  }
  
};


//test