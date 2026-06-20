import { useEffect, useState, useContext } from "react"
import { getVideos } from "../services/homeVideos"
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AuthContext } from "../context/authContext";

//add commit



export default function Home() {
  const [videos, setVideos] = useState([])
  const [page , setPage ] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get("search");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setVideos([]);
    setPage(1);
    setHasMore(true);
    fetchVideo(1);
  }, [searchQuery]);

  useEffect(() => {
    if (page > 1) {
      fetchVideo(page);
    }
  }, [page]);

  const fetchVideo = async (currentPage) => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const res = await getVideos(currentPage, 10, searchQuery)
      const newVideos = res.data.data
      
      if (newVideos.length === 0) {
        setHasMore(false);
      } else {
        setVideos(prev => [...prev, ...newVideos])
      }
    } catch (error) {
      console.error("Error fetching videos:", error)
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }

  const handleScroll = () => {
    if (loading || !hasMore) return;
    
    if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100){
      setPage(prev => prev + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Search results for: <span className="text-blue-600">"{searchQuery}"</span>
            </h2>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div 
              key={video._id + index} 
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => navigate(`/video/${video._id}`)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded font-semibold">
                  {formatDuration(video.duration)}
                </span>
              </div>
              <div className="p-4">
                <div className="flex gap-3">
                  <img
                    src={video.ownerDetails?.[0]?.avatar || "https://i.pravatar.cc/40"}
                    alt="channel"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-900 font-semibold leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">
                      {video.ownerDetails?.[0]?.username || "Unknown"}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      {video.views || 0} views • {new Date(video.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-slate-600 font-medium">Loading more videos...</p>
            </div>
          </div>
        )}

        {/* No More Videos */}
        {!hasMore && videos.length > 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">🎉 You've reached the end!</p>
          </div>
        )}

        {/* No Videos Found */}
        {!loading && videos.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📹</div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No videos found</h3>
            <p className="text-slate-500">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}
