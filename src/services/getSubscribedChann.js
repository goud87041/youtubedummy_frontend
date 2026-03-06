import api from "./api"
export const getSubscribedChannels = ()=>{
    return api.get("/subscriptions/subscribed-channels")
}

export const getsubscriber = ()=>{
    return api.get(`/subscriptions/subscribers`)
}
