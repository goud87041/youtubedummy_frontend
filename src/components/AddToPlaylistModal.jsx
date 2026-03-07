import { useEffect, useState } from "react";
import { getUserPlayLists, addVideoToPlaylist, removeVideoFromPlayList } from "../services/playList";

export default function AddToPlaylistModal({ videoId, onClose }) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await getUserPlayLists();
        setPlaylists(res.data.data || []);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  const handleTogglePlaylist = async (playlistId, isAdded) => {
    setProcessing(true);
    
    try {
      if (isAdded) {
        console.log('Removing video:', videoId, 'from playlist:', playlistId);
        const res = await removeVideoFromPlayList(videoId, playlistId);
        console.log('Remove response:', res.data);
        setPlaylists(prev =>
          prev.map(pl =>
            pl._id === playlistId
              ? { ...pl, videos: pl.videos.filter(v => v !== videoId) }
              : pl
          )
        );
      } else {
        console.log('Adding video:', videoId, 'to playlist:', playlistId);
        const res = await addVideoToPlaylist(videoId, playlistId);
        console.log('Add response:', res.data);
        setPlaylists(prev =>
          prev.map(pl =>
            pl._id === playlistId
              ? { ...pl, videos: [...(pl.videos || []), videoId] }
              : pl
          )
        );
      }
    } catch (error) {
      console.error("Error toggling playlist:", error);
      console.error("Error details:", error.response?.data);
      alert(`Failed to update playlist: ${error.response?.data?.message || error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Save to Playlist</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {loading ? (
            <p className="text-gray-500 text-center py-4">Loading playlists...</p>
          ) : playlists.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No playlists yet. Create one first!
            </p>
          ) : (
            playlists.map((playlist) => {
              const isAdded = playlist.videos?.includes(videoId) || false;
              return (
                <div
                  key={playlist._id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{playlist.name}</h3>
                    <p className="text-sm text-gray-500">
                      {playlist.description || `${playlist.videos?.length || 0} videos`}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isAdded}
                    onChange={() => handleTogglePlaylist(playlist._id, isAdded)}
                    disabled={processing}
                    className="w-5 h-5 cursor-pointer disabled:opacity-50"
                  />
                </div>
              );
            })
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
