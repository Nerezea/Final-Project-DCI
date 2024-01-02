import myAxios from "./api";

export const SickRestApi = {
  getSickRests() {
    return myAxios.get("/sickRest");
  },
  createSickRest(body) {
    return myAxios.post("/sickRest", body);
  },
  deleteSickRest(id) {
    return myAxios.delete(`/sickRest/${id}`);
  },
};
