import api from "./api";

export const getVideos = (page = 1, limit = 10, query = "")=>{
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    if (query) params.append("query", query);
    
    return api.get(`/videos?${params.toString()}`);
}