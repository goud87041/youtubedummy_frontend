import React, { useEffect, useState } from "react";
import {
  deleteVideo,
  getAllVideos,
  updateVideo,
  uploadVideo,
  togglePublishStatus,
} from "../services/video";
import { likeOnVideo } from "../services/like";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Videos() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const [likedVideos, setLikedVideos] = useState({});

  const [myVideos, setMyVideos] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [editVideoId, setEditVideoId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [preview, setPreview] = useState("");

  // ================= FETCH VIDEOS =================
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await getAllVideos();
      const videos = res?.data?.data || [];
      setMyVideos(videos);
      
      // Initialize liked state for each video
      const likedState = {};
      videos.forEach(video => {
        likedState[video._id] = video.isLiked || false;
      });
      setLikedVideos(likedState);
    };
    fetchVideos();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ================= UPLOAD VIDEO =================
  const handleUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("videoFile", videoFile);
    data.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      setProgress(0);

      const res = await uploadVideo(data, (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percent);
      });

      setMyVideos((prev) => [res.data.data, ...prev]);

      resetForm();
      setShowUpload(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async(videoId)=>{
    try {
      const res = await likeOnVideo(videoId)
      setLikedVideos(prev => ({
        ...prev,
        [videoId]: res.data?.data.liked
      }));
    } catch (error) {
      console.log(error);
    }
  }

  // ================= DELETE =================
  const handleDelete = async (id) => {
    await deleteVideo(id);
    setMyVideos((prev) => prev.filter((video) => video._id !== id));
  };

  // ================= OPEN EDIT =================
  const handleEditClick = (video) => {
    setShowEdit(true);
    setEditVideoId(video._id);

    setFormData({
      title: video.title,
      description: video.description,
    });

    setPreview(video.thumbnail);
  };

  // ================= UPDATE VIDEO =================
  const handleEdit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    try {
      setLoading(true);

      await updateVideo(editVideoId, data);

      setMyVideos((prev) =>
        prev.map((video) =>
          video._id === editVideoId
            ? { ...video, ...formData, thumbnail: preview }
            : video
        )
      );

      setShowEdit(false);
      resetForm();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= TOGGLE PUBLISH =================
  const handleTogglePublish = async (videoId) => {
    try {
      await togglePublishStatus(videoId);
      setMyVideos((prev) =>
        prev.map((video) =>
          video._id === videoId
            ? { ...video, isPublished: !video.isPublished }
            : video
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ================= RESET FORM =================
  const resetForm = () => {
    setFormData({ title: "", description: "" });
    setThumbnail(null);
    setVideoFile(null);
    setPreview("");
    setEditVideoId(null);
  };

  // ================= FORMAT DURATION =================
  const formatDuration = (seconds = 0) => {
    const totalSeconds = Math.floor(seconds);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Progress Bar */}
      {loading && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm mt-2">
            {progress ? `Uploading... ${progress}%` : "Processing..."}
          </p>
        </div>
      )}

      {/* Header */}
      {!showUpload && !showEdit && (
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Videos</h1>
          <button
            onClick={() => setShowUpload(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload Video
          </button>
        </div>
      )}

      {/* ================= UPLOAD FORM ================= */}
      {showUpload && (
        <Modal onClose={() => setShowUpload(false)}>
          <VideoForm
            title="Upload Video"
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleUpload}
            setVideoFile={setVideoFile}
            loading={loading}
          />
        </Modal>
      )}

      {/* ================= EDIT FORM ================= */}
      {showEdit && (
        <Modal onClose={() => setShowEdit(false)}>
          <VideoForm
            title="Update Video"
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleEdit}
            preview={preview}
            loading={loading}
          />
        </Modal>
      )}

      {/* ================= VIDEO LIST ================= */}
      {!showUpload && !showEdit && (
        <div className="space-y-4">
          {myVideos.map((video) => (
            <div
              key={video._id}
              className="bg-white shadow rounded-xl p-4 flex gap-4"
            >
              <div className="relative w-56 cursor-pointer" onClick={() => navigate(`/video/${video._id}`)}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-32 w-full object-cover rounded-lg"
                />
                {video.duration > 0 && (
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-lg">{video.title}</h2>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-sm text-gray-500">
                    {video.views || 0} views
                  </p>
                  <div 
                    onClick={()=>handleLike(video._id)} 
                    className="cursor-pointer"
                  >
                    {likedVideos[video._id] ? (
                      <FaHeart className="text-2xl text-red-500 transition" />
                    ) : (
                      <FaRegHeart className="text-2xl text-gray-400 hover:text-red-400 transition" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEditClick(video)}
                  className="px-4 py-1 border rounded hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleTogglePublish(video._id)}
                  className={`px-4 py-1 border rounded ${
                    video.isPublished
                      ? "bg-green-50 text-green-600 border-green-300"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {video.isPublished ? "Published" : "Unpublished"}
                </button>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="px-4 py-1 border text-red-600 border-red-300 rounded hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ================= REUSABLE FORM =================
function VideoForm({
  title,
  formData,
  handleChange,
  handleSubmit,
  setVideoFile,
  preview,
  loading,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">{title}</h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border rounded-lg"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows="4"
        className="w-full p-2 border rounded-lg"
        required
      />

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full h-40 object-cover rounded-lg"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full"
      />

      {setVideoFile && (
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          className="w-full"
          required
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-2 rounded-lg font-semibold ${
          loading
            ? "bg-gray-400"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : title}
      </button>
    </form>
  );
}

// ================= MODAL WRAPPER =================
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-gray-200"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
