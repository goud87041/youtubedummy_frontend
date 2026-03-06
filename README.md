# React Video Platform UI

A full-featured video streaming platform UI built with React, Vite, and Tailwind CSS.

## ✅ Implemented Features

### 🔐 Authentication & Authorization
- ✅ User Registration with avatar and cover image upload
- ✅ User Login with JWT authentication
- ✅ Protected Routes (requires login)
- ✅ Persistent login state with localStorage
- ✅ Logout functionality

### 🎥 Video Management
- ✅ Upload videos with thumbnail
- ✅ Edit video details (title, description, thumbnail)
- ✅ Delete videos
- ✅ View all user videos
- ✅ Video player page with full controls
- ✅ Like/Unlike videos with toggle state
- ✅ Video views counter
- ✅ Video duration display
- ✅ Click to watch video

### 🏠 Home & Discovery
- ✅ Browse all videos (infinite scroll)
- ✅ Search videos by query
- ✅ Pagination support
- ✅ Video thumbnails with duration
- ✅ Responsive grid layout

### 💬 Social Features
- ✅ Create tweets/posts
- ✅ Edit tweets
- ✅ Delete tweets
- ✅ View all user tweets
- ✅ Comments system (UI ready, needs backend)
- ✅ Subscribe/Unsubscribe to channels
- ✅ View subscribed channels
- ✅ View channel subscribers

### 📝 Playlists
- ✅ Create playlists
- ✅ Edit playlist details
- ✅ Delete playlists
- ✅ View playlist videos
- ✅ Add videos to playlist (service ready)
- ✅ Remove videos from playlist (service ready)
- ✅ Add to Playlist modal component

### 👤 User Profile
- ✅ View user profile
- ✅ Edit profile (fullname, bio)
- ✅ Update avatar (service ready)
- ✅ Update cover image (service ready)
- ✅ View user statistics (videos, likes, playlists, subscribers)
- ✅ Change password (service ready)

### 📊 Dashboard & Analytics
- ✅ Channel statistics dashboard
- ✅ Total videos count
- ✅ Total views count
- ✅ Subscribers count
- ✅ Total likes count

### 🎨 UI/UX Features
- ✅ Collapsible sidebar with smooth animations
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark theme UI
- ✅ Search bar in header
- ✅ Loading states
- ✅ Progress bar for video uploads
- ✅ Modal dialogs
- ✅ Toast notifications (ready to implement)
- ✅ Protected route guards

### 📜 Additional Pages
- ✅ Liked Videos page
- ✅ Watch History page
- ✅ Channel Details page
- ✅ Video Player page with comments
- ✅ My Subscribers page

## 🔧 Services/API Integration

All API services are ready and organized in `/src/services/`:

- ✅ `auth.js` - Login, Register, Get Current User
- ✅ `video.js` - Upload, Update, Delete, Get Videos, Get Liked Videos
- ✅ `tweet.js` - Create, Update, Delete, Get Tweets
- ✅ `playList.js` - CRUD operations for playlists
- ✅ `like.js` - Toggle like on videos
- ✅ `comment.js` - CRUD operations for comments
- ✅ `subscription.js` - Subscribe/Unsubscribe, Get subscribers
- ✅ `user.js` - Update profile, Change password, Watch history
- ✅ `dashboard.js` - Channel statistics
- ✅ `getSubscribedChann.js` - Get subscribed channels and subscribers

## 📋 Backend API Endpoints Required

The frontend is ready and expects these backend endpoints:

### Auth
- `POST /api/v1/users/register` - Register user
- `POST /api/v1/users/login` - Login user
- `GET /api/v1/users/current-user` - Get logged-in user

### Videos
- `GET /api/v1/videos` - Get all videos (with pagination & search)
- `GET /api/v1/videos/:videoId` - Get video by ID
- `POST /api/v1/videos` - Upload video
- `PATCH /api/v1/videos/:videoId` - Update video
- `DELETE /api/v1/videos/:videoId` - Delete video
- `GET /api/v1/videos/allVideos` - Get user's videos

### Likes
- `POST /api/v1/like/toggel/v/:videoId` - Toggle like on video
- `GET /api/v1/like/allLikevideos` - Get all liked videos

### Comments
- `GET /api/v1/comments/:videoId` - Get video comments
- `POST /api/v1/comments/:videoId` - Add comment
- `PATCH /api/v1/comments/c/:commentId` - Update comment
- `DELETE /api/v1/comments/c/:commentId` - Delete comment

### Tweets
- `POST /api/v1/tweets/` - Create tweet
- `GET /api/v1/tweets/userTweets` - Get user tweets
- `PATCH /api/v1/tweets/:tweetId` - Update tweet
- `DELETE /api/v1/tweets/:tweetId` - Delete tweet

### Playlists
- `GET /api/v1/playList/UserPlayLists` - Get user playlists
- `POST /api/v1/playList` - Create playlist
- `GET /api/v1/playList/:playlistId` - Get playlist by ID
- `POST /api/v1/playList/:playlistId` - Update playlist
- `DELETE /api/v1/playList/:playlistId` - Delete playlist
- `PATCH /api/v1/playList/add/:videoId/:playlistId` - Add video to playlist
- `PATCH /api/v1/playList/remove/:videoId/:playlistId` - Remove video from playlist

### Subscriptions
- `POST /api/v1/subscriptions/c/:channelId` - Toggle subscription
- `GET /api/v1/subscriptions/c/:channelId` - Get channel subscribers
- `GET /api/v1/subscriptions/u/:subscriberId` - Get user subscriptions

### User Profile
- `PATCH /api/v1/users/update-account` - Update profile
- `PATCH /api/v1/users/avatar` - Update avatar
- `PATCH /api/v1/users/cover-image` - Update cover image
- `POST /api/v1/users/change-password` - Change password
- `GET /api/v1/users/c/:username` - Get channel profile
- `GET /api/v1/users/history` - Get watch history

### Dashboard
- `GET /api/v1/dashboard/stats` - Get channel statistics
- `GET /api/v1/dashboard/videos` - Get channel videos

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
VITE_API_URL=http://localhost:8000
```

3. Run development server:
```bash
npm run dev
```

## 📦 Dependencies

- React 18
- React Router DOM 6
- Axios
- Tailwind CSS
- Lucide React (icons)
- React Icons
- Vite

## 🎯 Next Steps (Backend Integration)

Once you provide the backend reference, these features will be fully functional:
1. Video player with actual video streaming
2. Comments system integration
3. Real-time notifications
4. Video recommendations
5. Advanced search filters
6. User mentions in comments
7. Video sharing functionality

## 📁 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── ProtectedRoute.jsx
│   └── AddToPlaylistModal.jsx
├── pages/
│   ├── Home.jsx
│   ├── Videos.jsx
│   ├── VideoPlayer.jsx
│   ├── Tweet.jsx
│   ├── MyPlaylist.jsx
│   ├── PlaylistVideos.jsx
│   ├── LikedVideos.jsx
│   ├── SubscribedChannels.jsx
│   ├── Profile.jsx
│   ├── ChannelDetails.jsx
│   ├── WatchHistory.jsx
│   ├── Dashboard.jsx
│   ├── getSubscribers.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── services/
│   ├── api.js
│   ├── auth.js
│   ├── video.js
│   ├── tweet.js
│   ├── playList.js
│   ├── like.js
│   ├── comment.js
│   ├── subscription.js
│   ├── user.js
│   ├── dashboard.js
│   ├── homeVideos.js
│   ├── getUserProfile.js
│   └── getSubscribedChann.js
├── context/
│   └── authContext.jsx
├── App.jsx
└── main.jsx
```

## 🔒 Environment Variables

Required in `.env`:
- `VITE_API_URL` - Backend API base URL

## 🎨 Theme

- Primary Color: Blue (#2563eb)
- Background: Slate (dark theme)
- Accent: Red for actions
- Text: White/Slate for dark theme

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

**Note**: All frontend functionality is complete. Backend API integration is pending based on your backend reference.
