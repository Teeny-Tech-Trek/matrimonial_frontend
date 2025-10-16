import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Search, MoreVertical } from "lucide-react";

interface User {
  _id: string;
  fullName: string;
  avatar: string;
}

interface Conversation {
  _id: string;
  participants: User[];
  lastMessage: { _id: string; text: string; createdAt: Date } | null;
  unreadCount: Map<string, number>;
}

interface Message {
  _id: string;
  sender: User;
  text: string;
  createdAt: Date;
}

interface MessagesProps {
  onNavigate: (page: string) => void;
}

const API_BASE_URL = "http://localhost:5000/api";

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
  const [connections, setConnections] = useState<User[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🔹 Fetch accepted connections and conversations
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
        setConnections(connectionsData.data);

        const conversationsResponse = await fetch(`${API_BASE_URL}/messages/conversations`, {
          ...fetchOptions,
          method: "GET",
        });
        if (!conversationsResponse.ok) throw new Error("Failed to fetch conversations");
        const conversationsData = await conversationsResponse.json();
        setConversations(conversationsData.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔹 Fetch messages when a chat is opened
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
          setMessages(data.data);
          setError(null);
        } catch (err) {
          setError("Failed to fetch messages");
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

  // 🔹 Send a message
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
        setConversations(convData.data);
      } catch (err) {
        setError("Failed to send message");
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
    }
  };


  return (
    <div className="fixed inset-0 flex bg-white mt-16">
      {/* Left Panel — Chat List */}
      <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col h-full">
        {/* Header */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-200 bg-white flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
          <button className="hover:bg-gray-100 rounded-full p-2 transition-colors">
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Search Bar */}
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
          {connections.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 px-4">
              <MessageCircle className="h-12 w-12 mb-2 opacity-30" />
              <p className="text-sm text-center">No connections yet</p>
            </div>
          ) : (
            connections.map((conn) => {
              const conversation = conversations.find((c) =>
                c.participants.some((p) => p._id === conn._id)
              );
              const unread = conversation
                ? (conversation.unreadCount as any)?.[userId || ""] || 0
                : 0;

              return (
                <div
                  key={conn._id}
                  onClick={() => {
                    if (conversation) {
                      setSelectedChat(conversation._id);
                    } else {
                      handleStartConversation(conn._id);
                    }
                  }}
                  className={`flex items-center px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 ${
                    selectedChat === conversation?._id ? "bg-rose-50" : "hover:bg-gray-50"
                  }`}
                >
                  {/* Avatar with unread badge */}
                  {/* <div className="relative flex-shrink-0">
                    <img
                      src={conn.avatar || "/default-avatar.png"}
                      alt={conn.fullName || "User"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    
                    {/* 🔴 WhatsApp-style unread badge on avatar */}
                    {/* {unread > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                        {unread > 99 ? "99+" : unread}
                      </span>
                    )}
                  </div> */}

                  <div className="relative flex-shrink-0">
                    <img
                      src={
                        conn?.avatar ||
                        conn?.profilePhotos?.[0] ||
                        conn?.sender?.avatar ||
                        conn?.receiver?.avatar ||
                        "/default-avatar.png"
                      }
                      alt={conn?.fullName || conn?.sender?.fullName || conn?.receiver?.fullName || "User"}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    {/* 🔴 WhatsApp-style unread badge on avatar */}
                    {unread > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                        {unread > 99 ? "99+" : unread}
                      </span>
                    )}
                     </div>
                  

                  {/* Name and Message Content */}
                 <div className="flex-1 ml-3 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold text-gray-900 truncate">
                  {(() => {
  // Some APIs send nested sender/receiver; others just return fullName directly
                    const name =
                      (conn as any)?.sender?.fullName ||
                      (conn as any)?.receiver?.fullName ||
                      conn?.fullName ||
                      "Unknown User";

                    return name;
                  })()}

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
            })
          )}
        </div>
      </div>

      {/* Right Panel — Chat Window */}
      <div className="hidden md:flex flex-1 flex-col h-full">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
              <img
                src={
                  conversations
                    .find((c) => c._id === selectedChat)
                    ?.participants.find((p) => p._id !== userId)?.avatar ||
                  "/default-avatar.png"
                }
                alt="User"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">
                  {
                    conversations
                      .find((c) => c._id === selectedChat)
                      ?.participants.find((p) => p._id !== userId)?.fullName
                  }
                </h3>
                {isTyping && (
                  <p className="text-xs text-rose-600">typing...</p>
                )}
              </div>
            </div>

            {/* Messages Container */}
            <div 
              className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            >
              <div className="space-y-4">
                {messages.map((msg) => {
                  const isSentByMe = msg.sender._id === userId;
                  
                  return (
                    <div
                      key={msg._id}
                      className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${
                          isSentByMe
                            ? "bg-rose-500 text-white"
                            : "bg-white text-gray-900"
                        }`}
                      >
                        <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                        <p
                          className={`text-[10px] mt-1 text-right ${
                            isSentByMe
                              ? "text-rose-100"
                              : "text-gray-500"
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

            {/* Message Input */}
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

// import React, { useState, useEffect } from "react";
// import { MessageCircle, Send, Search } from "lucide-react";
// import { formatDistanceToNow, format } from "date-fns";

// interface User {
//   _id: string;
//   fullName: string;
//   avatar: string;
// }

// interface Conversation {
//   _id: string;
//   participants: User[];
//   lastMessage: { _id: string; text: string; createdAt: Date } | null;
//   unreadCount: Map<string, number>;
// }

// interface Message {
//   _id: string;
//   sender: User;
//   text: string;
//   createdAt: Date;
// }

// interface MessagesProps {
//   onNavigate: (page: string) => void;
// }

// // const API_BASE_URL = "https://matrimonial-backend-14t2.onrender.com/api";
// const API_BASE_URL = "http://localhost:5000/api";


// const Messages: React.FC<MessagesProps> = ({ onNavigate }) => {
//   const [selectedChat, setSelectedChat] = useState<string | null>(null);
//   const [messageText, setMessageText] = useState<string>("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [connections, setConnections] = useState<User[]>([]);
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const token = localStorage.getItem("authToken");
//   const userId = localStorage.getItem("userId");

//   // Common fetch headers
//   const fetchOptions = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };

//   // Fetch accepted connections and conversations
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         // Fetch accepted connections
//         const connectionsResponse = await fetch(`${API_BASE_URL}/request/connections/accepted`, {
//           ...fetchOptions,
//           method: "GET",
//         });
//         if (!connectionsResponse.ok) throw new Error("Failed to fetch connections");
//         const connectionsData = await connectionsResponse.json();
//         console.log("Connections:", connectionsData.data);
//         setConnections(connectionsData.data);

//         // Fetch conversations
//         const conversationsResponse = await fetch(`${API_BASE_URL}/messages/conversations`, {
//           ...fetchOptions,
//           method: "GET",
//         });
//         if (!conversationsResponse.ok) throw new Error("Failed to fetch conversations");
//         const conversationsData = await conversationsResponse.json();
//         console.log("Conversations:", conversationsData.data);
//         setConversations(conversationsData.data);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch data");
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Fetch messages when a conversation is selected
//   useEffect(() => {
//     if (selectedChat) {
//       const fetchMessages = async () => {
//         setIsLoading(true);
//         try {
//           const response = await fetch(`${API_BASE_URL}/messages/conversation/${selectedChat}`, {
//             ...fetchOptions,
//             method: "GET",
//           });
//           if (!response.ok) throw new Error("Failed to fetch messages");
//           const data = await response.json();
//           setMessages(data.data);
//           setError(null);
//         } catch (err) {
//           setError("Failed to fetch messages");
//           console.error(err);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchMessages();

//       const typingInterval = setInterval(() => {
//         setIsTyping(true);
//         setTimeout(() => setIsTyping(false), 2000);
//       }, 10000);
//       return () => clearInterval(typingInterval);
//     }
//   }, [selectedChat]);

//   const handleSendMessage = async () => {
//     if (messageText.trim() && selectedChat) {
//       try {
//         const response = await fetch(`${API_BASE_URL}/messages/send`, {
//           ...fetchOptions,
//           method: "POST",
//           body: JSON.stringify({
//             conversationId: selectedChat,
//             text: messageText,
//           }),
//         });
//         if (!response.ok) throw new Error("Failed to send message");
//         const data = await response.json();
//         setMessages((prev) => [...prev, data.data]);
//         setMessageText("");

//         // Refresh conversations
//         const convResponse = await fetch(`${API_BASE_URL}/messages/conversations`, {
//           ...fetchOptions,
//           method: "GET",
//         });
//         if (!convResponse.ok) throw new Error("Failed to fetch conversations");
//         const convData = await convResponse.json();
//         setConversations(convData.data);
//       } catch (err) {
//         setError("Failed to send message");
//         console.error(err);
//       }
//     }
//   };

//   const handleStartConversation = async (userId: string) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/messages/start`, {
//         ...fetchOptions,
//         method: "POST",
//         body: JSON.stringify({ userB: userId }),
//       });
//       if (!response.ok) throw new Error("Failed to start conversation");
//       const data = await response.json();
//       const newConversation = data.data;
//       setConversations((prev) => [newConversation, ...prev.filter((c) => c._id !== newConversation._id)]);
//       setSelectedChat(newConversation._id);
//     } catch (err) {
//       setError("Failed to start conversation");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
//       <div className="flex h-full">
//         <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
//           <div className="p-4 border-b border-gray-200 bg-gray-50">
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search connections..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             {isLoading ? (
//               <div className="text-center text-gray-500">Loading connections...</div>
//             ) : error ? (
//               <div className="text-center text-red-500">{error}</div>
//             ) : connections.length === 0 ? (
//               <div className="text-center text-gray-500">No connections found</div>
//             ) : (
//               connections.map((conn) => {
//                 const conversation = conversations.find((c) =>
//                   c.participants.some((p) => p._id === conn._id)
//                 );
//                 const unread = conversation
//                   ? (conversation.unreadCount instanceof Map
//                     ? conversation.unreadCount.get(userId || "")
//                     : conversation.unreadCount?.[userId || ""]) || 0
//                   : 0;

//                 return (
//                   <div
//                     key={conn._id}
//                     onClick={() => {
//                       if (conversation) {
//                         setSelectedChat(conversation._id);
//                       } else {
//                         handleStartConversation(conn._id);
//                       }
//                     }}
//                     className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${selectedChat === conversation?._id ? "bg-rose-50" : ""
//                       }`}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <img src={conn.avatar || '/default-avatar.png'} alt={conn.fullName || 'User'} className="w-10 h-10 rounded-full object-cover" />
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center justify-between mb-1">
//                           <h3 className="font-semibold text-gray-900 truncate">
//                             {
//                               conn.fullName ||
//                               conversation?.participants.find((p) => p._id !== userId)?.fullName ||
//                               'Unknown User'
//                             }
//                           </h3>
//                           {conversation?.lastMessage && (
//                             <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
//                               {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), {
//                                 addSuffix: true,
//                               })}
//                             </span>
//                           )}
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm text-gray-600 truncate">
//                             {conversation?.lastMessage?.text || "No messages yet"}
//                           </p>
//                           {unread > 0 && (
//                             <span className="ml-2 bg-rose-600 text-white text-xs rounded-full px-2 py-0.5 flex-shrink-0">
//                               {unread}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>
//         <div className="hidden md:flex flex-1 flex-col">
//           {selectedChat ? (
//             <>
//               <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center space-x-3">
//                 <img
//                   src={
//                     conversations
//                       .find((c) => c._id === selectedChat)
//                       ?.participants.find((p) => p._id !== userId)?.avatar || '/default-avatar.png'
//                   }
//                   alt={
//                     conversations
//                       .find((c) => c._id === selectedChat)
//                       ?.participants.find((p) => p._id !== userId)?.fullName || 'User'
//                   }
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <h3 className="font-semibold text-gray-900">
//                   {conversations
//                     .find((c) => c._id === selectedChat)
//                     ?.participants.find((p) => p._id !== userId)?.fullName || 'Unknown User'}
//                 </h3>
//               </div>
//               <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {isLoading ? (
//                   <div className="text-center text-gray-500">Loading messages...</div>
//                 ) : error ? (
//                   <div className="text-center text-red-500">{error}</div>
//                 ) : (
//                   <>
//                     {messages.map((msg) => (
//                       <div
//                         key={msg._id}
//                         className={`flex ${msg.sender._id === userId ? "justify-end" : "justify-start"
//                           }`}
//                       >
//                         <div className="flex items-start space-x-2 max-w-xs md:max-w-md">
//                           {msg.sender._id !== userId && (
//                             <img
//                               src={msg.sender.avatar || '/default-avatar.png'}
//                               alt={msg.sender.fullName || 'User'}
//                               className="w-8 h-8 rounded-full object-cover"
//                             />
//                           )}
//                           <div
//                             className={`px-4 py-2 rounded-lg ${msg.sender._id === userId
//                                 ? "bg-rose-600 text-white"
//                                 : "bg-gray-100 text-gray-900"
//                               }`}
//                           >
//                             <p>{msg.text}</p>
//                             <p
//                               className={`text-xs mt-1 ${msg.sender._id === userId ? "text-rose-100" : "text-gray-500"
//                                 }`}
//                             >
//                               {format(new Date(msg.createdAt), "p")}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     {isTyping && (
//                       <div className="flex justify-start">
//                         <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
//                           <p className="text-sm">Typing...</p>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//               <div className="p-4 border-t border-gray-200 bg-gray-50">
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={messageText}
//                     onChange={(e) => setMessageText(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                     placeholder="Type your message..."
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                   />
//                   <button
//                     onClick={handleSendMessage}
//                     className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center space-x-2"
//                   >
//                     <Send className="h-5 w-5" />
//                     <span>Send</span>
//                   </button>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex items-center justify-center text-gray-400">
//               <div className="text-center">
//                 <MessageCircle className="h-16 w-16 mx-auto mb-4" />
//                 <p className="text-lg">Select a connection to start messaging</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export { Messages };