import api from "./api";

export const getVideoComments = (videoId, page = 1, limit = 10) => {
  return api.get(`/comments/${videoId}?page=${page}&limit=${limit}`);
};

export const addComment = (videoId, data) => {
  return api.post(`/comments/${videoId}`, data);
};

export const updateComment = (commentId, data) => {
  return api.patch(`/comments/${commentId}`, data);
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};
