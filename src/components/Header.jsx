import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { Search, Bell, Plus, LogOut, User } from "lucide-react";

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-white/5 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50">
      
      {/* 1. Left Side: Search Bar (Even if you don't have logic yet, it fills the UI) */}
      

      {/* 2. Right Side: Auth & Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {!user ? (
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <div className="flex items-center gap-6">
            {/* Quick Action Icons */}
            <div className="flex items-center gap-3">
               <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                  <Plus size={20} />
               </button>
               <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-slate-950" />
               </button>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white leading-none capitalize">
                  {user.user.fullname}
                </p>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">
                  Pro Member
                </p>
              </div>
              
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <User size={18} />
              </div>

              <button
                className="ml-2 p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}