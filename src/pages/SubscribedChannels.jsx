import React, { useEffect, useState } from "react"
import { getSubscribedChannels } from "../services/getSubscribedChann"
import { toggleSubscribe } from "../services/subscription"
import { useNavigate } from "react-router-dom"

export default function SubscribedChannels() {
  const [subscribedChannels, setSubscribedChannels] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSubscribedChannels = async () => {
      try {
        const res = await getSubscribedChannels()
        setSubscribedChannels(res.data.data)
        console.log(res.data.data[0]);
        
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(true)
      }
    }

    fetchSubscribedChannels()
  }, [])

  const handleUnsubscribe = async (channelId) => {
    try {
      await toggleSubscribe(channelId);
      setSubscribedChannels(prev => prev.filter(ch => ch._id !== channelId));
    } catch (error) {
      console.error(error);
    }
  };

  if (!loading) return <p>Loading...</p>

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Subscribed Channels</h1>

      {subscribedChannels.length === 0 ? (
        <p className="text-gray-500">You are not subscribed to any channels.</p>
      ) : (
        <div className="space-y-4">
          {subscribedChannels.map((item) => (
            <div
              key={item._id} 
              className="bg-white rounded-xl shadow p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item?.avtar || "https://i.pravatar.cc/40"}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">
                    {item?.username}
                  </h3>
                </div>
              </div>

              <button 
                onClick={() => handleUnsubscribe(item.channelId)}
                className="px-4 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Unsubscribe
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
