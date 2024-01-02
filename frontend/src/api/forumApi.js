import myAxios from "./api";

export const ForumApi = {
  getMessages(forumType) {
    return myAxios.get("/forum/getForumMessages", { params: { forumType } });
  },
  createMessage(body, forumType) {
    return myAxios.post(`/forum/sendMessage`, body, {
      params: { forumType },
    });
  },
  deleteMessage(id) {
    return myAxios.delete(`/forum/deleteMessage/${id}`);
  },
};
