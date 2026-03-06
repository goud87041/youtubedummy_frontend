import React, { useEffect, useState } from "react"
import { addTweet, allTweets, deleteTweet, updateTweet } from "../services/tweet"
import { profileUser } from "../services/auth"
import { likeOnTweet } from "../services/like"
import { FaHeart, FaRegHeart } from "react-icons/fa"

export default function Tweet() {

  const [newTweet, setNewTweet] = useState("")
  const [getUser, setGetUser] = useState({})
  const [tweets, setTweets] = useState([])

  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState("")
  const [tweetLikes, setTweetLikes] = useState({})

  // ================= ADD =================
  const handleTweet = async () => {
    if (!newTweet.trim()) return

    try {
      const res = await addTweet({ content: newTweet })
      setTweets(prev => [res.data.data, ...prev])
      setNewTweet("")
    } catch (error) {
      console.error(error)
    }
  }

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await deleteTweet(id)
      setTweets(prev => prev.filter(t => t._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  // ================= UPDATE =================
  const handleUpdate = async (tweetId) => {
    if (!editContent.trim()) return

    console.log(tweetId);
    console.log(editContent);
    
    
    

    try {
      const res = await updateTweet(tweetId, { content: editContent })

      setTweets(prev =>
        prev.map(tweet =>
          tweet._id === tweetId ? res.data.data : tweet
        )
      )

      setEditingId(null)
      setEditContent("")
    } catch (error) {
      console.error(error)
    }
  }

  // ================= LIKE =================
  const handleTweetLike = async (tweetId) => {
    try {
      const res = await likeOnTweet(tweetId)
      setTweetLikes(prev => ({
        ...prev,
        [tweetId]: res.data?.data.liked
      }))
    } catch (error) {
      console.error(error)
    }
  }

  // ================= FETCH =================
  useEffect(() => {
    const fetchData = async () => {
      const userRes = await profileUser()
      setGetUser(userRes.data.data.user)

      const tweetRes = await allTweets()
      setTweets(tweetRes.data.data)
    }

    fetchData()
  }, [])

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tweets</h1>

      {/* CREATE */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex gap-3">
          <img
            src={getUser?.avtar}
            alt="User"
            className="w-10 h-10 rounded-full"
          />

          <textarea
            value={newTweet}
            onChange={e => setNewTweet(e.target.value)}
            placeholder="What's happening?"
            className="w-full border rounded p-3 resize-none"
            rows={3}
          />
        </div>

        <div className="flex justify-end mt-3">
          <button
            onClick={handleTweet}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Tweet
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {tweets.map(tweet => (
          <div key={tweet._id} className="bg-white rounded-xl shadow p-4">

            <div className="flex gap-3">
              <img
                src={getUser?.avtar}
                alt="User"
                className="w-10 h-10 rounded-full"
              />

              <div className="flex-1">

                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-600`">{getUser?.userName}</h3>
                  <span className="text-sm text-gray-400">
                     {new Date(tweet.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {editingId === tweet._id ? (
                  <>
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      className="w-full border rounded p-3 mt-2"
                      rows={3}
                    />

                    <button
                      onClick={() => handleUpdate(tweet._id)}
                      className="mt-2 text-blue-600"
                    >
                      💾 Save
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mt-2">{tweet.content}</p>

                    <div className="flex gap-6 mt-3 text-sm">

                      <button
                        onClick={() => {
                          setEditingId(tweet._id)
                          setEditContent(tweet.content)
                        }}
                        className="text-blue-600"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() => handleDelete(tweet._id)}
                        className="text-red-600"
                      >
                        🗑 Delete
                      </button>

                    </div>
                  </>
                )}

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
