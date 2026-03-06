import { useEffect, useState } from "react";
import { getChannelStats } from "../services/dashboard";
import { Eye, Users, Video, ThumbsUp } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getChannelStats();
        setStats(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Channel Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Video className="text-blue-600" size={32} />}
          title="Total Videos"
          value={stats?.totalVideos || 0}
        />
        <StatCard
          icon={<Eye className="text-green-600" size={32} />}
          title="Total Views"
          value={stats?.totalViews || 0}
        />
        <StatCard
          icon={<Users className="text-purple-600" size={32} />}
          title="Subscribers"
          value={stats?.totalSubscribers || 0}
        />
        <StatCard
          icon={<ThumbsUp className="text-red-600" size={32} />}
          title="Total Likes"
          value={stats?.totalLikes || 0}
        />
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
      <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}
