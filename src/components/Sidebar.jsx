import { NavLink } from "react-router-dom";
import { 
  Home, 
  Video, 
  Twitter, 
  ListMusic, 
  Tv2, 
  Heart, 
  User, 
  LogOut 
} from "lucide-react";

const links = [
  { name: "Home", path: "/", icon: <Home size={20} /> },
  { name: "Videos", path: "/videos", icon: <Video size={20} /> },
  { name: "Tweets", path: "/tweets", icon: <Twitter size={20} /> },
  { name: "My Playlist", path: "/UserPlayLists", icon: <ListMusic size={20} /> },
  { name: "Subscribed", path: "/subscribed-channels", icon: <Tv2 size={20} /> },
  { name: "Liked Videos", path: "/liked", icon: <Heart size={20} /> },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col h-screen w-64 bg-slate-950 text-slate-300 border-r border-slate-800">
      
      {/* 1. Header / Logo Area */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">
            DB
          </span>
          Dashboard
        </h1>
      </div>

      {/* 2. Main Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                  : "hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {/* Icon Wrapper */}
            <span className="opacity-75 group-hover:opacity-100 transition-opacity">
              {link.icon}
            </span>
            <span className="font-medium text-sm">{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* 3. Footer / User Profile */}
      <div className="border-t border-slate-800 p-4">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition-colors w-full group"
        >
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white ring-2 ring-transparent group-hover:ring-blue-600 transition-all overflow-hidden">
            <User size={20} />
            {/* If you have a profile image, use: <img src="..." className="w-full h-full object-cover" /> */}
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-white text-sm font-semibold truncate">My Profile</h3>
            <p className="text-slate-500 text-xs truncate">user@example.com</p>
          </div>
          <div className="text-slate-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10 transition-colors">
             <LogOut size={18} />
          </div>
        </NavLink>
      </div>
    </aside>
  );
}