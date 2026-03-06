import api from "./api";

export const updateUserProfile = (data) => {
  return api.patch("/users/update-account", data);
};

export const updateAvatar = (data) => {
  return api.patch("/users/avatar", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCoverImage = (data) => {
  return api.patch("/users/cover-image", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const changePassword = (data) => {
  return api.post("/users/change-password", data);
};

export const getUserChannelProfile = (username) => {
  return api.get(`/users/c/${username}`);
};

export const getWatchHistory = () => {
  return api.get("/users/history");
};
