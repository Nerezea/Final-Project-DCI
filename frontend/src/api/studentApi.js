import myAxios from "./api";

export const StudentsApi = {
  getStudents(classId) {
    return myAxios.get("/student", { params: { class: classId } });
  },
  getStudentById(id) {
    return myAxios.get(`/student/${id}`);
  },
  addStudent(body) {
    return myAxios.post("/student", body);
  },
  deleteStudent(id) {
    return myAxios.delete(`/student/${id}`);
  },
  updateStudent(id, body) {
    return myAxios.put(`/student/${id}`, body);
  },
};
