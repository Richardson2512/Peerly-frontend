import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Search, UserPlus, Crown, MoreVertical, Trash2, X } from 'lucide-react';
import { User } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { db, supabase } from '../lib/supabase';

interface MessagesProps {
  user: User;
}

interface ConversationData {
  id: string;
  participant_one_id: string;
  participant_two_id: string;
  created_at: string;
  updated_at: string;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar?: string;
  lastMessage?: {
    content: string;
    created_at: string;
    is_read: boolean;
    sender_id: string;
  };
  unreadCount: number;
}

interface MessageData {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  attachment_url?: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

const Messages: React.FC<MessagesProps> = ({ user }) => {
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch conversations on mount
  useEffect(() => {
    loadConversations();
  }, [user.id]);

  // Fetch messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
      markMessagesAsRead(selectedConversation);
    }
  }, [selectedConversation]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user.id) return;

    // Subscribe to new messages
    const messagesSubscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`
        },
        (payload) => {
          const newMsg = payload.new as MessageData;
          
          // Add message if it's for the current conversation
          if (newMsg.conversation_id === selectedConversation) {
            setMessages(prev => [...prev, newMsg]);
            markMessagesAsRead(newMsg.conversation_id);
          }
          
          // Refresh conversations to update last message
          loadConversations();
        }
      )
      .subscribe();

    // Subscribe to conversation updates
    const conversationsSubscription = supabase
      .channel('conversations')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversations'
        },
        () => {
          loadConversations();
        }
      )
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
      conversationsSubscription.unsubscribe();
    };
  }, [user.id, selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    try {
      setLoading(true);
      const convs = await db.getUserConversations(user.id);
      
      // Enrich conversations with user data and last message
      const enrichedConvs = await Promise.all(
        convs.map(async (conv) => {
          const otherUserId = conv.participant_one_id === user.id 
            ? conv.participant_two_id 
            : conv.participant_one_id;
          
          // Fetch other user's data
          const { data: userData } = await supabase
            .from('users')
            .select('name, avatar_url')
            .eq('id', otherUserId)
            .single();
          
          // Fetch last message
          const { data: lastMsgData } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
          
          // Count unread messages
          const { count } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('conversation_id', conv.id)
            .eq('receiver_id', user.id)
            .eq('is_read', false);
          
          return {
            ...conv,
            otherUserId,
            otherUserName: userData?.name || 'Unknown User',
            otherUserAvatar: userData?.avatar_url,
            lastMessage: lastMsgData ? {
              content: lastMsgData.content,
              created_at: lastMsgData.created_at,
              is_read: lastMsgData.is_read,
              sender_id: lastMsgData.sender_id
            } : undefined,
            unreadCount: count || 0
          };
        })
      );
      
      setConversations(enrichedConvs);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const msgs = await db.getConversationMessages(conversationId);
      setMessages(msgs);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const markMessagesAsRead = async (conversationId: string) => {
    try {
      await db.markConversationMessagesAsRead(conversationId, user.id);
      // Refresh conversations to update unread count
      loadConversations();
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || sending) return;

    const currentConv = conversations.find(c => c.id === selectedConversation);
    if (!currentConv) return;

    setSending(true);
    try {
      await db.sendMessage({
        conversation_id: selectedConversation,
        sender_id: user.id,
        receiver_id: currentConv.otherUserId,
        content: newMessage.trim(),
        message_type: 'text'
      });

      setNewMessage('');
      // Reload messages to get the new one with server timestamp
      await loadMessages(selectedConversation);
      await loadConversations();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await db.deleteMessage(messageId);
      setMessages(prev => prev.filter(m => m.id !== messageId));
      setOpenDropdown(null);
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message. Please try again.');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredConversations = conversations.filter(conv =>
    conv.otherUserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="w-full p-4 h-full">
      <div className="bg-white rounded-md shadow-sm border h-full flex">
        {/* Conversations Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
              <button 
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                title="New conversation"
              >
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-8 px-4">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No conversations yet</p>
                <p className="text-gray-400 text-xs mt-1">Start a new conversation to connect with peers</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => {
                const isActive = selectedConversation === conversation.id;
                const isUnread = conversation.unreadCount > 0;
                
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
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {conversation.otherUserAvatar ? (
                          <img 
                            src={conversation.otherUserAvatar} 
                            alt={conversation.otherUserName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          getInitials(conversation.otherUserName)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-medium truncate ${isUnread ? 'text-gray-900' : 'text-gray-700'}`}>
                            {conversation.otherUserName}
                          </h3>
                          {conversation.lastMessage && (
                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                              {formatDistanceToNow(new Date(conversation.lastMessage.created_at), { addSuffix: true })}
                            </span>
                          )}
                        </div>
                        {conversation.lastMessage && (
                          <div className="flex items-center justify-between">
                            <p className={`text-sm truncate ${isUnread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                              {conversation.lastMessage.sender_id === user.id ? 'You: ' : ''}
                              {conversation.lastMessage.content}
                            </p>
                            {isUnread && (
                              <span className="ml-2 flex-shrink-0 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation && currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {currentConversation.otherUserAvatar ? (
                        <img 
                          src={currentConversation.otherUserAvatar} 
                          alt={currentConversation.otherUserName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        getInitials(currentConversation.otherUserName)
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {currentConversation.otherUserName}
                      </h3>
                      <p className="text-sm text-gray-500">Online</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No messages yet</p>
                      <p className="text-gray-400 text-xs mt-1">Send a message to start the conversation</p>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => {
                    const isOwn = message.sender_id === user.id;
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="relative group max-w-xs lg:max-w-md">
                          <div
                            className={`
                              px-4 py-2 rounded-lg
                              ${isOwn 
                                ? 'bg-purple-600 text-white rounded-br-none' 
                                : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                              }
                            `}
                          >
                            <p className="text-sm break-words">{message.content}</p>
                            <p className={`text-xs mt-1 ${isOwn ? 'text-purple-100' : 'text-gray-500'}`}>
                              {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                            </p>
                          </div>
                          {isOwn && (
                            <div className="absolute right-0 top-0 -mr-8">
                              <button
                                onClick={() => setOpenDropdown(openDropdown === message.id ? null : message.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 rounded transition-all"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                              {openDropdown === message.id && (
                                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-20 py-1">
                                  <button
                                    onClick={() => handleDeleteMessage(message.id)}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="Type a message..."
                    disabled={sending}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {sending ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
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
