import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Search, MoreVertical, UserPlus, Heart } from "lucide-react";

interface User {
  _id: string;
  fullName: string;
  avatar?: string;
  profilePhotos?: string[];
}

interface Conversation {
  _id: string;
  participants: User[];
  lastMessage: { _id: string; text: string; createdAt: Date; sender: string } | null;
  unreadCount: { [key: string]: number };
}

interface Message {
  _id: string;
  sender: User | string;
  text: string;
  createdAt: Date;
}

interface MessagesProps {
  onNavigate: (page: string) => void;
}

const API_BASE_URL = "https://api.rsaristomatch.com/api";
// const API_BASE_URL = "http://localhost:5000/api";

// ✅ Random default avatars (cartoon style)
const DEFAULT_AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasmine",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
];

// ✅ Get random avatar based on user ID (consistent for same user)
const getDefaultAvatar = (userId: string) => {
  const index = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % DEFAULT_AVATARS.length;
  return DEFAULT_AVATARS[index];
};

// ✅ NEW: Get user's profile photo (primary approved photo from AWS S3)
const getUserProfilePhoto = (user: any) => {
  // Check if user has profilePhotos array from backend
  if (user?.profilePhotos && user.profilePhotos.length > 0) {
    return user.profilePhotos[0]; // First approved photo (AWS S3 URL)
  }
  // Fallback to default avatar if no profile photo
  return getDefaultAvatar(user?._id || "default");
};

// Helper function to format time
const formatTime = (date: Date) => {
  const d = new Date(date);
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};

// Helper function to format relative time
const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 1) return `${days}d`;
  if (days === 1) return '1d';
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return 'now';
};

const Messages: React.FC<MessagesProps> = ({ onNavigate }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem("authToken");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const userId = currentUser?.id || currentUser?._id || localStorage.getItem("userId");

  console.log("🔍 Current User ID:", userId);

  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ Fetch connections and conversations
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        
        const connectionsResponse = await fetch(`${API_BASE_URL}/request/connections/accepted`, {
          ...fetchOptions,
          method: "GET",
        });
        
        if (!connectionsResponse.ok) throw new Error("Failed to fetch connections");
        
        const connectionsData = await connectionsResponse.json();        
      
      const processedConnections = connectionsData.data.map((conn: any) => {
  let otherUser = null;

  if (conn.sender?._id === userId) {
    otherUser = conn.receiver;
  } else if (conn.receiver?._id === userId) {
    otherUser = conn.sender;
  } else {
    otherUser = conn; // fallback
  }

  return {
    _id: otherUser._id,
    fullName: otherUser.fullName || otherUser.name || "Unknown User",
    profilePhotos: otherUser.profilePhotos || [], // ✅ Profile photos from backend
  };
});
        
        setConnections(processedConnections);

        console.log("📡 Fetching conversations...");
        
        const conversationsResponse = await fetch(`${API_BASE_URL}/messages/conversations`, {
          ...fetchOptions,
          method: "GET",
        });
        
        if (!conversationsResponse.ok) throw new Error("Failed to fetch conversations");
        
        const conversationsData = await conversationsResponse.json();
        
        setConversations(conversationsData.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data");
        console.error("❌ Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        setIsLoading(true);
        try {
          
          const response = await fetch(`${API_BASE_URL}/messages/conversation/${selectedChat}`, {
            ...fetchOptions,
            method: "GET",
          });
          
          if (!response.ok) throw new Error("Failed to fetch messages");
          
          const data = await response.json();
          
          setMessages(data.data || []);
          setError(null);
        } catch (err) {
          setError("Failed to fetch messages");
          console.error("❌ Error:", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMessages();

      const typingInterval = setInterval(() => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1500);
      }, 8000);
      
      return () => clearInterval(typingInterval);
    }
  }, [selectedChat]);

  const handleSendMessage = async () => {
    if (messageText.trim() && selectedChat) {
      try {
        
        const response = await fetch(`${API_BASE_URL}/messages/send`, {
          ...fetchOptions,
          method: "POST",
          body: JSON.stringify({
            conversationId: selectedChat,
            text: messageText,
          }),
        });
        
        if (!response.ok) throw new Error("Failed to send message");
        
        const data = await response.json();
        
        setMessages((prev) => [...prev, data.data]);
        setMessageText("");

        const convResponse = await fetch(`${API_BASE_URL}/messages/conversations`, {
          ...fetchOptions,
          method: "GET",
        });
        const convData = await convResponse.json();
        setConversations(convData.data || []);
      } catch (err) {
        setError("Failed to send message");
        console.error("❌ Error:", err);
      }
    }
  };

  const handleStartConversation = async (userId: string) => {
    try {
      
      const response = await fetch(`${API_BASE_URL}/messages/start`, {
        ...fetchOptions,
        method: "POST",
        body: JSON.stringify({ userB: userId }),
      });
      
      const data = await response.json();
      
      const newConversation = data.data;
      setConversations((prev) => [newConversation, ...prev]);
      setSelectedChat(newConversation._id);
    } catch (err) {
      setError("Failed to start conversation");
      console.error("❌ Error:", err);
    }
  };

  const getOtherUser = (conversation: Conversation) => {
    if (!conversation || !conversation.participants) return null;
    return conversation.participants.find(p => p._id !== userId) || conversation.participants[0];
  };

  // ✅ Full-screen popup for no connections
  if (connections.length === 0 && !isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md mt-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full mx-4 text-center transform transition-all animate-fadeIn">
          {/* Icon */}
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-12 h-12 text-rose-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            No Connections Yet
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            You don't have any accepted connection requests yet. Start by sending requests to profiles you're interested in or browse potential matches!
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('search')}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-semibold hover:from-rose-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5" />
              Browse Profiles
            </button>

            <button
              onClick={() => onNavigate('requests')}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-rose-600 text-rose-600 rounded-xl font-semibold hover:bg-rose-50 transition-all"
            >
              <Heart className="w-5 h-5" />
              View Requests
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Go to Dashboard
            </button>
          </div>

          {/* Decorative elements */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              💡 Tip: Complete your profile to get better matches!
            </p>
          </div>
        </div>

        {/* CSS Animation */}
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // ✅ Normal Messages Component (when connections.length > 0)
  return (
    <div className="fixed inset-0 flex bg-white mt-16">
      {/* Left Panel — Chat List */}
      <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-200 bg-white flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
          <button className="hover:bg-gray-100 rounded-full p-2 transition-colors">
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {connections.map((conn) => {
            const conversation = conversations.find((c) =>
              c.participants.some((p) => p._id === conn._id)
            );
            
            const unread = conversation?.unreadCount?.[userId] || 0;

            // ✅ Get profile photo or fallback to avatar
            const avatarUrl = getUserProfilePhoto(conn);

            return (
              <div
                key={conn._id}
                onClick={() => {
                  if (conversation) {
                    setSelectedChat(conversation._id);

                    // ✅ reset unread bubble instantly
                    conversation.unreadCount[userId] = 0;
                    setConversations([...conversations]); // force UI refresh
                  } else {
                    handleStartConversation(conn._id);
                  }
                }}

                className={`flex items-center px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 ${
                  selectedChat === conversation?._id ? "bg-rose-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={avatarUrl}
                    alt={conn.fullName}
                    className="w-12 h-12 rounded-full object-cover bg-gray-200"
                    onError={(e) => {
                      // ✅ Fallback to default avatar if image fails to load
                      (e.target as HTMLImageElement).src = getDefaultAvatar(conn._id);
                    }}
                  />

                  {unread > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                      {unread > 99 ? "99+" : unread}
                    </span>
                  )}
                </div>

                <div className="flex-1 ml-3 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                   
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conn.fullName || conn.name || conn.sender?.fullName || conn.receiver?.fullName || "Unknown User"}
                    </h3>

                    {conversation?.lastMessage && (
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {formatRelativeTime(conversation.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate flex-1">
                      {conversation?.lastMessage?.text || "Start chatting"}
                    </p>
                    {unread > 0 && (
                      <span className="ml-2 bg-rose-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                        {unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Panel — Chat Window */}
      <div className="hidden md:flex flex-1 flex-col h-full">
        {selectedChat ? (
          <>
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
              {(() => {
                const conversation = conversations.find((c) => c._id === selectedChat);
                const otherUser = getOtherUser(conversation!);
                
                // ✅ Get profile photo or fallback to avatar
                const avatarUrl = getUserProfilePhoto(otherUser);
                
                return (
                  <>
                    <img
                      src={avatarUrl}
                      alt={otherUser?.fullName || "User"}
                      className="w-11 h-11 rounded-full object-cover bg-gray-200"
                      onError={(e) => {
                        // ✅ Fallback to default avatar if image fails to load
                        (e.target as HTMLImageElement).src = getDefaultAvatar(otherUser?._id || "default");
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">
                        {otherUser?.fullName || "Unknown User"}
                      </h3>
                      {isTyping && (
                        <p className="text-xs text-rose-600">typing...</p>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>

            <div 
              className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            >
              <div className="space-y-4">
                {messages.map((msg) => {
                  const senderId = typeof msg.sender === 'object' ? (msg.sender as User)._id : msg.sender;
                  const isSentByMe = senderId === userId;
                  
                  return (
                    <div
                      key={msg._id}
                      className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${
                          isSentByMe
                            ? "bg-green-500 text-white rounded-br-none"
                            : "bg-white text-gray-900 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                        <p
                          className={`text-[10px] mt-1 text-right ${
                            isSentByMe ? "text-green-100" : "text-gray-500"
                          }`}
                        >
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="px-6 py-4 bg-white border-t border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-gray-50 rounded-full text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none focus:bg-white transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="bg-rose-500 text-white rounded-full p-3 hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
            <MessageCircle className="h-24 w-24 mb-4 text-gray-300" />
            <p className="text-xl font-semibold text-gray-600 mb-2">Select a conversation</p>
            <p className="text-sm text-gray-400">Choose a chat from the left to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { Messages };