# YouTube Clone — React Frontend

A full-featured YouTube-like frontend built with React, Vite, and TailwindCSS. It integrates with a custom backend REST API to support video streaming, playlists, comments, likes, subscriptions, tweets, and user management.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| React Router DOM v6 | Client-side routing |
| Axios | HTTP client |
| TailwindCSS | Utility-first styling |
| Lucide React / React Icons | Icon libraries |
| React Player | Video playback |

---

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx           # Navigation sidebar
│   ├── Header.jsx            # Top navigation bar
│   ├── ProtectedRoute.jsx    # Auth guard for private routes
│   └── AddToPlaylistModal.jsx
├── context/
│   └── authContext.jsx       # Global auth state
├── pages/
│   ├── Home.jsx              # Video feed
│   ├── VideoPlayer.jsx       # Video watch page
│   ├── Login.jsx / Register.jsx
│   ├── Profile.jsx           # User profile & edit
│   ├── Dashboard.jsx         # Creator dashboard
│   ├── MyPlaylist.jsx        # User playlists
│   ├── PlaylistVideos.jsx    # Videos in a playlist
│   ├── LikedVideos.jsx       # Liked videos
│   ├── WatchHistory.jsx      # Watch history
│   ├── SubscribedChannels.jsx
│   ├── ChannelDetails.jsx
│   ├── getSubscribers.jsx    # Channel subscribers
│   ├── Tweet.jsx             # Tweets / community posts
│   └── Videos.jsx            # All videos
└── services/
    ├── api.js                # Axios instance & base config
    ├── auth.js               # Login, register, logout
    ├── video.js              # Video CRUD
    ├── comment.js            # Comments API
    ├── like.js               # Like/unlike
    ├── playList.js           # Playlist management
    ├── subscription.js       # Subscribe/unsubscribe
    ├── tweet.js              # Tweet CRUD
    ├── user.js               # User profile
    ├── dashboard.js          # Channel stats
    ├── homeVideos.js         # Home feed videos
    ├── getUserProfile.js     # Fetch user profile
    └── getSubscribedChann.js # Subscribed channels
```

---

## Routes

| Path | Page | Auth Required |
|---|---|---|
| `/` | Home | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/video/:videoId` | Video Player | No |
| `/videos` | All Videos | Yes |
| `/tweets` | Tweets | Yes |
| `/UserPlayLists` | My Playlists | Yes |
| `/playList/:playlistId` | Playlist Videos | Yes |
| `/liked` | Liked Videos | Yes |
| `/history` | Watch History | Yes |
| `/profile` | Profile | Yes |
| `/subscribed-channels` | Subscriptions | Yes |
| `/channel/:channelId` | Channel Details | No |
| `/subscribers` | My Subscribers | Yes |
| `/dashboard` | Creator Dashboard | Yes |

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file in the root (never commit this):

```env
VITE_API_BASE_URL=<your_backend_api_url>
```

---

## Deployment

The project is configured for Vercel deployment:
- `vercel.json` handles SPA routing redirects
- `public/_redirects` handles Netlify-style fallback

---

## Security Notes

> ⚠️ The following issues were identified during code analysis. Please address before production deployment.

| Severity | Issue | Files |
|---|---|---|
| Critical | Rollup path traversal vulnerability (upgrade to ≥ 4.59.0) | `package-lock.json` |
| High | React Router open redirect (upgrade to ≥ 6.30.4) | `package-lock.json` |
| High | Axios ReDoS vulnerability (upgrade to ≥ 1.16.0) | `package-lock.json` |
| High | Vite dev server path traversal on Windows (upgrade Vite) | `package-lock.json` |
| High | SSRF — unsanitized user input in API URLs | `comment.js`, `playList.js`, `getUserProfile.js` |
| Medium | form-data CRLF injection | `package-lock.json` |
| Medium | follow-redirects leaks custom auth headers | `package-lock.json` |
| Low | Hardcoded credentials in docs | `INTEGRATION_SUMMARY/USER_API_INTEGRATION.md` |

### Quick Fix — Update vulnerable packages

```bash
npm update axios react-router-dom vite rollup postcss
```

---

## Integration Docs

Detailed API integration guides are available in the `INTEGRATION_SUMMARY/` folder:

- [Architecture](INTEGRATION_SUMMARY/ARCHITECTURE.md)
- [Backend Integration](INTEGRATION_SUMMARY/BACKEND_INTEGRATION.md)
- [Video API](INTEGRATION_SUMMARY/VIDEO_API_INTEGRATION.md)
- [User API](INTEGRATION_SUMMARY/USER_API_INTEGRATION.md)
- [Comments API](INTEGRATION_SUMMARY/COMMENTS_API_INTEGRATION.md)
- [Like API](INTEGRATION_SUMMARY/LIKE_API_INTEGRATION.md)
- [Playlist API](INTEGRATION_SUMMARY/PLAYLIST_API_INTEGRATION.md)
- [Subscription API](INTEGRATION_SUMMARY/SUBSCRIPTION_API_INTEGRATION.md)
- [Testing Guide](INTEGRATION_SUMMARY/TESTING_GUIDE.md)
