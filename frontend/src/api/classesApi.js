import myAxios from "./api";

export const ClassesApi = {
  getClasses() {
    return myAxios.get("/class");
  },
  getClassById(id) {
    return myAxios.get(`/class/${id}`);
  },
  addClass(body) {
    return myAxios.post("/class", body);
  },
  deleteClass(id) {
    return myAxios.delete(`/class/${id}`);
  },
  updateClass(id, body) {
    return myAxios.put(`/class/${id}`, body);
  },
};
