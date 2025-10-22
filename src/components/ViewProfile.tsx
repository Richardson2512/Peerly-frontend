import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User as UserType, Badge } from '../types';
import { db } from '../lib/supabase';
import { usePosts } from '../contexts/PostsContext';
import { 
  MapPin, 
  Eye, 
  Users, 
  Star,
  ArrowLeft,
  MessageCircle,
  UserPlus,
  Check,
  Calendar,
  GraduationCap,
  Linkedin,
  Github,
  Globe,
  BookOpen,
  User as UserIcon
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ViewProfileProps {
  currentUser: UserType;
}

const ViewProfile: React.FC<ViewProfileProps> = ({ currentUser }) => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { posts: allPosts } = usePosts();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<any>(null);
  const [userBadges, setUserBadges] = useState<Badge[]>([]);
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'activity' | 'events'>('about');
  const [connectionCounts, setConnectionCounts] = useState({ peers: 0, followers: 0, following: 0 });

  useEffect(() => {
    if (userId) {
      loadUserProfile();
      loadConnectionStatus();
      loadUserBadges();
      loadConnectionCounts();
    }
  }, [userId]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const profile = await db.getUserById(userId!);
      setUser(profile);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConnectionStatus = async () => {
    try {
      const status = await db.getConnectionStatus(currentUser.id, userId!);
      setConnectionStatus(status);
    } catch (error) {
      console.error('Error loading connection status:', error);
    }
  };

  const loadUserBadges = async () => {
    try {
      const badges = await db.getUserBadges(userId!);
      setUserBadges(badges);
    } catch (error) {
      console.error('Error loading badges:', error);
    }
  };

  const loadConnectionCounts = async () => {
    try {
      const counts = await db.getConnectionCounts(userId!);
      setConnectionCounts(counts);
    } catch (error) {
      console.error('Error loading connection counts:', error);
    }
  };

  const handleSendRequest = async () => {
    setSending(true);
    try {
      await db.sendConnectionRequest(currentUser.id, userId!);
      await loadConnectionStatus();
      alert('Connection request sent!');
    } catch (error: any) {
      console.error('Error sending request:', error);
      if (error.message?.includes('already exists')) {
        alert('Connection request already exists');
      } else {
        alert('Failed to send connection request');
      }
    } finally {
      setSending(false);
    }
  };

  const handleAcceptRequest = async () => {
    if (!connectionStatus) return;
    try {
      await db.acceptConnectionRequest(connectionStatus.id, currentUser.id);
      await loadConnectionStatus();
      await loadConnectionCounts();
      alert('Connection request accepted!');
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Failed to accept request');
    }
  };

  const handleMessage = async () => {
    try {
      await db.getOrCreateConversation(currentUser.id, userId!);
      navigate('/dashboard/messages');
    } catch (error) {
      console.error('Error starting conversation:', error);
      alert('Failed to start conversation');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getConnectionButton = () => {
    if (!connectionStatus) {
      return (
        <button
          onClick={handleSendRequest}
          disabled={sending}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {sending ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          ) : (
            <UserPlus className="h-5 w-5 mr-2" />
          )}
          Connect
        </button>
      );
    }

    if (connectionStatus.status === 'pending') {
      if (connectionStatus.user_id === currentUser.id) {
        return (
          <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
            Request Sent
          </span>
        );
      } else {
        return (
          <button
            onClick={handleAcceptRequest}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Check className="h-5 w-5 mr-2" />
            Accept Request
          </button>
        );
      }
    }

    if (connectionStatus.status === 'accepted') {
      return (
        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm flex items-center">
          <Check className="h-5 w-5 mr-2" />
          Connected
        </span>
      );
    }

    return null;
  };

  const userPosts = React.useMemo(() => {
    return allPosts.filter(post => post.userId === userId);
  }, [allPosts, userId]);

  if (loading) {
    return (
      <div className="w-full p-6 flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full p-6 text-center">
        <p className="text-gray-500">User not found</p>
        <button
          onClick={() => navigate('/dashboard/peer')}
          className="mt-4 text-purple-600 hover:text-purple-700"
        >
          Back to Peer
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        {/* Cover Photo - Not clickable for other users */}
        <div className="h-48 relative">
          {user.cover_photo_url ? (
            <img 
              src={user.cover_photo_url} 
              alt="Cover photo" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full bg-gradient-to-r from-purple-600 to-emerald-600"></div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        
        {/* Profile Avatar */}
        <div className="flex justify-center -mt-16 relative z-10 mb-4">
          <div className="w-32 h-32 bg-white border-4 border-white rounded-full flex items-center justify-center shadow-lg">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-gray-600 text-3xl font-bold">{getInitials(user.name)}</span>
            )}
          </div>
        </div>

        {/* Student Info and Achievements */}
        <div className="px-6 pb-4 relative">
          <div className="flex items-start">
            {/* Left Side - Student Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>
                {user.is_pro && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Pro
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-base mb-3">{user.course} Student</p>
              
              {/* College Info with Logo */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                  {user.college.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{user.college}</p>
                  <p className="text-xs text-gray-600">
                    {user.course_level.charAt(0).toUpperCase() + user.course_level.slice(1)} Program
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                {user.location && (
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {user.location}
                  </div>
                )}
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {user.profile_views || 0} views
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {connectionCounts.followers} followers
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {getConnectionButton()}
                <button
                  onClick={handleMessage}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Message
                </button>
              </div>
            </div>

            {/* Right Side - Top 3 Badges */}
            <div className="absolute right-6 top-0">
              <h3 className="text-xs font-semibold text-gray-700 mb-2">Top Achievements</h3>
              <div className="space-y-1">
                {userBadges.length > 0 ? (
                  userBadges.slice(0, 3).map((badge) => (
                    <div key={badge.id} className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded px-2 py-1 min-w-[250px]">
                      <div className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{badge.rank}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 truncate">{badge.title}</p>
                        <p className="text-xs text-gray-600 truncate">{badge.event}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-500 italic">No achievements yet</div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4 mt-4">
            {user.bio ? (
              <p className="text-gray-700 text-sm leading-relaxed">{user.bio}</p>
            ) : (
              <p className="text-gray-500 text-sm italic">No bio yet.</p>
            )}
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {user.linkedin_url && (
              <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </a>
            )}
            {user.github_url && (
              <a href={user.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-gray-800 text-sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-md shadow-sm mb-4">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-6 px-6">
            {[
              { id: 'about', label: 'About', icon: UserIcon },
              { id: 'activity', label: 'Activity', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-4 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-md shadow-sm p-6">
        {activeTab === 'about' && (
          <div className="space-y-6">
            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-purple-600" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill: string, index: number) => (
                    <span key={index} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Interests */}
            {user.interests && user.interests.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest: string, index: number) => (
                    <span key={index} className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* All Badges */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Badges & Achievements</h3>
              {userBadges.length > 0 ? (
                <div className="grid gap-4">
                  {userBadges.map((badge) => (
                    <div key={badge.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-yellow-50 to-orange-50">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-lg font-bold">{badge.rank}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg">{badge.title}</h4>
                          <p className="text-sm text-gray-700 mb-1">{badge.event}</p>
                          {badge.description && (
                            <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                          )}
                          <p className="text-xs text-gray-500">
                            {new Date(badge.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">No badges yet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Posts</h3>
            {userPosts.length > 0 ? (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          getInitials(user.name)
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-3">{post.content}</p>
                    {post.image && (
                      <img src={post.image} alt="Post" className="w-full rounded-lg mb-3" />
                    )}
                    {post.video && (
                      <video src={post.video} controls className="w-full rounded-lg mb-3" />
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{post.likes} likes</span>
                      <span>{post.comments?.length || 0} comments</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No posts yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
