import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ User not logged in OR user data missing
  if (!user || !user.user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            User Not Found
          </h1>

          <p className="text-gray-600 mb-6">
            Please log in to view your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const profile = user.user;

  const handleEdit = () => {
    setFormData({
      fullname: profile.fullname,
      bio: profile.bio || "",
      avtar: profile.avtar || ""
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Add your API call here
      // await updateProfile(formData);
      console.log("Saving:", formData);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6">
        <img
          src={profile.avtar || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{profile.userName}</h1>
          <p className="text-gray-600 mt-1">{profile.email}</p>
          <p className="mt-3 text-gray-700">{profile.bio || "No bio available"}</p>

          <div className="flex gap-6 mt-4 text-sm text-gray-600">
            <span><strong>{profile.totalVideos || 0}</strong> Videos</span>
            <span><strong>{profile.totalLikes || 0}</strong> Likes</span>
            <span><strong>{profile.totalPlaylists || 0}</strong> Playlists</span>
            <span
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => navigate("/subscribers")}
            >
              <strong>{profile.subscribers || 0}</strong> Subscribers
            </span>
          </div>
        </div>

        <div className="flex items-start">
          <button onClick={handleEdit} className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <p className="font-medium">{profile.fullname}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium">{profile.email}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Bio</label>
            <p className="font-medium">{profile.bio || "No bio available"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Account Status</label>
            <p className="font-medium text-green-600">Active</p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullname}
                  onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Avatar URL</label>
                <input
                  type="text"
                  value={formData.avtar}
                  onChange={(e) => setFormData({...formData, avtar: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                disabled={loading}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
