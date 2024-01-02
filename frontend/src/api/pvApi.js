import myAxios from "./api";

export const PvApi = {
  getMessages(receiverId) {
    return myAxios.get("/pv/getMessages/"+receiverId);
  },
  createMessage(body) {
    return myAxios.post(`/pv/sendMessage`, body);
  },
  deleteMessage(id) {
    return myAxios.delete(`/pv/deleteMessage/${id}`);
  },
};
