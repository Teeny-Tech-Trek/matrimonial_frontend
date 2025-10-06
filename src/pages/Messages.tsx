import React, { useState } from 'react';
import { MessageCircle, Send, Search } from 'lucide-react';

interface MessagesProps {
  onNavigate: (page: string) => void;
}

export const Messages: React.FC<MessagesProps> = ({ onNavigate }) => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const conversations = [
    { id: '1', name: 'Priya Sharma', lastMessage: 'Thank you for your interest!', time: '2h ago', unread: 2 },
    { id: '2', name: 'Rahul Verma', lastMessage: 'Would love to connect', time: '5h ago', unread: 0 },
    { id: '3', name: 'Anjali Patel', lastMessage: 'Hi, nice to meet you', time: '1d ago', unread: 1 }
  ];

  const messages = selectedChat ? [
    { id: '1', sender: 'them', text: 'Hi! Thank you for showing interest in my profile.', time: '10:30 AM' },
    { id: '2', sender: 'me', text: 'Hello! I found your profile very interesting. Would love to know more about you.', time: '10:35 AM' },
    { id: '3', sender: 'them', text: 'Sure! Feel free to ask me anything.', time: '10:40 AM' }
  ] : [];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      alert('Message sent!');
      setMessageText('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
      <div className="flex h-full">
        <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === conv.id ? 'bg-rose-50' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{conv.name}</h3>
                  <span className="text-xs text-gray-500">{conv.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="ml-2 bg-rose-600 text-white text-xs rounded-full px-2 py-0.5">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex flex-1 flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  {conversations.find(c => c.id === selectedChat)?.name}
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'me'
                          ? 'bg-rose-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-rose-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 mx-auto mb-4" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};