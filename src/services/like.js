import api from "./api";

export const likeOnVideo = (videoId)=>{
    return api.post(`/like/toggel/v/${videoId}`)
}

export const likeOnComment = (commentId)=>{
    return api.post(`/like/toggel/c/${commentId}`)
}

export const likeOnTweet = (tweetId)=>{
    return api.post(`/like/toggel/t/${tweetId}`)
}