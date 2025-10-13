// import React, { useState, useEffect } from "react";
// import { MessageCircle, Send, Search, MoreVertical, Paperclip, Smile, Phone, Video } from "lucide-react";

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
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const token = localStorage.getItem("authToken");
//   const userId = localStorage.getItem("userId");

//   // Common fetch headers
//   const fetchOptions = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };

//   // Helper function to format time
//   const formatTime = (date: Date) => {
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const formattedHours = hours % 12 || 12;
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//     return `${formattedHours}:${formattedMinutes} ${ampm}`;
//   };

//   // Helper function to format relative time
//   const formatRelativeTime = (date: Date) => {
//     const now = new Date();
//     const diffInMs = now.getTime() - date.getTime();
//     const diffInMins = Math.floor(diffInMs / 60000);
//     const diffInHours = Math.floor(diffInMs / 3600000);
//     const diffInDays = Math.floor(diffInMs / 86400000);

//     if (diffInMins < 1) return 'Just now';
//     if (diffInMins < 60) return `${diffInMins}m ago`;
//     if (diffInHours < 24) return `${diffInHours}h ago`;
//     if (diffInDays < 7) return `${diffInDays}d ago`;
//     return `${Math.floor(diffInDays / 7)}w ago`;
//   };

//   // Fetch accepted connections and conversations (ORIGINAL LOGIC)
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

//   // Fetch messages when a conversation is selected (ORIGINAL LOGIC)
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

//   // Send message handler (ORIGINAL LOGIC)
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

//   // Start conversation handler (ORIGINAL LOGIC)
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

//   // Filter connections based on search
//   const filteredConnections = connections.filter((conn) =>
//     conn.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="fixed inset-0 bg-white">
//       <div className="flex h-full">
//         {/* Sidebar - Enhanced UI */}
//         <div className="w-full md:w-96 border-r border-gray-200 flex flex-col bg-gradient-to-b from-gray-50 to-white">
//           {/* Header - Enhanced */}
//           <div className="p-6 border-b border-gray-200 bg-white">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
//                 Messages
//               </h2>
//               <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                 <MoreVertical className="h-5 w-5 text-gray-600" />
//               </button>
//             </div>
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search connections..."
//                 className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent focus:bg-white transition-all"
//               />
//             </div>
//           </div>

//           {/* Connections List - Enhanced UI with ORIGINAL LOGIC */}
//           <div className="flex-1 overflow-y-auto">
//             {isLoading ? (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center text-gray-500">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto mb-2"></div>
//                   <p>Loading connections...</p>
//                 </div>
//               </div>
//             ) : error ? (
//               <div className="text-center text-red-500 p-4">{error}</div>
//             ) : filteredConnections.length === 0 ? (
//               <div className="flex items-center justify-center h-full text-gray-400">
//                 <div className="text-center p-6">
//                   <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
//                   <p className="text-lg font-medium mb-2">No connections yet</p>
//                   <p className="text-sm">Accept connection requests to start messaging</p>
//                 </div>
//               </div>
//             ) : (
//               filteredConnections.map((conn) => {
//                 const conversation = conversations.find((c) =>
//                   c.participants.some((p) => p._id === conn._id)
//                 );
//                 const unread = conversation
//                   ? (conversation.unreadCount instanceof Map
//                     ? conversation.unreadCount.get(userId || "")
//                     : conversation.unreadCount?.[userId || ""]) || 0
//                   : 0;
//                 const isSelected = selectedChat === conversation?._id;

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
//                     className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${
//                       isSelected
//                         ? "bg-gradient-to-r from-rose-50 to-pink-50 border-l-4 border-l-rose-600"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <div className="relative flex-shrink-0">
//                         <img
//                           src={conn.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(conn.fullName || 'User')}&background=random`}
//                           alt={conn.fullName || "User"}
//                           className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-md"
//                           onError={(e) => {
//                             e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(conn.fullName || 'User')}&background=random`;
//                           }}
//                         />
//                         <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center justify-between mb-1">
//                           <h3 className="font-semibold text-gray-900 truncate text-base">
//                             {conn.fullName ||
//                               conversation?.participants.find((p) => p._id !== userId)?.fullName ||
//                               "Unknown User"}
//                           </h3>
//                           {conversation?.lastMessage && (
//                             <span className="text-xs text-gray-500 flex-shrink-0 ml-2 font-medium">
//                               {formatRelativeTime(new Date(conversation.lastMessage.createdAt))}
//                             </span>
//                           )}
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <p className={`text-sm truncate ${unread > 0 ? "font-semibold text-gray-900" : "text-gray-600"}`}>
//                             {conversation?.lastMessage?.text || "No messages yet"}
//                           </p>
//                           {unread > 0 && (
//                             <span className="ml-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs rounded-full px-2.5 py-1 flex-shrink-0 font-semibold shadow-sm">
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

//         {/* Chat Area - Enhanced UI */}
//         <div className="hidden md:flex flex-1 flex-col bg-gray-50">
//           {selectedChat ? (
//             <>
//               {/* Chat Header - Enhanced */}
//               <div className="p-4 border-b border-gray-200 bg-white shadow-sm flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="relative">
//                     <img
//                       src={
//                         conversations
//                           .find((c) => c._id === selectedChat)
//                           ?.participants.find((p) => p._id !== userId)?.avatar ||
//                         `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                           conversations
//                             .find((c) => c._id === selectedChat)
//                             ?.participants.find((p) => p._id !== userId)?.fullName || "User"
//                         )}&background=random`
//                       }
//                       alt={
//                         conversations
//                           .find((c) => c._id === selectedChat)
//                           ?.participants.find((p) => p._id !== userId)?.fullName || "User"
//                       }
//                       className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
//                     />
//                     <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900 text-lg">
//                       {conversations
//                         .find((c) => c._id === selectedChat)
//                         ?.participants.find((p) => p._id !== userId)?.fullName || "Unknown User"}
//                     </h3>
//                     <p className="text-xs text-green-600 font-medium">Active now</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
//                     <Phone className="h-5 w-5 text-gray-600" />
//                   </button>
//                   <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
//                     <Video className="h-5 w-5 text-gray-600" />
//                   </button>
//                   <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
//                     <MoreVertical className="h-5 w-5 text-gray-600" />
//                   </button>
//                 </div>
//               </div>

//               {/* Messages Area - Enhanced */}
//               <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100">
//                 {isLoading ? (
//                   <div className="flex items-center justify-center h-full">
//                     <div className="text-center text-gray-500">
//                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600 mx-auto mb-2"></div>
//                       <p>Loading messages...</p>
//                     </div>
//                   </div>
//                 ) : error ? (
//                   <div className="text-center text-red-500">{error}</div>
//                 ) : (
//                   <>
//                     {messages.map((msg, index) => {
//                       const isOwn = msg.sender._id === userId;
//                       const showAvatar = index === 0 || messages[index - 1].sender._id !== msg.sender._id;

//                       return (
//                         <div
//                           key={msg._id}
//                           className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
//                         >
//                           <div className={`flex items-end space-x-2 max-w-md ${isOwn ? "flex-row-reverse space-x-reverse" : ""}`}>
//                             {!isOwn && (
//                               <img
//                                 src={msg.sender.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.sender.fullName || 'User')}&background=random`}
//                                 alt={msg.sender.fullName || "User"}
//                                 className={`w-8 h-8 rounded-full object-cover shadow-md ${showAvatar ? "opacity-100" : "opacity-0"}`}
//                               />
//                             )}
//                             <div
//                               className={`px-4 py-3 rounded-2xl shadow-sm ${
//                                 isOwn
//                                   ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-br-sm"
//                                   : "bg-white text-gray-900 rounded-bl-sm"
//                               }`}
//                             >
//                               <p className="text-sm leading-relaxed">{msg.text}</p>
//                               <p
//                                 className={`text-xs mt-1 ${
//                                   isOwn ? "text-rose-100" : "text-gray-500"
//                                 }`}
//                               >
//                                 {formatTime(new Date(msg.createdAt))}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                     {isTyping && (
//                       <div className="flex justify-start">
//                         <div className="bg-white text-gray-900 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
//                           <div className="flex space-x-1">
//                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
//                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
//                             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>

//               {/* Message Input - Enhanced */}
//               <div className="p-4 bg-white border-t border-gray-200">
//                 <div className="flex items-end space-x-3">
//                   <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
//                     <Paperclip className="h-5 w-5 text-gray-600" />
//                   </button>
//                   <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-200 transition-all">
//                     <input
//                       type="text"
//                       value={messageText}
//                       onChange={(e) => setMessageText(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                       placeholder="Type your message..."
//                       className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-900 placeholder-gray-500"
//                     />
//                   </div>
//                   <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
//                     <Smile className="h-5 w-5 text-gray-600" />
//                   </button>
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={!messageText.trim()}
//                     className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center space-x-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//                   >
//                     <Send className="h-5 w-5" />
//                     <span>Send</span>
//                   </button>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="flex-1 flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
//               <div className="text-center">
//                 <div className="relative inline-block mb-6">
//                   <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
//                   <MessageCircle className="h-20 w-20 mx-auto relative text-gray-300" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-600 mb-2">Your Messages</h3>
//                 <p className="text-gray-500">Select a connection to start messaging</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export { Messages };

import React, { useState, useEffect } from "react";
import { MessageCircle, Send, Search } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

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

const API_BASE_URL = "https://matrimonial-backend-14t2.onrender.com/api";

const Messages: React.FC<MessagesProps> = ({ onNavigate }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [connections, setConnections] = useState<User[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  // Common fetch headers
  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Fetch accepted connections and conversations
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch accepted connections
        const connectionsResponse = await fetch(`${API_BASE_URL}/request/connections/accepted`, {
          ...fetchOptions,
          method: "GET",
        });
        if (!connectionsResponse.ok) throw new Error("Failed to fetch connections");
        const connectionsData = await connectionsResponse.json();
        console.log("Connections:", connectionsData.data);
        setConnections(connectionsData.data);

        // Fetch conversations
        const conversationsResponse = await fetch(`${API_BASE_URL}/messages/conversations`, {
          ...fetchOptions,
          method: "GET",
        });
        if (!conversationsResponse.ok) throw new Error("Failed to fetch conversations");
        const conversationsData = await conversationsResponse.json();
        console.log("Conversations:", conversationsData.data);
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

  // Fetch messages when a conversation is selected
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
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMessages();

      const typingInterval = setInterval(() => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }, 10000);
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

        // Refresh conversations
        const convResponse = await fetch(`${API_BASE_URL}/messages/conversations`, {
          ...fetchOptions,
          method: "GET",
        });
        if (!convResponse.ok) throw new Error("Failed to fetch conversations");
        const convData = await convResponse.json();
        setConversations(convData.data);
      } catch (err) {
        setError("Failed to send message");
        console.error(err);
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
      if (!response.ok) throw new Error("Failed to start conversation");
      const data = await response.json();
      const newConversation = data.data;
      setConversations((prev) => [newConversation, ...prev.filter((c) => c._id !== newConversation._id)]);
      setSelectedChat(newConversation._id);
    } catch (err) {
      setError("Failed to start conversation");
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
      <div className="flex h-full">
        <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search connections..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="text-center text-gray-500">Loading connections...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : connections.length === 0 ? (
              <div className="text-center text-gray-500">No connections found</div>
            ) : (
              connections.map((conn) => {
                const conversation = conversations.find((c) =>
                  c.participants.some((p) => p._id === conn._id)
                );
                const unread = conversation
                  ? (conversation.unreadCount instanceof Map
                    ? conversation.unreadCount.get(userId || "")
                    : conversation.unreadCount?.[userId || ""]) || 0
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
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${selectedChat === conversation?._id ? "bg-rose-50" : ""
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img src={conn.avatar || '/default-avatar.png'} alt={conn.fullName || 'User'} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {
                              conn.fullName ||
                              conversation?.participants.find((p) => p._id !== userId)?.fullName ||
                              'Unknown User'
                            }
                          </h3>
                          {conversation?.lastMessage && (
                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                              {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {conversation?.lastMessage?.text || "No messages yet"}
                          </p>
                          {unread > 0 && (
                            <span className="ml-2 bg-rose-600 text-white text-xs rounded-full px-2 py-0.5 flex-shrink-0">
                              {unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="hidden md:flex flex-1 flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center space-x-3">
                <img
                  src={
                    conversations
                      .find((c) => c._id === selectedChat)
                      ?.participants.find((p) => p._id !== userId)?.avatar || '/default-avatar.png'
                  }
                  alt={
                    conversations
                      .find((c) => c._id === selectedChat)
                      ?.participants.find((p) => p._id !== userId)?.fullName || 'User'
                  }
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h3 className="font-semibold text-gray-900">
                  {conversations
                    .find((c) => c._id === selectedChat)
                    ?.participants.find((p) => p._id !== userId)?.fullName || 'Unknown User'}
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                  <div className="text-center text-gray-500">Loading messages...</div>
                ) : error ? (
                  <div className="text-center text-red-500">{error}</div>
                ) : (
                  <>
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`flex ${msg.sender._id === userId ? "justify-end" : "justify-start"
                          }`}
                      >
                        <div className="flex items-start space-x-2 max-w-xs md:max-w-md">
                          {msg.sender._id !== userId && (
                            <img
                              src={msg.sender.avatar || '/default-avatar.png'}
                              alt={msg.sender.fullName || 'User'}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <div
                            className={`px-4 py-2 rounded-lg ${msg.sender._id === userId
                                ? "bg-rose-600 text-white"
                                : "bg-gray-100 text-gray-900"
                              }`}
                          >
                            <p>{msg.text}</p>
                            <p
                              className={`text-xs mt-1 ${msg.sender._id === userId ? "text-rose-100" : "text-gray-500"
                                }`}
                            >
                              {format(new Date(msg.createdAt), "p")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                          <p className="text-sm">Typing...</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Select a connection to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Messages };