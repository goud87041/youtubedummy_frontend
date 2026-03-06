
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import ProtectedRoute from "./components/ProtectedRoute"

import Home from "./pages/Home"
import Videos from "./pages/Videos"
import Tweet from "./pages/Tweet"
import MyPlaylist from "./pages/MyPlaylist"
import LikedVideos from "./pages/LikedVideos"
import Profile from "./pages/Profile"
import SubscribedChannels from "./pages/SubscribedChannels"
import ChannelDetails from "./pages/ChannelDetails"
import Login from "./pages/login"
import Register from "./pages/Register"
import MySubscribers from "./pages/getSubscribers"
import PlaylistVideos from "./pages/PlaylistVideos"
import VideoPlayer from "./pages/VideoPlayer"
import WatchHistory from "./pages/WatchHistory"
import Dashboard from "./pages/Dashboard"

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>}/>
              <Route path="/video/:videoId" element={<VideoPlayer />} />
              
              {/* Protected Routes */}
              <Route path="/videos" element={<ProtectedRoute><Videos /></ProtectedRoute>} />
              <Route path="/tweets" element={<ProtectedRoute><Tweet /></ProtectedRoute>} />
              <Route path="/UserPlayLists" element={<ProtectedRoute><MyPlaylist /></ProtectedRoute>} />
              <Route path="/liked" element={<ProtectedRoute><LikedVideos /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/subscribed-channels" element={<ProtectedRoute><SubscribedChannels /></ProtectedRoute>}/>
              <Route path="/channel/:channelId" element={<ChannelDetails />} />
              <Route path="/subscribers" element={<ProtectedRoute><MySubscribers/></ProtectedRoute>}/>
              <Route path="/playList/:playlistId" element={<ProtectedRoute><PlaylistVideos/></ProtectedRoute>}/>
              <Route path="/tweets/:tweetId" element={<ProtectedRoute><Tweet/></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><WatchHistory /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />


            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
