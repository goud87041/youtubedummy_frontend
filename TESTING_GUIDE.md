# Quick Setup & Testing Guide

## 🚀 Installation

```bash
# Navigate to project directory
cd react-sidebar-ui

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Start development server
npm run dev
```

## 🧪 Testing the Application

### 1. Test Without Login (Public Access)
- ✅ Visit Home page (`/`)
- ✅ Browse videos
- ✅ Use search bar
- ✅ Click on videos (will redirect to video player)
- ✅ Sidebar shows only "Home" link
- ✅ Header shows "Login" button

### 2. Test Registration
- ✅ Click "Login" → "Sign Up"
- ✅ Fill registration form
- ✅ Upload avatar and cover image (optional)
- ✅ Submit form
- ✅ Should redirect to home after success

### 3. Test Login
- ✅ Go to `/login`
- ✅ Enter credentials
- ✅ Should redirect to home
- ✅ Header shows user profile
- ✅ Sidebar shows all menu items

### 4. Test Video Management
- ✅ Go to `/videos`
- ✅ Click "Upload Video"
- ✅ Fill form and upload video + thumbnail
- ✅ Watch upload progress bar
- ✅ Video appears in list
- ✅ Click "Edit" to update video
- ✅ Click "Delete" to remove video
- ✅ Click heart icon to like/unlike

### 5. Test Tweets
- ✅ Go to `/tweets`
- ✅ Create a new tweet
- ✅ Edit existing tweet
- ✅ Delete tweet

### 6. Test Playlists
- ✅ Go to `/UserPlayLists`
- ✅ Click "Create Playlist"
- ✅ Fill name and description
- ✅ Click "Open" to view playlist videos
- ✅ Edit playlist details
- ✅ Delete playlist

### 7. Test Profile
- ✅ Go to `/profile`
- ✅ View user statistics
- ✅ Click "Edit Profile"
- ✅ Update fullname and bio
- ✅ Save changes
- ✅ Click on subscriber count to view subscribers

### 8. Test Subscriptions
- ✅ Go to `/subscribed-channels`
- ✅ View subscribed channels
- ✅ Click "Unsubscribe" button

### 9. Test Liked Videos
- ✅ Go to `/liked`
- ✅ View all liked videos
- ✅ Click on video to watch

### 10. Test Watch History
- ✅ Go to `/history`
- ✅ View watch history
- ✅ Click on video to rewatch

### 11. Test Dashboard
- ✅ Go to `/dashboard`
- ✅ View channel statistics
- ✅ See total videos, views, subscribers, likes

### 12. Test Search
- ✅ Type in search bar in header
- ✅ Press Enter
- ✅ Home page filters videos by search query

### 13. Test Protected Routes
- ✅ Logout
- ✅ Try to access `/videos` directly
- ✅ Should redirect to `/login`
- ✅ Same for other protected routes

### 14. Test Sidebar
- ✅ Click collapse/expand button
- ✅ Sidebar animates smoothly
- ✅ Icons remain visible when collapsed
- ✅ Tooltips show on hover when collapsed

### 15. Test Responsive Design
- ✅ Resize browser window
- ✅ Test on mobile view (< 768px)
- ✅ Test on tablet view (768px - 1024px)
- ✅ Test on desktop view (> 1024px)

## 🔍 Features to Test After Backend Integration

### Video Player Page
- [ ] Click on any video from home
- [ ] Video should play
- [ ] Like button should work
- [ ] Subscribe button should work
- [ ] Add to playlist should work
- [ ] Comments should load
- [ ] Add comment should work
- [ ] Related videos should appear

### Comments
- [ ] View comments on video player
- [ ] Add new comment
- [ ] Edit own comment
- [ ] Delete own comment

### Add to Playlist
- [ ] Click "Save" button on video player
- [ ] Select playlists
- [ ] Video should be added to selected playlists
- [ ] Uncheck to remove from playlist

### Channel Details
- [ ] Click on channel name/avatar
- [ ] View channel profile
- [ ] See channel videos
- [ ] Subscribe to channel

## 🐛 Known Issues (Waiting for Backend)

1. **Video Player**: Shows placeholder, needs actual video URL from backend
2. **Comments**: UI ready but no data loading
3. **Related Videos**: Empty sidebar, needs recommendation API
4. **Channel Details**: Using mock data, needs real API
5. **Search**: Frontend ready, backend needs to support query parameter
6. **Add to Playlist Modal**: UI works but needs backend integration

## 📊 API Testing Checklist

Once backend is ready, test these endpoints:

### Auth Endpoints
- [ ] POST `/api/v1/users/register`
- [ ] POST `/api/v1/users/login`
- [ ] GET `/api/v1/users/current-user`

### Video Endpoints
- [ ] GET `/api/v1/videos?page=1&query=test`
- [ ] GET `/api/v1/videos/:videoId`
- [ ] POST `/api/v1/videos`
- [ ] PATCH `/api/v1/videos/:videoId`
- [ ] DELETE `/api/v1/videos/:videoId`

### Like Endpoints
- [ ] POST `/api/v1/like/toggel/v/:videoId`
- [ ] GET `/api/v1/like/allLikevideos`

### Comment Endpoints
- [ ] GET `/api/v1/comments/:videoId`
- [ ] POST `/api/v1/comments/:videoId`
- [ ] PATCH `/api/v1/comments/c/:commentId`
- [ ] DELETE `/api/v1/comments/c/:commentId`

### Playlist Endpoints
- [ ] GET `/api/v1/playList/UserPlayLists`
- [ ] POST `/api/v1/playList`
- [ ] GET `/api/v1/playList/:playlistId`
- [ ] PATCH `/api/v1/playList/add/:videoId/:playlistId`
- [ ] PATCH `/api/v1/playList/remove/:videoId/:playlistId`

### Subscription Endpoints
- [ ] POST `/api/v1/subscriptions/c/:channelId`
- [ ] GET `/api/v1/subscriptions/c/:channelId`

### User Endpoints
- [ ] PATCH `/api/v1/users/update-account`
- [ ] PATCH `/api/v1/users/avatar`
- [ ] GET `/api/v1/users/history`
- [ ] GET `/api/v1/users/c/:username`

### Dashboard Endpoints
- [ ] GET `/api/v1/dashboard/stats`

## 🎯 Performance Testing

- [ ] Test infinite scroll on home page
- [ ] Test video upload with large files (>100MB)
- [ ] Test image uploads for avatar/cover
- [ ] Test search with various queries
- [ ] Test pagination with 100+ videos

## 🔐 Security Testing

- [ ] Try accessing protected routes without login
- [ ] Try editing other user's videos
- [ ] Try deleting other user's content
- [ ] Test XSS in comments/tweets
- [ ] Test file upload validation

## 📱 Browser Compatibility

Test on:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## ✅ Deployment Checklist

Before deploying:
- [ ] Update `VITE_API_URL` in `.env` to production URL
- [ ] Run `npm run build`
- [ ] Test production build locally with `npm run preview`
- [ ] Check all API endpoints are working
- [ ] Verify CORS settings on backend
- [ ] Test authentication flow
- [ ] Verify file uploads work
- [ ] Check responsive design on real devices

---

**Ready to test! Once backend is integrated, all features will be fully functional.**
