// import React, { useState, useEffect, useRef } from "react";
// import { MessageCircle, Send, Search, MoreVertical, Heart } from "lucide-react";
// import api from "../services/api";

// interface User {
//   _id: string;
//   fullName: string;
//   photos?: {
//     isPrimary: boolean;
//     photoUrl: string;
//   }[];
// }

// interface Conversation {
//   _id: string;
//   participants: User[];
//   lastMessage: { _id: string; text: string; createdAt: Date; sender: string } | null;
//   unreadCount: { [key: string]: number };
// }

// interface Message {
//   _id: string;
//   sender: User | string;
//   text: string;
//   createdAt: Date;
// }

// interface MessagesProps {
//   onNavigate: (page: string) => void;
// }

// // // const API_BASE_URL = "http://localhost:5000/api";
// const API_BASE_URL = "https://api.rsaristomatch.com/api";

// const getUserProfilePhoto = (user: any) => {
//   const photos =
//     user?.photos ||
//     user?.profile?.photos ||
//     user?.profilePhotos ||
//     user?.approvedPhotos;

//   if (photos && Array.isArray(photos) && photos.length > 0) {
//     const primaryPhoto = photos.find((p: any) => p.isPrimary) || photos[0];
    
//     if (primaryPhoto && primaryPhoto.photoUrl) {
//       return primaryPhoto.photoUrl;
//     }
//   }
  
//   return 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800';
// };

// const formatTime = (date: Date) => {
//   const d = new Date(date);
//   let hours = d.getHours();
//   const minutes = d.getMinutes();
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12;
//   hours = hours ? hours : 12;
//   const minutesStr = minutes < 10 ? '0' + minutes : minutes;
//   return `${hours}:${minutesStr} ${ampm}`;
// };

// const formatRelativeTime = (date: Date) => {
//   const now = new Date();
//   const diff = now.getTime() - new Date(date).getTime();
//   const seconds = Math.floor(diff / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);

//   if (days > 1) return `${days}d`;
//   if (days === 1) return '1d';
//   if (hours > 0) return `${hours}h`;
//   if (minutes > 0) return `${minutes}m`;
//   return 'now';
// };

// const Messages: React.FC<MessagesProps> = ({ onNavigate }) => {
//   const [selectedChat, setSelectedChat] = useState<string | null>(null);
//   const [messageText, setMessageText] = useState<string>("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [connections, setConnections] = useState<any[]>([]);
//   const [photosMap, setPhotosMap] = useState<Record<string, any[]>>({}); // ✅ Store photos map in state
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
  
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const token = localStorage.getItem("authToken");
//   const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
//   const userId = currentUser?.id || currentUser?._id || localStorage.getItem("userId");

//   const fetchOptions = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // ✅ NEW: Reusable function to fetch and augment conversations
//   const fetchAndAugmentConversations = async (existingPhotosMap?: Record<string, any[]>) => {
//     try {
//       const conversationsResponse = await fetch(`${API_BASE_URL}/messages/conversations`, fetchOptions);
      
//       if (!conversationsResponse.ok) throw new Error("Failed to fetch conversations");
      
//       const conversationsData = await conversationsResponse.json();
      
//       // Use existing photos map if provided, otherwise use the one from state
//       const photosToUse = existingPhotosMap || photosMap;
      
//       // Augment conversations with photos from the map
//       const augmentedConversations = (conversationsData.data || []).map((conv: Conversation) => {
//         const newParticipants = conv.participants.map(p => {
//           if (photosToUse[p._id]) {
//             return { ...p, photos: photosToUse[p._id] };
//           }
//           return p;
//         });
        
//         return { ...conv, participants: newParticipants };
//       });
      
//       setConversations(augmentedConversations);
//       return augmentedConversations;
//     } catch (error) {
//       console.error("❌ Error fetching conversations:", error);
//       throw error;
//     }
//   };

//   // ✅ Initial data fetch
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         // Fetch conversations and connections in parallel
//         const [conversationsResponse, connectionsResponse] = await Promise.all([
//           fetch(`${API_BASE_URL}/messages/conversations`, fetchOptions),
//           fetch(`${API_BASE_URL}/request/connections/accepted`, fetchOptions)
//         ]);

//         if (!conversationsResponse.ok) throw new Error("Failed to fetch conversations");
//         if (!connectionsResponse.ok) throw new Error("Failed to fetch connections");

//         const conversationsData = await conversationsResponse.json();
//         const connectionsData = await connectionsResponse.json();

//         setConnections(connectionsData.data || []);

//         // ✅ FIXED: Create photos map from connections data
//         const newPhotosMap: Record<string, any[]> = {};
//         (connectionsData.data || []).forEach((conn: any) => {
//           // Connection data is already the user object itself!
//           if (conn._id && conn.photos && Array.isArray(conn.photos)) {
//             newPhotosMap[conn._id] = conn.photos;
//           }
//         });

//         // ✅ Store photos map in state
//         setPhotosMap(newPhotosMap);

//         // Augment conversations with photos from the map
//         const augmentedConversations = (conversationsData.data || []).map((conv: Conversation) => {
//           const newParticipants = conv.participants.map(p => {
//             if (newPhotosMap[p._id]) {
//               return { ...p, photos: newPhotosMap[p._id] };
//             }
//             return p;
//           });
          
//           return { ...conv, participants: newParticipants };
//         });

//         setConversations(augmentedConversations);
//         setError(null);

//       } catch (err) {
//         setError("Failed to fetch data");
//         console.error("❌ Error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [userId]);

//   useEffect(() => {
//   if (!selectedChat) return;

//   const interval = setInterval(async () => {
//     const res = await fetch(
//       `${API_BASE_URL}/messages/conversation/${selectedChat}`,
//       fetchOptions
//     );
//     const data = await res.json();
//     setMessages(data.data || []);
//   }, 1000); // every 3 seconds

//   return () => clearInterval(interval);
// }, [selectedChat]);


//   // ✅ FIXED: Send message with proper conversation refresh
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

//         // ✅ FIXED: Use the reusable function that preserves photos
//         await fetchAndAugmentConversations(photosMap);
        
//       } catch (err) {
//         setError("Failed to send message");
//         console.error("❌ Error:", err);
//       }
//     }
//   };

//   const getOtherUser = (conversation: Conversation) => {
//     if (!conversation || !conversation.participants) {
//       return null;
//     }
    
//     const otherUser = conversation.participants.find(p => p._id !== userId) || conversation.participants[0];
    
//     return otherUser;
//   };

//   if (connections.length === 0 && !isLoading) {
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md mt-16">
//         <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full mx-4 text-center transform transition-all animate-fadeIn">
//           <div className="mb-6">
//             <div className="w-24 h-24 mx-auto bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
//               <MessageCircle className="w-12 h-12 text-rose-600" />
//             </div>
//           </div>

//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
//             No Connections Yet
//           </h2>

//           <p className="text-gray-600 mb-8 leading-relaxed">
//             You don't have any accepted connection requests yet. Start by sending requests to profiles you're interested in or browse potential matches!
//           </p>

//           <div className="space-y-3">
//             <button
//               onClick={() => onNavigate('search')}
//               className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-semibold hover:from-rose-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
//             >
//               <Search className="w-5 h-5" />
//               Browse Profiles
//             </button>

//             <button
//               onClick={() => onNavigate('requests')}
//               className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-rose-600 text-rose-600 rounded-xl font-semibold hover:bg-rose-50 transition-all"
//             >
//               <Heart className="w-5 h-5" />
//               View Requests
//             </button>

//             <button
//               onClick={() => onNavigate('dashboard')}
//               className="w-full px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium"
//             >
//               Go to Dashboard
//             </button>
//           </div>

//           <div className="mt-8 pt-6 border-t border-gray-100">
//             <p className="text-sm text-gray-500">
//               💡 Tip: Complete your profile to get better matches!
//             </p>
//           </div>
//         </div>

//         <style>{`
//           @keyframes fadeIn {
//             from {
//               opacity: 0;
//               transform: scale(0.9);
//             }
//             to {
//               opacity: 1;
//               transform: scale(1);
//             }
//           }
//           .animate-fadeIn {
//             animation: fadeIn 0.3s ease-out;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 flex bg-white mt-20">
//       <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col h-full">
//         <div className="px-4 py-4 flex items-center justify-between border-b border-gray-200 bg-white flex-shrink-0">
//           <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
//           <button className="hover:bg-gray-100 rounded-full p-2 transition-colors">
//             <MoreVertical className="h-5 w-5 text-gray-600" />
//           </button>
//         </div>

//         <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search conversations"
//               className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
//             />
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {conversations.map((conversation) => {
//             const otherUser = getOtherUser(conversation);
//             if (!otherUser) {
//               return null;
//             }
            
//             const unread = conversation.unreadCount?.[userId] || 0;
//             const avatarUrl = getUserProfilePhoto(otherUser);

//             return (
//               <div
//                 key={conversation._id}
//                 onClick={() => {
//                   setSelectedChat(conversation._id);
//                   if (conversation.unreadCount) {
//                     conversation.unreadCount[userId] = 0;
//                   }
//                   setConversations([...conversations]);
//                 }}

//                 className={`flex items-center px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 ${
//                   selectedChat === conversation._id ? "bg-rose-50" : "hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="relative flex-shrink-0">
//                   <img
//                     src={avatarUrl}
//                     alt={otherUser.fullName}
//                     className="w-12 h-12 rounded-full object-cover bg-gray-200"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800';
//                     }}
//                   />

//                   {unread > 0 && (
//                     <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow-lg">
//                       {unread > 99 ? "99+" : unread}
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex-1 ml-3 min-w-0">
//                   <div className="flex justify-between items-baseline mb-1">
//                     <h3 className="font-semibold text-gray-900 truncate">
//                       {otherUser.fullName || "Unknown User"}
//                     </h3>

//                     {conversation.lastMessage && (
//                       <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
//                         {formatRelativeTime(conversation.lastMessage.createdAt)}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600 truncate flex-1">
//                       {conversation.lastMessage?.text || "Start chatting"}
//                     </p>
//                     {unread > 0 && (
//                       <span className="ml-2 bg-rose-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
//                         {unread}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <div className="hidden md:flex flex-1 flex-col h-full">
//         {selectedChat ? (
//           <>
//             <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
//               {(() => {
//                 const conversation = conversations.find((c) => c._id === selectedChat);
//                 const otherUser = getOtherUser(conversation!);
//                 const avatarUrl = getUserProfilePhoto(otherUser);
                
//                 return (
//                   <>
//                     <img
//                       src={avatarUrl}
//                       alt={otherUser?.fullName || "User"}
//                       className="w-11 h-11 rounded-full object-cover bg-gray-200"
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800';
//                       }}
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-gray-900">
//                         {otherUser?.fullName || "Unknown User"}
//                       </h3>
//                       {isTyping && (
//                         <p className="text-xs text-rose-600">typing...</p>
//                       )}
//                     </div>
//                   </>
//                 );
//               })()}
//             </div>

//             <div 
//               className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//               }}
//             >
//               <div className="space-y-4">
//                 {messages.map((msg) => {
//                   const senderId = typeof msg.sender === 'object' ? (msg.sender as User)._id : msg.sender;
//                   const isSentByMe = senderId === userId;
                  
//                   return (
//                     <div
//                       key={msg._id}
//                       className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
//                     >
//                       <div
//                         className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${
//                           isSentByMe
//                             ? "bg-green-500 text-white rounded-br-none"
//                             : "bg-white text-gray-900 rounded-bl-none"
//                         }`}
//                       >
//                         <p className="text-sm leading-relaxed break-words">{msg.text}</p>
//                         <p
//                           className={`text-[10px] mt-1 text-right ${
//                             isSentByMe ? "text-green-100" : "text-gray-500"
//                           }`}
//                         >
//                           {formatTime(msg.createdAt)}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//                 <div ref={messagesEndRef} />
//               </div>
//             </div>

//             <div className="px-6 py-4 bg-white border-t border-gray-200 flex-shrink-0">
//               <div className="flex items-center gap-3">
//                 <input
//                   type="text"
//                   value={messageText}
//                   onChange={(e) => setMessageText(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                   placeholder="Type a message..."
//                   className="flex-1 px-4 py-3 bg-gray-50 rounded-full text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none focus:bg-white transition-all"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   disabled={!messageText.trim()}
//                   className="bg-rose-500 text-white rounded-full p-3 hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
//                 >
//                   <Send className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
//             <MessageCircle className="h-24 w-24 mb-4 text-gray-300" />
//             <p className="text-xl font-semibold text-gray-600 mb-2">Select a conversation</p>
//             <p className="text-sm text-gray-400">Choose a chat from the left to start messaging</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export { Messages };

// import React, { useState, useEffect, useRef } from "react";
// import { MessageCircle, Send, Search, MoreVertical, Heart } from "lucide-react";
// import api from "../services/api";

// interface User {
//   _id: string;
//   fullName: string;
//   photos?: {
//     isPrimary: boolean;
//     photoUrl: string;
//   }[];
// }

// interface Conversation {
//   _id: string;
//   participants: User[];
//   lastMessage: { _id: string; text: string; createdAt: Date; sender: string } | null;
//   unreadCount: { [key: string]: number };
// }

// interface Message {
//   _id: string;
//   sender: User | string;
//   text: string;
//   createdAt: Date;
// }

// interface MessagesProps {
//   onNavigate: (page: string) => void;
// }

// const getUserProfilePhoto = (user: any) => {
//   const photos =
//     user?.photos ||
//     user?.profile?.photos ||
//     user?.profilePhotos ||
//     user?.approvedPhotos;

//   if (photos && Array.isArray(photos) && photos.length > 0) {
//     const primaryPhoto = photos.find((p: any) => p.isPrimary) || photos[0];
    
//     if (primaryPhoto && primaryPhoto.photoUrl) {
//       return primaryPhoto.photoUrl;
//     }
//   }
  
//   return 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800';
// };

// const formatTime = (date: Date) => {
//   const d = new Date(date);
//   let hours = d.getHours();
//   const minutes = d.getMinutes();
//   const ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12;
//   hours = hours ? hours : 12;
//   const minutesStr = minutes < 10 ? '0' + minutes : minutes;
//   return `${hours}:${minutesStr} ${ampm}`;
// };

// const formatRelativeTime = (date: Date) => {
//   const now = new Date();
//   const diff = now.getTime() - new Date(date).getTime();
//   const seconds = Math.floor(diff / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);

//   if (days > 1) return `${days}d`;
//   if (days === 1) return '1d';
//   if (hours > 0) return `${hours}h`;
//   if (minutes > 0) return `${minutes}m`;
//   return 'now';
// };

// const Messages: React.FC<MessagesProps> = ({ onNavigate }) => {
//   const [selectedChat, setSelectedChat] = useState<string | null>(null);
//   const [messageText, setMessageText] = useState<string>("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [connections, setConnections] = useState<any[]>([]);
//   const [photosMap, setPhotosMap] = useState<Record<string, any[]>>({});
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
  
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
//   const userId = currentUser?.id || currentUser?._id || localStorage.getItem("userId");

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // ✅ FIXED: Reusable function using centralized API
//   const fetchAndAugmentConversations = async (existingPhotosMap?: Record<string, any[]>) => {
//     try {
//       const conversationsResponse = await api.get('/messages/conversations');
      
//       const photosToUse = existingPhotosMap || photosMap;
      
//       const augmentedConversations = (conversationsResponse.data.data || []).map((conv: Conversation) => {
//         const newParticipants = conv.participants.map(p => {
//           if (photosToUse[p._id]) {
//             return { ...p, photos: photosToUse[p._id] };
//           }
//           return p;
//         });
        
//         return { ...conv, participants: newParticipants };
//       });
      
//       setConversations(augmentedConversations);
//       return augmentedConversations;
//     } catch (error) {
//       console.error("❌ Error fetching conversations:", error);
//       throw error;
//     }
//   };

//   // ✅ FIXED: Initial data fetch using centralized API
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         // ✅ FIXED: Using centralized API
//         const [conversationsResponse, connectionsResponse] = await Promise.all([
//           api.get('/messages/conversations'),
//           api.get('/request/connections/accepted')
//         ]);

//         setConnections(connectionsResponse.data.data || []);

//         // ✅ Create photos map from connections data
//         const newPhotosMap: Record<string, any[]> = {};
//         (connectionsResponse.data.data || []).forEach((conn: any) => {
//           if (conn._id && conn.photos && Array.isArray(conn.photos)) {
//             newPhotosMap[conn._id] = conn.photos;
//           }
//         });

//         setPhotosMap(newPhotosMap);

//         // Augment conversations with photos from the map
//         const augmentedConversations = (conversationsResponse.data.data || []).map((conv: Conversation) => {
//           const newParticipants = conv.participants.map(p => {
//             if (newPhotosMap[p._id]) {
//               return { ...p, photos: newPhotosMap[p._id] };
//             }
//             return p;
//           });
          
//           return { ...conv, participants: newParticipants };
//         });

//         setConversations(augmentedConversations);
//         setError(null);

//       } catch (err) {
//         setError("Failed to fetch data");
//         console.error("❌ Error:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, [userId]);

//   // ✅ FIXED: Polling messages using centralized API
//   useEffect(() => {
//     if (!selectedChat) return;

//     const interval = setInterval(async () => {
//       try {
//         const response = await api.get(`/messages/conversation/${selectedChat}`);
//         setMessages(response.data.data || []);
//       } catch (error) {
//         console.error("Error polling messages:", error);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [selectedChat]);

//   // ✅ FIXED: Send message using centralized API
//   const handleSendMessage = async () => {
//     if (messageText.trim() && selectedChat) {
//       try {
//         const response = await api.post('/messages/send', {
//           conversationId: selectedChat,
//           text: messageText,
//         });
        
//         setMessages((prev) => [...prev, response.data.data]);
//         setMessageText("");

//         await fetchAndAugmentConversations(photosMap);
        
//       } catch (err) {
//         setError("Failed to send message");
//         console.error("❌ Error:", err);
//       }
//     }
//   };

//   const getOtherUser = (conversation: Conversation) => {
//     if (!conversation || !conversation.participants) {
//       return null;
//     }
    
//     const otherUser = conversation.participants.find(p => p._id !== userId) || conversation.participants[0];
    
//     return otherUser;
//   };

//   if (connections.length === 0 && !isLoading) {
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md mt-16">
//         <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full mx-4 text-center transform transition-all animate-fadeIn">
//           <div className="mb-6">
//             <div className="w-24 h-24 mx-auto bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
//               <MessageCircle className="w-12 h-12 text-rose-600" />
//             </div>
//           </div>

//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
//             No Connections Yet
//           </h2>

//           <p className="text-gray-600 mb-8 leading-relaxed">
//             You don't have any accepted connection requests yet. Start by sending requests to profiles you're interested in or browse potential matches!
//           </p>

//           <div className="space-y-3">
//             <button
//               onClick={() => onNavigate('search')}
//               className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-semibold hover:from-rose-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
//             >
//               <Search className="w-5 h-5" />
//               Browse Profiles
//             </button>

//             <button
//               onClick={() => onNavigate('requests')}
//               className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-rose-600 text-rose-600 rounded-xl font-semibold hover:bg-rose-50 transition-all"
//             >
//               <Heart className="w-5 h-5" />
//               View Requests
//             </button>

//             <button
//               onClick={() => onNavigate('dashboard')}
//               className="w-full px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium"
//             >
//               Go to Dashboard
//             </button>
//           </div>

//           <div className="mt-8 pt-6 border-t border-gray-100">
//             <p className="text-sm text-gray-500">
//               💡 Tip: Complete your profile to get better matches!
//             </p>
//           </div>
//         </div>

//         <style>{`
//           @keyframes fadeIn {
//             from {
//               opacity: 0;
//               transform: scale(0.9);
//             }
//             to {
//               opacity: 1;
//               transform: scale(1);
//             }
//           }
//           .animate-fadeIn {
//             animation: fadeIn 0.3s ease-out;
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 flex bg-white mt-20">
//       <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col h-full">
//         <div className="px-4 py-4 flex items-center justify-between border-b border-gray-200 bg-white flex-shrink-0">
//           <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
//           <button className="hover:bg-gray-100 rounded-full p-2 transition-colors">
//             <MoreVertical className="h-5 w-5 text-gray-600" />
//           </button>
//         </div>

//         <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search conversations"
//               className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
//             />
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {conversations.map((conversation) => {
//             const otherUser = getOtherUser(conversation);
//             if (!otherUser) {
//               return null;
//             }
            
//             const unread = conversation.unreadCount?.[userId] || 0;
//             const avatarUrl = getUserProfilePhoto(otherUser);

//             return (
//               <div
//                 key={conversation._id}
//                 onClick={() => {
//                   setSelectedChat(conversation._id);
//                   if (conversation.unreadCount) {
//                     conversation.unreadCount[userId] = 0;
//                   }
//                   setConversations([...conversations]);
//                 }}

//                 className={`flex items-center px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 ${
//                   selectedChat === conversation._id ? "bg-rose-50" : "hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="relative flex-shrink-0">
//                   <img
//                     src={avatarUrl}
//                     alt={otherUser.fullName}
//                     className="w-12 h-12 rounded-full object-cover bg-gray-200"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800';
//                     }}
//                   />

//                   {unread > 0 && (
//                     <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow-lg">
//                       {unread > 99 ? "99+" : unread}
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex-1 ml-3 min-w-0">
//                   <div className="flex justify-between items-baseline mb-1">
//                     <h3 className="font-semibold text-gray-900 truncate">
//                       {otherUser.fullName || "Unknown User"}
//                     </h3>

//                     {conversation.lastMessage && (
//                       <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
//                         {formatRelativeTime(conversation.lastMessage.createdAt)}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm text-gray-600 truncate flex-1">
//                       {conversation.lastMessage?.text || "Start chatting"}
//                     </p>
//                     {unread > 0 && (
//                       <span className="ml-2 bg-rose-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
//                         {unread}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <div className="hidden md:flex flex-1 flex-col h-full">
//         {selectedChat ? (
//           <>
//             <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
//               {(() => {
//                 const conversation = conversations.find((c) => c._id === selectedChat);
//                 const otherUser = getOtherUser(conversation!);
//                 const avatarUrl = getUserProfilePhoto(otherUser);
                
//                 return (
//                   <>
//                     <img
//                       src={avatarUrl}
//                       alt={otherUser?.fullName || "User"}
//                       className="w-11 h-11 rounded-full object-cover bg-gray-200"
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800';
//                       }}
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-semibold text-gray-900">
//                         {otherUser?.fullName || "Unknown User"}
//                       </h3>
//                       {isTyping && (
//                         <p className="text-xs text-rose-600">typing...</p>
//                       )}
//                     </div>
//                   </>
//                 );
//               })()}
//             </div>

//             <div 
//               className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50"
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//               }}
//             >
//               <div className="space-y-4">
//                 {messages.map((msg) => {
//                   const senderId = typeof msg.sender === 'object' ? (msg.sender as User)._id : msg.sender;
//                   const isSentByMe = senderId === userId;
                  
//                   return (
//                     <div
//                       key={msg._id}
//                       className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
//                     >
//                       <div
//                         className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${
//                           isSentByMe
//                             ? "bg-green-500 text-white rounded-br-none"
//                             : "bg-white text-gray-900 rounded-bl-none"
//                         }`}
//                       >
//                         <p className="text-sm leading-relaxed break-words">{msg.text}</p>
//                         <p
//                           className={`text-[10px] mt-1 text-right ${
//                             isSentByMe ? "text-green-100" : "text-gray-500"
//                           }`}
//                         >
//                           {formatTime(msg.createdAt)}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//                 <div ref={messagesEndRef} />
//               </div>
//             </div>

//             <div className="px-6 py-4 bg-white border-t border-gray-200 flex-shrink-0">
//               <div className="flex items-center gap-3">
//                 <input
//                   type="text"
//                   value={messageText}
//                   onChange={(e) => setMessageText(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                   placeholder="Type a message..."
//                   className="flex-1 px-4 py-3 bg-gray-50 rounded-full text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none focus:bg-white transition-all"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   disabled={!messageText.trim()}
//                   className="bg-rose-500 text-white rounded-full p-3 hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
//                 >
//                   <Send className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
//             <MessageCircle className="h-24 w-24 mb-4 text-gray-300" />
//             <p className="text-xl font-semibold text-gray-600 mb-2">Select a conversation</p>
//             <p className="text-sm text-gray-400">Choose a chat from the left to start messaging</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export { Messages };

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  MessageCircle,
  Send,
  Search,
  MoreVertical,
  Heart,
  ArrowLeft,
  X,
} from "lucide-react";
import api from "../services/api";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface PhotoObject {
  photoUrl: string;
  isPrimary?: boolean;
}

interface User {
  _id: string;
  fullName: string;
  profilePhotos?: string[];
  photos?: PhotoObject[];
}

interface Conversation {
  _id: string;
  participants: User[];
  lastMessage: {
    _id: string;
    text: string;
    createdAt: string;
    sender: string;
  } | null;
  unreadCount: { [key: string]: number };
}

interface Message {
  _id: string;
  sender: User | string;
  text: string;
  createdAt: string;
}

interface MessagesProps {
  onNavigate: (page: string) => void;
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/**
 * ✅ FIXED localStorage keys — matched to api.js exactly:
 *   token key  → "authToken"
 *   user key   → "user"
 */
const extractUserId = (): string | null => {
  // Try 1: "user" key (matches api.js removeItem("user"))
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.id) return parsed.id;
      if (parsed?._id) return parsed._id;
    }
  } catch {
    /* ignore */
  }

  // Try 2: standalone userId key
  const standalone = localStorage.getItem("userId");
  if (standalone) return standalone;

  // Try 3: decode JWT from "authToken" (matches api.js interceptor)
  try {
    const token = localStorage.getItem("authToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload?.id || payload?._id || payload?.userId || null;
    }
  } catch {
    /* ignore */
  }

  return null;
};

const FALLBACK_IMG = "https://i.pravatar.cc/150?img=1";

/**
 * ✅ Unified photo extractor — handles both backend shapes:
 *   Shape A (conversations): { profilePhotos: ["url1", "url2"] }
 *   Shape B (connections):   { photos: [{ photoUrl, isPrimary }] }
 */
const getUserProfilePhoto = (user: any): string => {
  if (!user) return FALLBACK_IMG;

  // Shape B — photos object array
  if (Array.isArray(user.photos) && user.photos.length > 0) {
    const primary = user.photos.find((p: any) => p?.isPrimary);
    const best = primary || user.photos[0];
    if (best?.photoUrl) return best.photoUrl;
  }

  // Shape A — profilePhotos string array
  if (
    Array.isArray(user.profilePhotos) &&
    user.profilePhotos.length > 0 &&
    typeof user.profilePhotos[0] === "string"
  ) {
    return user.profilePhotos[0];
  }

  return FALLBACK_IMG;
};

const formatTime = (date: string | Date): string => {
  const d = new Date(date);
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m < 10 ? "0" + m : m} ${ampm}`;
};

const formatRelativeTime = (date: string | Date): string => {
  const diff = Date.now() - new Date(date).getTime();
  const s = Math.floor(diff / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 1) return `${d}d`;
  if (d === 1) return "1d";
  if (h > 0) return `${h}h`;
  if (m > 0) return `${m}m`;
  return "now";
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
const Messages: React.FC<MessagesProps> = ({ onNavigate }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const userId = extractUserId();

  // ── scroll ─────────────────────────────────
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // ── other user from conversation ───────────
  const getOtherUser = useCallback(
    (conv: Conversation | undefined): User | null => {
      if (!conv?.participants?.length) return null;
      return (
        conv.participants.find((p) => p._id !== userId) ||
        conv.participants[0]
      );
    },
    [userId]
  );

  // ── refresh conversations ──────────────────
  const refreshConversations = useCallback(async () => {
    try {
      const res = await api.get("/messages/conversations");
      setConversations(res.data?.data || []);
    } catch (e) {
      console.error("refresh conv:", e);
    }
  }, []);

  // ── initial load ───────────────────────────
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchAll = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [convRes, connRes] = await Promise.all([
          api.get("/messages/conversations"),
          api.get("/request/connections/accepted"),
        ]);
        setConnections(connRes.data?.data || []);
        setConversations(convRes.data?.data || []);
      } catch (err: any) {
        console.error("❌ fetch:", err);
        setError(err?.response?.data?.error || "Failed to load messages");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, [userId]);

  // ── poll messages for selected chat ────────
  useEffect(() => {
    if (!selectedChat) {
      setMessages([]);
      return;
    }

    let active = true;

    const load = async () => {
      try {
        const res = await api.get(`/messages/conversation/${selectedChat}`);
        if (active) setMessages(res.data?.data || []);
      } catch (e) {
        console.error("❌ poll:", e);
      }
    };

    load();
    const interval = setInterval(load, 3000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [selectedChat]);

  // ── send message ───────────────────────────
  const handleSendMessage = async () => {
    const trimmed = messageText.trim();
    if (!trimmed || !selectedChat) return;
    setMessageText("");

    try {
      const res = await api.post("/messages/send", {
        conversationId: selectedChat,
        text: trimmed,
      });
      if (res.data?.data) {
        setMessages((prev) => [...prev, res.data.data]);
      }
      await refreshConversations();
    } catch (err: any) {
      console.error("❌ send:", err);
      setError(err?.response?.data?.error || "Failed to send");
      setMessageText(trimmed);
    }
  };

  // ── start / open conversation ──────────────
  // Backend: POST /messages/start → body: { userB }
  const startConversation = async (connectionId: string) => {
    try {
      const existing = conversations.find((c) =>
        c.participants.some((p) => p._id === connectionId)
      );
      if (existing) {
        setSelectedChat(existing._id);
        setIsMobileOpen(true);
        return;
      }

      const res = await api.post("/messages/start", {
        userB: connectionId,
      });

      if (res.data?.data) {
        setConversations((prev) => [res.data.data, ...prev]);
        setSelectedChat(res.data.data._id);
        setIsMobileOpen(true);
      }
    } catch (err: any) {
      console.error("❌ start conv:", err);
      setError(err?.response?.data?.error || "Failed to start conversation");
    }
  };

  // ── mark read locally ──────────────────────
  const markAsRead = (convId: string) => {
    if (!userId) return;
    setConversations((prev) =>
      prev.map((c) =>
        c._id === convId
          ? { ...c, unreadCount: { ...c.unreadCount, [userId]: 0 } }
          : c
      )
    );
  };

  // ─────────────────────────────────────────────
  // RENDER — loading
  // ─────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center mt-16">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading messages...</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // RENDER — session expired
  // ─────────────────────────────────────────────
  if (!userId) {
    return (
      <div className="fixed inset-0 flex items-center justify-center mt-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4 text-center">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Session Expired</h2>
          <p className="text-gray-500 mb-6">Please login again to continue.</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="w-full py-3 bg-rose-600 text-white rounded-xl font-semibold hover:bg-rose-700 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // RENDER — zero connections
  // ─────────────────────────────────────────────
  if (connections.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md mt-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full mx-4 text-center animate-fadeIn">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-12 h-12 text-rose-600" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            No Connections Yet
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            You don't have any accepted connection requests yet. Start by sending
            requests to profiles you're interested in!
          </p>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate("search")}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-semibold hover:from-rose-700 hover:to-pink-700 transition-all shadow-lg"
            >
              <Search className="w-5 h-5" /> Browse Profiles
            </button>
            <button
              onClick={() => onNavigate("requests")}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-rose-600 text-rose-600 rounded-xl font-semibold hover:bg-rose-50 transition-all"
            >
              <Heart className="w-5 h-5" /> View Requests
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className="w-full px-6 py-3 text-gray-500 hover:text-gray-900 transition-colors font-medium"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
        <style>{`
          @keyframes fadeIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        `}</style>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // MAIN LAYOUT
  // ─────────────────────────────────────────────
  const activeConv = conversations.find((c) => c._id === selectedChat);
  const activeOther = getOtherUser(activeConv);

  // Connections without a conversation yet
  const connectionsWithoutConv = connections.filter(
    (conn) =>
      !conversations.some((c) =>
        c.participants.some((p) => p._id === conn._id)
      )
  );

  return (
    <div className="fixed inset-0 flex bg-white mt-16" style={{ zIndex: 10 }}>

      {/* ──── LEFT SIDEBAR ──── */}
      <div
        className={`
          w-full md:w-96 bg-white border-r border-gray-200 flex flex-col h-full
          ${isMobileOpen && selectedChat ? "hidden md:flex" : "flex"}
        `}
      >
        {/* Header */}
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
          <button className="hover:bg-gray-100 rounded-full p-2 transition-colors">
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Search */}
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

        {/* Error banner */}
        {error && (
          <div className="mx-4 mt-2 px-3 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto">

          {/* Existing conversations */}
          {conversations.map((conv) => {
            const other = getOtherUser(conv);
            if (!other) return null;
            const unread = conv.unreadCount?.[userId] || 0;

            return (
              <div
                key={conv._id}
                onClick={() => {
                  setSelectedChat(conv._id);
                  setIsMobileOpen(true);
                  markAsRead(conv._id);
                }}
                className={`flex items-center px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 ${
                  selectedChat === conv._id ? "bg-rose-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={getUserProfilePhoto(other)}
                    alt={other.fullName}
                    className="w-12 h-12 rounded-full object-cover bg-gray-200"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = FALLBACK_IMG)
                    }
                  />
                  {unread > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white shadow">
                      {unread > 99 ? "99+" : unread}
                    </span>
                  )}
                </div>

                <div className="flex-1 ml-3 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3
                      className={`text-sm truncate ${
                        unread > 0
                          ? "font-bold text-gray-900"
                          : "font-semibold text-gray-800"
                      }`}
                    >
                      {other.fullName || "Unknown"}
                    </h3>
                    {conv.lastMessage && (
                      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                        {formatRelativeTime(conv.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs truncate ${
                      unread > 0
                        ? "text-gray-900 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {conv.lastMessage?.text || "Start chatting"}
                  </p>
                </div>

                {unread > 0 && (
                  <span className="ml-2 bg-rose-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                    {unread}
                  </span>
                )}
              </div>
            );
          })}

          {/* Connections without conversation — tap to start */}
          {connectionsWithoutConv.length > 0 && (
            <>
              <div className="px-4 pt-4 pb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Start a conversation
                </p>
              </div>
              {connectionsWithoutConv.map((conn: any) => (
                <div
                  key={conn._id}
                  onClick={() => startConversation(conn._id)}
                  className="flex items-center px-4 py-3 cursor-pointer hover:bg-rose-50 transition-colors border-b border-gray-50"
                >
                  <img
                    src={getUserProfilePhoto(conn)}
                    alt={conn.fullName}
                    className="w-12 h-12 rounded-full object-cover bg-gray-200"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = FALLBACK_IMG)
                    }
                  />
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {conn.fullName}
                    </h3>
                    <p className="text-xs text-rose-500">
                      Tap to start chatting
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* ──── RIGHT PANEL — chat ──── */}
      <div
        className={`
          flex-1 flex flex-col h-full
          ${isMobileOpen && selectedChat ? "flex" : "hidden md:flex"}
        `}
      >
        {selectedChat && activeOther ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 md:px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
              <button
                className="md:hidden p-1 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>

              <img
                src={getUserProfilePhoto(activeOther)}
                alt={activeOther.fullName}
                className="w-11 h-11 rounded-full object-cover bg-gray-200"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = FALLBACK_IMG)
                }
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">
                  {activeOther.fullName || "Unknown"}
                </h3>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 md:px-6 py-4 bg-gray-50"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              <div className="space-y-3">
                {messages.map((msg) => {
                  const senderId =
                    typeof msg.sender === "object"
                      ? (msg.sender as User)._id
                      : msg.sender;
                  const isMine = senderId === userId;

                  return (
                    <div
                      key={msg._id}
                      className={`flex ${
                        isMine ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${
                          isMine
                            ? "bg-rose-500 text-white rounded-br-none"
                            : "bg-white text-gray-900 rounded-bl-none border border-gray-100"
                        }`}
                      >
                        <p className="text-sm leading-relaxed break-words">
                          {msg.text}
                        </p>
                        <p
                          className={`text-[10px] mt-1 text-right ${
                            isMine ? "text-rose-100" : "text-gray-400"
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

            {/* Input */}
            <div className="px-4 md:px-6 py-4 bg-white border-t border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-gray-50 rounded-full text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none focus:bg-white transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="bg-rose-500 text-white rounded-full p-3 hover:bg-rose-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Desktop — no chat selected */
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
            <MessageCircle className="h-24 w-24 mb-4 text-gray-200" />
            <p className="text-xl font-semibold text-gray-500 mb-1">
              Select a conversation
            </p>
            <p className="text-sm text-gray-400">
              Choose a chat from the left to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { Messages };