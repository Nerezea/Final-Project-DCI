import myAxios from "./api";

export const TeachersApi = {
  getTeachers() {
    return myAxios.get("/manageTeacher");
  },
  getTeacherById(id) {
    return myAxios.get(`/manageTeacher/${id}`);
  },
  addTeacher(body) {
    return myAxios.post("/manageTeacher", body);
  },
  deleteTeacher(id) {
    return myAxios.delete(`/manageTeacher/${id}`);
  },
  updateTeacher(id, body) {
    return myAxios.put(`/manageTeacher/${id}`, body);
  },
};
