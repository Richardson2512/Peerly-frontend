import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Check, X, Search, MapPin, MessageCircle, Bell } from 'lucide-react';
import { User as UserType } from '../types';
import { db, supabase } from '../lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface PeerProps {
  user: UserType;
  activeView?: 'main' | 'peers' | 'followers' | 'following' | 'groups' | 'events';
  onViewChange?: (view: 'main' | 'peers' | 'followers' | 'following' | 'groups' | 'events') => void;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  course: string;
  course_level: string;
  year: string;
  avatar_url?: string;
  bio?: string;
}

interface ConnectionData {
  id: string;
  user_id: string;
  connected_user_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

interface NotificationData {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  action_url?: string;
  related_user_id?: string;
  related_entity_id?: string;
  created_at: string;
}

const Peer: React.FC<PeerProps> = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'requests' | 'discover'>('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState<string | null>(null);
  
  // Real data states
  const [connectionRequests, setConnectionRequests] = useState<ConnectionData[]>([]);
  const [requestSenders, setRequestSenders] = useState<Record<string, UserProfile>>({});
  const [recommendedUsers, setRecommendedUsers] = useState<UserProfile[]>([]);
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, ConnectionData | null>>({});
  const [counts, setCounts] = useState({ peers: 0, followers: 0, following: 0 });
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  // Load initial data
  useEffect(() => {
    loadData();
  }, [user.id]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user.id) return;

    // Subscribe to connection updates
    const connectionsSubscription = supabase
      .channel('connections')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'connections'
        },
        () => {
          loadConnections();
          loadCounts();
        }
      )
      .subscribe();

    // Subscribe to notifications
    const notificationsSubscription = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const newNotif = payload.new as NotificationData;
          setNotifications(prev => [newNotif, ...prev]);
          
          // Refresh data if it's a connection request
          if (newNotif.type === 'connection_request') {
            loadConnections();
          }
        }
      )
      .subscribe();

    return () => {
      connectionsSubscription.unsubscribe();
      notificationsSubscription.unsubscribe();
    };
  }, [user.id]);

  // Search users when search term changes
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadConnections(),
        loadRecommendedUsers(),
        loadCounts(),
        loadNotifications()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConnections = async () => {
    try {
      // Get pending requests where current user is the receiver
      const requests = await db.getUserConnections(user.id, 'pending');
      const incomingRequests = requests.filter(r => r.connected_user_id === user.id);
      setConnectionRequests(incomingRequests);
      
      // Load sender profiles
      const senders: Record<string, UserProfile> = {};
      await Promise.all(
        incomingRequests.map(async (request) => {
          const { data } = await supabase
            .from('users')
            .select('id, name, email, college, course, course_level, year, avatar_url, bio')
            .eq('id', request.user_id)
            .single();
          if (data) {
            senders[request.user_id] = data;
          }
        })
      );
      setRequestSenders(senders);
    } catch (error) {
      console.error('Error loading connections:', error);
    }
  };

  const loadRecommendedUsers = async () => {
    try {
      const users = await db.getRecommendedUsers(user.id, 10);
      setRecommendedUsers(users);
      
      // Load connection status for each user
      const statuses: Record<string, ConnectionData | null> = {};
      await Promise.all(
        users.map(async (u) => {
          const status = await db.getConnectionStatus(user.id, u.id);
          statuses[u.id] = status;
        })
      );
      setConnectionStatuses(statuses);
    } catch (error) {
      console.error('Error loading recommended users:', error);
    }
  };

  const loadCounts = async () => {
    try {
      const connectionCounts = await db.getConnectionCounts(user.id);
      setCounts(connectionCounts);
    } catch (error) {
      console.error('Error loading counts:', error);
    }
  };

  const loadNotifications = async () => {
    try {
      const notifs = await db.getUnreadNotifications(user.id);
      setNotifications(notifs);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await db.searchUsers(searchTerm, user.id);
      setSearchResults(results);
      
      // Load connection status for search results
      const statuses: Record<string, ConnectionData | null> = {};
      await Promise.all(
        results.map(async (u) => {
          const status = await db.getConnectionStatus(user.id, u.id);
          statuses[u.id] = status;
        })
      );
      setConnectionStatuses(prev => ({ ...prev, ...statuses }));
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleSendRequest = async (targetUserId: string) => {
    setSending(targetUserId);
    try {
      await db.sendConnectionRequest(user.id, targetUserId);
      
      // Update connection status locally
      const newStatus = await db.getConnectionStatus(user.id, targetUserId);
      setConnectionStatuses(prev => ({ ...prev, [targetUserId]: newStatus }));
      
      alert('Connection request sent!');
    } catch (error: any) {
      console.error('Error sending request:', error);
      if (error.message.includes('already exists')) {
        alert('Connection request already exists');
      } else {
        alert('Failed to send connection request. Please try again.');
      }
    } finally {
      setSending(null);
    }
  };

  const handleAcceptRequest = async (connectionId: string) => {
    try {
      await db.acceptConnectionRequest(connectionId, user.id);
      
      // Refresh data
      await Promise.all([
        loadConnections(),
        loadCounts()
      ]);
      
      alert('Connection request accepted!');
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Failed to accept request. Please try again.');
    }
  };

  const handleRejectRequest = async (connectionId: string) => {
    try {
      await db.rejectConnectionRequest(connectionId, user.id);
      
      // Remove from local state
      setConnectionRequests(prev => prev.filter(r => r.id !== connectionId));
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request. Please try again.');
    }
  };

  const handleStartConversation = async (otherUserId: string) => {
    try {
      await db.getOrCreateConversation(user.id, otherUserId);
      navigate('/dashboard/messages');
    } catch (error) {
      console.error('Error starting conversation:', error);
      alert('Failed to start conversation. Please try again.');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getConnectionButton = (targetUser: UserProfile) => {
    const status = connectionStatuses[targetUser.id];
    const isSending = sending === targetUser.id;

    if (!status) {
      return (
        <button
          onClick={() => handleSendRequest(targetUser.id)}
          disabled={isSending}
          className="flex items-center px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-1" />
              Connect
            </>
          )}
        </button>
      );
    }

    if (status.status === 'pending') {
      if (status.user_id === user.id) {
        return (
          <span className="text-xs text-gray-500 px-3 py-1.5 bg-gray-100 rounded-lg">
            Request Sent
          </span>
        );
      } else {
        return (
          <div className="flex gap-2">
        <button
              onClick={() => handleAcceptRequest(status.id)}
              className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
              <Check className="h-4 w-4 mr-1" />
              Accept
        </button>
        <button 
              onClick={() => handleRejectRequest(status.id)}
              className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              <X className="h-4 w-4 mr-1" />
              Reject
        </button>
      </div>
        );
      }
    }

    if (status.status === 'accepted') {
      return (
                  <button
          onClick={() => handleStartConversation(targetUser.id)}
          className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </button>
      );
    }

    return null;
  };

  const renderUserCard = (profile: UserProfile) => (
    <div key={profile.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            getInitials(profile.name)
                )}
              </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{profile.name}</h3>
              <p className="text-sm text-gray-600">{profile.course} • {profile.year}</p>
              </div>
            </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{profile.college}</span>
            </div>
          {profile.bio && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{profile.bio}</p>
          )}
          {getConnectionButton(profile)}
          </div>
      </div>
    </div>
  );

  const displayUsers = searchResults.length > 0 ? searchResults : recommendedUsers;

  return (
    <div className="w-full p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
        <div>
              <p className="text-sm text-gray-500">Peers</p>
              <p className="text-2xl font-bold text-gray-900">{counts.peers}</p>
        </div>
            <Users className="h-8 w-8 text-purple-600" />
      </div>
              </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Followers</p>
              <p className="text-2xl font-bold text-gray-900">{counts.followers}</p>
                    </div>
            <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Following</p>
              <p className="text-2xl font-bold text-gray-900">{counts.following}</p>
            </div>
            <Users className="h-8 w-8 text-emerald-600" />
            </div>
            </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header with Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex space-x-1">
        <button 
                onClick={() => setActiveTab('discover')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'discover'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Discover
        </button>
                  <button
                onClick={() => setActiveTab('requests')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center ${
                  activeTab === 'requests'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Requests
                {connectionRequests.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {connectionRequests.length}
                  </span>
                )}
              </button>
      </div>
      
            {notifications.length > 0 && (
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications.length}
                  </span>
                        </button>
                      )}
            </div>
            
          {/* Search Bar */}
          {activeTab === 'discover' && (
            <div className="px-6 pb-4">
                <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, college, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
                    </div>
                  )}
              </div>
              
        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
          ) : activeTab === 'discover' ? (
      <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {searchResults.length > 0 ? 'Search Results' : 'Recommended Connections'}
              </h3>
              {displayUsers.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    {searchTerm ? 'No users found' : 'No recommendations available'}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {searchTerm ? 'Try a different search term' : 'Check back later for new connections'}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {displayUsers.map(renderUserCard)}
              </div>
              )}
              </div>
          ) : (
      <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connection Requests</h3>
              {connectionRequests.length === 0 ? (
                <div className="text-center py-12">
                  <UserPlus className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No pending requests</p>
                  <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {connectionRequests.map((request) => {
                    const senderProfile = requestSenders[request.user_id];

                    if (!senderProfile) return null;

    return (
                      <div key={request.id} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {senderProfile.avatar_url ? (
                              <img src={senderProfile.avatar_url} alt={senderProfile.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              getInitials(senderProfile.name)
                            )}
                    </div>
                    <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{senderProfile.name}</h4>
                            <p className="text-sm text-gray-600">{senderProfile.course} • {senderProfile.college}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                            </p>
                            <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                        >
                          <X className="h-4 w-4 mr-2" />
                                Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                    );
                  })}
          </div>
        )}
                      </div>
                        )}
                      </div>
                    </div>
    </div>
  );
};

export default Peer;
