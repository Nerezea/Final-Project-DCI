import api from "./api";

export const AuthApi = {
  login(email, password) {
    return api.post("/auth/login", {
      email,
      password,
    });
  },
  studentRegister(body) {
    return api.post("/auth/studentRegister", body);
  },
  getUserDetail(id) {
    return api.post("/auth/getUserDetail/" + id);
  },
  editProfile(body) {
    return api.put("/auth/editProfile", body);
  },
  getProfile() {
    return api.get("/auth/profile")
  },
  changePassword(oldPassword,newPassword) {
    return api.put("/auth/changePassword",{oldPassword,newPassword})
  }
};
