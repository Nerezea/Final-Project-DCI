import myAxios from "./api";

export const EventAgreementApi = {
  getUserAgreements(eventId) {
    return myAxios.get(`/eventAgreement/admin/${eventId}`);
  },
  getAgreementStatus(eventId) {
    return myAxios.get(`/eventAgreement/${eventId}`);
  },
  ImAgree(eventId) {
    return myAxios.post(`/eventAgreement/${eventId}`);
  },
  ImNotAgree(eventId) {
    return myAxios.delete(`/eventAgreement/${eventId}`);
  },
};
