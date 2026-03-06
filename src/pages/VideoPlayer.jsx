import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { getVideoById } from "../services/video";
import { likeOnVideo, likeOnComment } from "../services/like";
import { getVideoComments, addComment, updateComment, deleteComment } from "../services/comment";
import { toggleSubscribe } from "../services/subscription";
import { ThumbsUp, Share2, Plus } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import AddToPlaylistModal from "../components/AddToPlaylistModal";

export default function VideoPlayer() {
  const { videoId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [commentLikes, setCommentLikes] = useState({});

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await getVideoById(videoId);
        setVideo(res.data.data);
        setIsLiked(res.data.data.isLiked || false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await getVideoComments(videoId);
        setComments(res.data.data?.comments || []);
      } catch (error) {
        console.error(error);
      }
    };

    if (videoId) {
      fetchVideo();
      fetchComments();
    }
  }, [videoId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await addComment(videoId, { content: newComment });
      const newCommentData = res.data.data;
      // Add user info to new comment
      newCommentData.owner = {
        userName: user.user?.userName,
        avtar: user.user?.avtar
      };
      setComments(prev => [newCommentData, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editCommentText.trim()) return;
    try {
      const res = await updateComment(commentId, { commentText: editCommentText });
      setComments(prev =>
        prev.map(comment =>
          comment._id === commentId
            ? { ...comment, content: editCommentText }
            : comment
        )
      );
      setEditingCommentId(null);
      setEditCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      const res = await likeOnComment(commentId);
      setCommentLikes(prev => ({
        ...prev,
        [commentId]: res.data?.data.liked
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await likeOnVideo(videoId);
      setIsLiked(res.data?.data.liked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubscribe = async () => {
    try {
      if (video?.owner?._id) {
        await toggleSubscribe(video.owner._id);
        setIsSubscribed(!isSubscribed);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen"><p>Loading...</p></div>;
  if (!video) return <div className="flex items-center justify-center h-screen"><p>Video not found</p></div>;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Video Section */}
      <div className="lg:col-span-2">
        {/* Video Player */}
        <div className="bg-black rounded-xl overflow-hidden aspect-video">
          <video
            controls
            className="w-full h-full"
            src={video?.videoFile}
          >
            Your browser does not support video.
          </video>
        </div>

        {/* Video Info */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold">{video?.title}</h1>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <img
                src={video?.ownerDetails?.[0]?.avatar || "https://i.pravatar.cc/40"}
                alt="Channel"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{video?.ownerDetails?.[0]?.username || "Channel Name"}</h3>
                <p className="text-sm text-gray-500">{video?.owner?.subscribers || 0} subscribers</p>
              </div>
              <button
                onClick={handleSubscribe}
                className={`ml-4 px-6 py-2 rounded-full font-semibold ${
                  isSubscribed
                    ? "bg-gray-200 text-gray-800"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  isLiked ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <ThumbsUp size={18} />
                <span>{video?.likes || 0}</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <Share2 size={18} />
                Share
              </button>

              <button
                onClick={() => setShowPlaylistModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <Plus size={18} />
                Save
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4 bg-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-600">
              {video?.views || 0} views • {new Date(video?.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-2">{video?.description || "No description available"}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">{comments.length} Comments</h2>

          {user && (
            <div className="flex gap-3 mb-6">
              <img
                src={user.user?.avtar || "https://i.pravatar.cc/40"}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full border-b-2 border-gray-300 focus:border-blue-600 outline-none pb-2"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setNewComment("")}
                    className="px-4 py-2 text-sm rounded-full hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="flex gap-3">
                <img
                  src={comment.owner?.avtar || "https://i.pravatar.cc/40"}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{comment.owner?.userName}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {editingCommentId === comment._id ? (
                    <div className="mt-2">
                      <textarea
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        className="w-full border rounded p-2 text-sm"
                        rows={2}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleEditComment(comment._id)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditCommentText("");
                          }}
                          className="text-sm text-gray-600 hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="mt-1 text-sm">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={() => handleCommentLike(comment._id)}
                          className="flex items-center gap-1 text-xs hover:text-red-500"
                        >
                          {commentLikes[comment._id] ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart />
                          )}
                        </button>
                        {user && user.user?._id === comment.owner?._id && (
                          <>
                            <button
                              onClick={() => {
                                setEditingCommentId(comment._id);
                                setEditCommentText(comment.content);
                              }}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="text-xs text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar - Related Videos */}
      <div className="space-y-3">
        <h3 className="font-semibold">Related Videos</h3>
        {/* TODO: Map related videos */}
      </div>

      {/* Add to Playlist Modal */}
      {showPlaylistModal && (
        <AddToPlaylistModal 
          videoId={videoId}
          onClose={() => setShowPlaylistModal(false)}
        />
      )}
    </div>
  );
}
