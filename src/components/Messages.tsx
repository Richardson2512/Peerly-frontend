import React, { useState } from 'react';
import { MessageCircle, Send, Search, UserPlus, Crown } from 'lucide-react';
import { User, Conversation, Message } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface MessagesProps {
  user: User;
}

const Messages: React.FC<MessagesProps> = ({ user }) => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participants: ['1', '2'],
      lastMessage: {
        id: '1',
        conversationId: '1',
        senderId: '2',
        receiverId: '1',
        content: 'Hey! How was your internship interview?',
        timestamp: new Date('2024-01-15T14:30:00'),
        isRead: false,
        type: 'text'
      },
      updatedAt: new Date('2024-01-15T14:30:00')
    },
    {
      id: '2',
      participants: ['1', '3'],
      lastMessage: {
        id: '2',
        conversationId: '2',
        senderId: '1',
        receiverId: '3',
        content: 'Thanks for the study materials!',
        timestamp: new Date('2024-01-14T10:15:00'),
        isRead: true,
        type: 'text'
      },
      updatedAt: new Date('2024-01-14T10:15:00')
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      conversationId: '1',
      senderId: '2',
      receiverId: '1',
      content: 'Hi John! I saw your post about the Google internship. How did it go?',
      timestamp: new Date('2024-01-15T14:00:00'),
      isRead: true,
      type: 'text'
    },
    {
      id: '2',
      conversationId: '1',
      senderId: '1',
      receiverId: '2',
      content: 'Hey Sarah! It went really well. The technical round was challenging but I managed to solve most problems.',
      timestamp: new Date('2024-01-15T14:05:00'),
      isRead: true,
      type: 'text'
    },
    {
      id: '3',
      conversationId: '1',
      senderId: '2',
      receiverId: '1',
      content: 'That\'s amazing! Do you have any tips for the behavioral interview?',
      timestamp: new Date('2024-01-15T14:10:00'),
      isRead: true,
      type: 'text'
    },
    {
      id: '4',
      conversationId: '1',
      senderId: '1',
      receiverId: '2',
      content: 'Sure! Focus on STAR method and prepare examples of leadership, teamwork, and problem-solving.',
      timestamp: new Date('2024-01-15T14:15:00'),
      isRead: true,
      type: 'text'
    },
    {
      id: '5',
      conversationId: '1',
      senderId: '2',
      receiverId: '1',
      content: 'Hey! How was your internship interview?',
      timestamp: new Date('2024-01-15T14:30:00'),
      isRead: false,
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find(id => id !== user.id) || '';
  };

  const getUserName = (userId: string) => {
    const names: { [key: string]: string } = {
      '1': 'John Student',
      '2': 'Sarah Chen',
      '3': 'Alex Rodriguez',
      '4': 'Emily Davis'
    };
    return names[userId] || 'Unknown User';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      conversationId: selectedConversation,
      senderId: user.id,
      receiverId: getOtherParticipant(conversations.find(c => c.id === selectedConversation)!),
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Update conversation last message
    setConversations(conversations.map(conv => 
      conv.id === selectedConversation 
        ? { ...conv, lastMessage: message, updatedAt: new Date() }
        : conv
    ));
  };

  const filteredConversations = conversations.filter(conv => {
    const otherUserId = getOtherParticipant(conv);
    const otherUserName = getUserName(otherUserId);
    return otherUserName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentMessages = messages.filter(msg => msg.conversationId === selectedConversation);

  return (
    <div className="w-full p-4 h-full">
      <div className="bg-white rounded-md shadow-sm border h-full flex">
        {/* Conversations Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
              <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                <UserPlus className="h-5 w-5" />
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => {
              const otherUserId = getOtherParticipant(conversation);
              const otherUserName = getUserName(otherUserId);
              const isActive = selectedConversation === conversation.id;
              
              return (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`
                    w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors
                    ${isActive ? 'bg-purple-50 border-purple-200' : ''}
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {getInitials(otherUserName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">{otherUserName}</h3>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(conversation.updatedAt, { addSuffix: true })}
                        </span>
                      </div>
                      <p className={`text-sm mt-1 truncate ${!conversation.lastMessage?.isRead ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                        {conversation.lastMessage?.content}
                      </p>
                    </div>
                    {!conversation.lastMessage?.isRead && (
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {getInitials(getUserName(getOtherParticipant(conversations.find(c => c.id === selectedConversation)!)))}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {getUserName(getOtherParticipant(conversations.find(c => c.id === selectedConversation)!))}
                      </h3>
                      <p className="text-sm text-gray-500">Online</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((message) => {
                  const isOwn = message.senderId === user.id;
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`
                          max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                          ${isOwn 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                          }
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${isOwn ? 'text-purple-100' : 'text-gray-500'}`}>
                          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
