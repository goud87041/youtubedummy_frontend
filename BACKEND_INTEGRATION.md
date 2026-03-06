# Backend Integration Checklist

## ⚠️ Features Waiting for Backend Reference

These features have complete frontend UI and service functions, but need backend API endpoints to be fully functional:

### 1. Video Player Page (`/src/pages/VideoPlayer.jsx`)
**Status**: UI Complete, Backend Integration Needed

**Required Backend Endpoints**:
- `GET /api/v1/videos/:videoId` - Get video details by ID
  - Should return: video file URL, title, description, owner info, likes, views, duration
- `GET /api/v1/comments/:videoId` - Get all comments for a video
- `POST /api/v1/comments/:videoId` - Add a comment to video
- `GET /api/v1/videos/related/:videoId` - Get related videos (optional)

**What's Ready**:
- Video player UI with controls
- Like/Unlike button
- Subscribe button
- Share button
- Add to playlist button
- Comments section with add/edit/delete UI
- Related videos sidebar

---

### 2. Comments System
**Status**: Service Layer Complete, Needs Backend

**Service File**: `/src/services/comment.js`

**Functions Ready**:
```javascript
getVideoComments(videoId)
addComment(videoId, data)
updateComment(commentId, data)
deleteComment(commentId)
```

**Required Backend Endpoints**:
- `GET /api/v1/comments/:videoId`
- `POST /api/v1/comments/:videoId`
- `PATCH /api/v1/comments/c/:commentId`
- `DELETE /api/v1/comments/c/:commentId`

---

### 3. Video Search & Pagination
**Status**: Frontend Ready, Backend Params Needed

**Current Implementation**: `/src/pages/Home.jsx`

**What's Implemented**:
- Search bar in header
- Query parameter handling
- Infinite scroll pagination

**Backend Requirements**:
- `GET /api/v1/videos?page=1&query=searchTerm`
- Should support pagination with `page` parameter
- Should support search with `query` parameter
- Return format: Array of videos with metadata

---

### 4. Add/Remove Videos from Playlist
**Status**: Service Ready, UI Modal Complete

**Service File**: `/src/services/playList.js`
**Component**: `/src/components/AddToPlaylistModal.jsx`

**Functions Ready**:
```javascript
addVideoToPlaylist(videoId, playlistId)
removeVideoFromPlayList(videoId, playlistId)
```

**Required Backend Endpoints**:
- `PATCH /api/v1/playList/add/:videoId/:playlistId`
- `PATCH /api/v1/playList/remove/:videoId/:playlistId`

**Backend Should Return**:
- Success/failure status
- Updated playlist info

---

### 5. Subscribe/Unsubscribe Functionality
**Status**: Service Complete, Integrated in UI

**Service File**: `/src/services/subscription.js`

**Where Used**:
- `/src/pages/SubscribedChannels.jsx` - Unsubscribe button
- `/src/pages/VideoPlayer.jsx` - Subscribe button
- `/src/pages/ChannelDetails.jsx` - Subscribe button

**Required Backend Endpoints**:
- `POST /api/v1/subscriptions/c/:channelId` - Toggle subscription
- `GET /api/v1/subscriptions/c/:channelId` - Get subscribers list
- `GET /api/v1/subscriptions/u/:subscriberId` - Get user's subscriptions

---

### 6. Profile Update with Images
**Status**: Service Ready, Form Complete

**Service File**: `/src/services/user.js`

**Functions Ready**:
```javascript
updateUserProfile(data)
updateAvatar(data)
updateCoverImage(data)
changePassword(data)
```

**Required Backend Endpoints**:
- `PATCH /api/v1/users/update-account` - Update fullname, bio
- `PATCH /api/v1/users/avatar` - Upload new avatar (multipart/form-data)
- `PATCH /api/v1/users/cover-image` - Upload cover image (multipart/form-data)
- `POST /api/v1/users/change-password` - Change password

---

### 7. Watch History
**Status**: Page Complete, Backend Needed

**Page**: `/src/pages/WatchHistory.jsx`
**Service**: `/src/services/user.js`

**Required Backend Endpoint**:
- `GET /api/v1/users/history`
- Should return: Array of watched videos with timestamps

**Expected Response Format**:
```json
{
  "data": [
    {
      "_id": "videoId",
      "title": "Video Title",
      "thumbnail": "url",
      "duration": 300,
      "views": 1000,
      "owner": {
        "userName": "channelName",
        "avtar": "url"
      },
      "createdAt": "2024-01-01"
    }
  ]
}
```

---

### 8. Channel Dashboard/Analytics
**Status**: Page Complete, Backend Needed

**Page**: `/src/pages/Dashboard.jsx`
**Service**: `/src/services/dashboard.js`

**Required Backend Endpoints**:
- `GET /api/v1/dashboard/stats`
- `GET /api/v1/dashboard/videos`

**Expected Stats Response**:
```json
{
  "data": {
    "totalVideos": 45,
    "totalViews": 12500,
    "totalSubscribers": 350,
    "totalLikes": 2800
  }
}
```

---

### 9. Channel Details Page
**Status**: Using Mock Data, Needs Real Backend

**Page**: `/src/pages/ChannelDetails.jsx`

**Required Backend Endpoints**:
- `GET /api/v1/users/c/:username` - Get channel profile
- Should return: Channel info, videos, subscriber count

**Current Issue**: Using hardcoded mock data in the component

---

### 10. Video Player - Related Videos
**Status**: UI Ready, Backend Needed

**Location**: `/src/pages/VideoPlayer.jsx` (sidebar section)

**Required Backend Endpoint**:
- `GET /api/v1/videos/related/:videoId` (optional)
- Or use existing videos endpoint with filters

---

## 🔧 Backend Response Format Requirements

### Standard Success Response
```json
{
  "statusCode": 200,
  "data": { /* actual data */ },
  "message": "Success message",
  "success": true
}
```

### Standard Error Response
```json
{
  "statusCode": 400,
  "message": "Error message",
  "success": false,
  "errors": []
}
```

---

## 🎯 Priority Order for Backend Integration

### High Priority (Core Features)
1. ✅ Video Player - Get video by ID
2. ✅ Comments System (all CRUD operations)
3. ✅ Search & Pagination for videos
4. ✅ Subscribe/Unsubscribe functionality

### Medium Priority (Enhanced Features)
5. ✅ Add/Remove videos from playlist
6. ✅ Profile update with image uploads
7. ✅ Watch History
8. ✅ Channel Dashboard/Analytics

### Low Priority (Nice to Have)
9. ✅ Related videos recommendation
10. ✅ Real-time notifications
11. ✅ Video sharing with social media

---

## 📝 Notes for Backend Developer

1. **Authentication**: All protected endpoints should verify JWT token from cookies
2. **File Uploads**: Use `multipart/form-data` for video, thumbnail, avatar, cover image
3. **Pagination**: Support `page` and `limit` query parameters
4. **Search**: Support `query` parameter for text search
5. **CORS**: Enable credentials for cookie-based auth
6. **Response Format**: Follow the standard format mentioned above

---

## ✅ What's Already Working (No Backend Changes Needed)

- ✅ User Registration
- ✅ User Login
- ✅ Get Current User
- ✅ Upload Video
- ✅ Update Video
- ✅ Delete Video
- ✅ Get User Videos
- ✅ Like/Unlike Video
- ✅ Get Liked Videos
- ✅ Create/Edit/Delete Tweets
- ✅ Create/Edit/Delete Playlists
- ✅ Get Subscribed Channels
- ✅ Get Subscribers

---

**Once you provide the backend reference, I'll integrate these endpoints and make everything fully functional!**
