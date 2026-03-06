import api from "./api";

export const toggleSubscribe = (channelId) => {
  return api.get(`/subscriptions/${channelId}`);
};

export const getSubscribedChannels = () => {
  return api.get("/subscriptions/subscribed-channels");
};

export const getUserChannelSubscribers = () => {
  return api.get("/subscriptions/subscribers");
};
