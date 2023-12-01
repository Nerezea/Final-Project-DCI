import api from "./api";

export const TeachersApi = {
  getTeachers() {
    return api.get("/manageTeacher");
  },
  addTeacher(body) {
    return api.post("/manageTeacher",body);
  },
};
