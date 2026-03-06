# 🏗️ Project Architecture

## 📐 Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      React Router                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Public Routes:  /  /login  /register  /video/:id   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Protected Routes: /videos /tweets /profile /liked  │  │
│  │  /subscribed-channels /history /dashboard           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Auth Context Provider                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  State: { user, setUser }                            │  │
│  │  Storage: localStorage                               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Layout Components                       │
│  ┌──────────┐  ┌────────────────────────────────────────┐  │
│  │ Sidebar  │  │           Header                       │  │
│  │          │  │  ┌──────────────┐  ┌──────────────┐   │  │
│  │ - Home   │  │  │ Search Bar   │  │ User Profile │   │  │
│  │ - Videos │  │  └──────────────┘  └──────────────┘   │  │
│  │ - Tweets │  └────────────────────────────────────────┘  │
│  │ - Liked  │                                              │
│  │ - History│  ┌────────────────────────────────────────┐  │
│  └──────────┘  │         Page Content                   │  │
│                │  (Home, Videos, Profile, etc.)         │  │
│                └────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   auth.js    │  │   video.js   │  │   tweet.js   │     │
│  │ - login      │  │ - upload     │  │ - create     │     │
│  │ - register   │  │ - update     │  │ - update     │     │
│  │ - profile    │  │ - delete     │  │ - delete     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ playlist.js  │  │  comment.js  │  │subscription.js│    │
│  │ - CRUD ops   │  │ - CRUD ops   │  │ - toggle     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   user.js    │  │dashboard.js  │  │   like.js    │     │
│  │ - update     │  │ - stats      │  │ - toggle     │     │
│  │ - history    │  │ - analytics  │  │ - get liked  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Client (Axios)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Base URL: VITE_API_URL/api/v1                       │  │
│  │  Credentials: true (cookies)                         │  │
│  │  Headers: Content-Type, Authorization               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API Server                        │
│                  (Waiting for Integration)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Examples

### Example 1: User Login Flow
```
User enters credentials
        │
        ▼
Login.jsx component
        │
        ▼
loginUser(data) service
        │
        ▼
POST /api/v1/users/login
        │
        ▼
Backend validates & returns JWT
        │
        ▼
setUser(userData) in AuthContext
        │
        ▼
localStorage.setItem('user', data)
        │
        ▼
Navigate to Home page
        │
        ▼
Protected routes now accessible
```

### Example 2: Upload Video Flow
```
User fills video form
        │
        ▼
Videos.jsx component
        │
        ▼
uploadVideo(formData, onProgress) service
        │
        ▼
POST /api/v1/videos (multipart/form-data)
        │
        ▼
Progress callback updates UI
        │
        ▼
Backend processes & saves video
        │
        ▼
Returns video data
        │
        ▼
Update local state with new video
        │
        ▼
Video appears in list
```

### Example 3: Like Video Flow
```
User clicks heart icon
        │
        ▼
Videos.jsx handleLike(videoId)
        │
        ▼
likeOnVideo(videoId) service
        │
        ▼
POST /api/v1/like/toggel/v/:videoId
        │
        ▼
Backend toggles like status
        │
        ▼
Returns { liked: true/false }
        │
        ▼
Update likedVideos state
        │
        ▼
Heart icon changes color
```

---

## 🗂️ Component Hierarchy

```
App.jsx
├── BrowserRouter
│   ├── Sidebar
│   │   ├── Logo
│   │   ├── Navigation Links
│   │   │   ├── Home
│   │   │   ├── Videos (protected)
│   │   │   ├── Tweets (protected)
│   │   │   ├── Playlists (protected)
│   │   │   ├── Subscribed (protected)
│   │   │   ├── Liked (protected)
│   │   │   └── History (protected)
│   │   └── Profile Section
│   │
│   ├── Header
│   │   ├── Search Bar
│   │   └── User Menu
│   │       ├── Notifications
│   │       ├── Profile
│   │       └── Logout
│   │
│   └── Routes
│       ├── Public Routes
│       │   ├── Home
│       │   ├── Login
│       │   ├── Register
│       │   └── VideoPlayer
│       │
│       └── Protected Routes
│           ├── Videos
│           │   ├── Upload Modal
│           │   ├── Edit Modal
│           │   └── Video List
│           ├── Tweets
│           │   ├── Create Form
│           │   └── Tweet List
│           ├── MyPlaylist
│           │   ├── Create Modal
│           │   └── Playlist Grid
│           ├── Profile
│           │   └── Edit Modal
│           ├── LikedVideos
│           ├── SubscribedChannels
│           ├── WatchHistory
│           └── Dashboard
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User Not Logged In                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Sidebar: Only "Home" visible                        │  │
│  │  Header: "Login" button                              │  │
│  │  Protected Routes: Redirect to /login                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                    User clicks "Login"
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Login Page                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Enter username & password                           │  │
│  │  Submit form                                         │  │
│  │  API call: POST /users/login                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                    Backend validates
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    User Logged In                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  AuthContext: user = { user: {...}, accessToken }   │  │
│  │  localStorage: user data saved                       │  │
│  │  Sidebar: All links visible                          │  │
│  │  Header: User profile & logout                       │  │
│  │  Protected Routes: Accessible                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 State Management

```
┌─────────────────────────────────────────────────────────────┐
│                    Global State (Context)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  AuthContext                                         │  │
│  │  - user: { user: {...}, accessToken }               │  │
│  │  - setUser: function                                 │  │
│  │  - Persisted in localStorage                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    Local State (useState)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Videos.jsx                                          │  │
│  │  - myVideos: []                                      │  │
│  │  - likedVideos: {}                                   │  │
│  │  - loading: false                                    │  │
│  │  - progress: 0                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Home.jsx                                            │  │
│  │  - videos: []                                        │  │
│  │  - page: 1                                           │  │
│  │  - searchQuery: ""                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Profile.jsx                                         │  │
│  │  - isEditing: false                                  │  │
│  │  - formData: {}                                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Styling Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Tailwind CSS                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Theme: Dark (slate-950 background)                  │  │
│  │  Primary: Blue-600                                   │  │
│  │  Accent: Red-600                                     │  │
│  │  Text: White/Slate-300                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Responsive Breakpoints                              │  │
│  │  - sm: 640px                                         │  │
│  │  - md: 768px                                         │  │
│  │  - lg: 1024px                                        │  │
│  │  - xl: 1280px                                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Animations                                          │  │
│  │  - Sidebar collapse/expand                           │  │
│  │  - Hover effects                                     │  │
│  │  - Modal fade in/out                                 │  │
│  │  - Progress bars                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔌 API Integration Points

```
Frontend Service          Backend Endpoint
─────────────────────────────────────────────────────────
auth.js
├── loginUser()      →   POST /api/v1/users/login
├── registerUser()   →   POST /api/v1/users/register
└── profileUser()    →   GET  /api/v1/users/current-user

video.js
├── getAllVideos()   →   GET    /api/v1/videos/allVideos
├── uploadVideo()    →   POST   /api/v1/videos
├── updateVideo()    →   PATCH  /api/v1/videos/:id
├── deleteVideo()    →   DELETE /api/v1/videos/:id
└── getLikeVideo()   →   GET    /api/v1/like/allLikevideos

comment.js (NEW)
├── getVideoComments() → GET    /api/v1/comments/:videoId
├── addComment()       → POST   /api/v1/comments/:videoId
├── updateComment()    → PATCH  /api/v1/comments/c/:id
└── deleteComment()    → DELETE /api/v1/comments/c/:id

subscription.js (NEW)
├── toggleSubscribe()  → POST   /api/v1/subscriptions/c/:id
└── getChannelSubs()   → GET    /api/v1/subscriptions/c/:id

user.js (NEW)
├── updateProfile()    → PATCH  /api/v1/users/update-account
├── updateAvatar()     → PATCH  /api/v1/users/avatar
├── changePassword()   → POST   /api/v1/users/change-password
└── getWatchHistory()  → GET    /api/v1/users/history

dashboard.js (NEW)
└── getChannelStats()  → GET    /api/v1/dashboard/stats
```

---

**This architecture ensures clean separation of concerns, maintainability, and scalability! 🚀**
