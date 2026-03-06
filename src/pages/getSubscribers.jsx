import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getsubscriber } from "../services/getSubscribedChann"



export default function MySubscribers() {
  const navigate = useNavigate()
  const [subscribers, setSubscribers] = useState([])

  const openProfile = (id) => {
    navigate(`/profile/${id}`)
  }


useEffect(()=>{
    const callForGetVal = async ()=>{
        try {
            const res = await getsubscriber()
            console.log(res.data.data);
            setSubscribers(res.data.data)
        } catch (error) {
            console.error(error);
        }
    }

    callForGetVal()
},[])

    if(subscribers.length === 0) return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Subscribers</h1>
            <p className="text-gray-500">You have no subscribers.</p>
        </div>
    )


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Subscribers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscribers.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={item.channel?.avtar || "https://i.pravatar.cc/150"}
              alt={item.channel?.username}
              className="h-48 w-full object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h2 className="font-semibold text-xl">
                {item.channel?.username}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {item.channel?.email}
              </p>

              {/* Open profile */}
              <button
                onClick={() => openProfile(item.channel?._id)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
