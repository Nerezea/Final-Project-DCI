import myAxios from "./api";

export const EventApi = {
  getEvents(startDate, endDate) {
    return myAxios.get("/events", { params: { startDate, endDate } });
  },
  getEvent(id) {
    return myAxios.get(`/events/${id}`);
  },
  createEvent(body) {
    return myAxios.post("/events", body);
  },
  deleteEvent(id) {
    return myAxios.delete(`/events/${id}`);
  },
  updateEvent(id, body) {
    return myAxios.put(`/events/${id}`, body);
  },
};
