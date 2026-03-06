import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getPlayListById } from "../services/playList"

export default function PlaylistVideos() {
  const {playlistId } = useParams("")
  const navigate = useNavigate()
  const [videos , setVideos ] = useState([])
  // console.log(playlistId);
  

  useEffect(()=>{

    if(!playlistId) return 

    const callres = async ()=>{
      try {
        const res = await getPlayListById(playlistId)
        console.log(res.data.data);
        setVideos(res.data.data)  
      } catch (error) {
        console.error(error)
      }
      
    }

    callres()
  },[playlistId])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {videos?.name || "Playlist Videos"}
      </h1>
      <p className="text-gray-600 mb-4">{videos?.description}</p>

      {!videos?.videos || videos.videos.length === 0 ? (
        <p className="text-gray-500">No videos in this playlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.videos.map(video => (
            <div
              key={video._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/video/${video._id}`)}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-44 w-full object-cover rounded-t-xl"
                />
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                </span>
              </div>

              <div className="p-4">
                <h2 className="font-semibold line-clamp-2">
                  {video.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {video.views || 0} views
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
