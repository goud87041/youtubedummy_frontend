import { useEffect, useState } from "react";
import { getWatchHistory } from "../services/user";
import { useNavigate } from "react-router-dom";

export default function WatchHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getWatchHistory();
        setHistory(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Watch History</h1>

      {history.length === 0 ? (
        <p className="text-gray-500">No watch history yet.</p>
      ) : (
        <div className="space-y-4">
          {history.map((video) => (
            <div
              key={video._id}
              className="bg-white shadow rounded-xl p-4 flex gap-4 cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/video/${video._id}`)}
            >
              <div className="relative w-56">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-32 w-full object-cover rounded-lg"
                />
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, "0")}
                </span>
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{video.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {video.owner?.userName}
                </p>
                <p className="text-sm text-gray-500">
                  {video.views || 0} views • {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
