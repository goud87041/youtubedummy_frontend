import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { 
  Home, Video, Twitter, ListMusic, Tv2, 
  Heart, User, ChevronLeft, ChevronRight, History 
} from "lucide-react";

const links = [
  { name: "Home", path: "/", icon: <Home size={22} /> },
  { name: "Videos", path: "/videos", icon: <Video size={22} />, protected: true },
  { name: "Tweet", path: "/tweets", icon: <Twitter size={22} />, protected: true },
  { name: "My Playlist", path: "/UserPlayLists", icon: <ListMusic size={22} />, protected: true },
  { name: "Subscribed", path: "/subscribed-channels", icon: <Tv2 size={22} />, protected: true },
  { name: "Liked Videos", path: "/liked", icon: <Heart size={22} />, protected: true },
  { name: "History", path: "/history", icon: <History size={22} />, protected: true },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { user } = useContext(AuthContext);

  return (
    <aside 
      className={`relative flex flex-col h-screen bg-slate-950 text-slate-300 border-r border-white/5 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* 1. Toggle Button - Floating on the edge */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-0 top-10 w-6 h-6  bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-slate-950 hover:bg-blue-500 transition-colors z-50"
      >
        {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* 2. Logo / Branding */}
      <div className="p-6 h-20 flex items-center overflow-hidden">
        <div className="min-w-[32px] h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
          S
        </div>
        {isExpanded && (
          <span className="ml-3 text-xl font-bold text-white tracking-tight whitespace-nowrap">
            Streamly
          </span>
        )}
      </div>

      {/* 3. Navigation Links */}
      <nav className="flex-1 px-3 space-y-2 mt-4">
        {links.map((link) => {
          // Hide protected links if user is not logged in
          if (link.protected && !user) return null;
          
          return (
          <NavLink
            key={link.path}
            to={link.path}
            title={!isExpanded ? link.name : ""} // Shows tooltip when collapsed
            className={({ isActive }) =>
              `flex items-center rounded-xl transition-all duration-200 group h-12 ${
                isExpanded ? "px-4" : "justify-center px-0"
              } ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <span className="shrink-0">{link.icon}</span>
            {isExpanded && (
              <span className="ml-3 font-medium text-sm whitespace-nowrap opacity-100 transition-opacity duration-300">
                {link.name}
              </span>
            )}
          </NavLink>
        )})}
      </nav>

      {/* 4. Footer Profile Section */}
      <div className="p-4 border-t border-white/5">
        <div className={`flex items-center ${isExpanded ? "gap-3" : "justify-center"}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center shrink-0">
            <User size={20} />
          </div>
          {isExpanded && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Profile</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-tighter">View Account</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}