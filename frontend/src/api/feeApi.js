import myAxios from "./api";

export const FeedApi = {
  getFeeds(start, end) {
    return myAxios.get("/feed", { params: { start, end } });
  },
  getFeed(id) {
    return myAxios.get(`/feed/${id}`);
  },
  createFeed(body) {
    return myAxios.post("/feed", body);
  },
  deleteFeed(id) {
    return myAxios.delete(`/feed/${id}`);
  },
  updateFeed(id, body) {
    return myAxios.put(`/feed/${id}`, body);
  },
};
