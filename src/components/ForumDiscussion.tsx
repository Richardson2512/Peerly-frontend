import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Heart, 
  MessageCircle, 
  Pin, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Flag,
  Users,
  Settings,
  UserPlus,
  Crown,
  Lock,
  Globe
} from 'lucide-react';
import { User, ForumDiscussion, ForumPost, ForumMembership } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ForumDiscussionProps {
  user: User;
  discussionId: string;
  onBack: () => void;
}

const ForumDiscussionComponent: React.FC<ForumDiscussionProps> = ({ user, discussionId, onBack }) => {
  const [newPost, setNewPost] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Mock discussion data
  const [discussion, setDiscussion] = useState<ForumDiscussion>({
    id: discussionId,
    title: 'Computer Science Study Group',
    description: 'A place for CS students to discuss algorithms, data structures, and programming concepts. Share resources, ask questions, and help each other learn.',
    ownerId: 'user1',
    ownerName: 'Sarah Chen',
    ownerAvatar: undefined,
    isPrivate: false,
    category: 'academic',
    tags: ['programming', 'algorithms', 'study-group'],
    createdAt: new Date('2024-01-10T10:00:00'),
    updatedAt: new Date('2024-01-15T14:30:00'),
    memberCount: 45,
    postCount: 128,
    lastActivity: new Date('2024-01-15T14:30:00'),
    isActive: true
  });

  // Mock posts data
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      discussionId: discussionId,
      authorId: 'user1',
      authorName: 'Sarah Chen',
      authorAvatar: undefined,
      content: 'Welcome everyone to our CS Study Group! I\'m excited to start this discussion forum where we can help each other learn and grow. Feel free to share any interesting algorithms you\'ve learned, ask questions about data structures, or discuss any programming concepts you\'re working on. Let\'s make this a supportive and collaborative space! 🚀',
      createdAt: new Date('2024-01-10T10:00:00'),
      updatedAt: new Date('2024-01-10T10:00:00'),
      likes: 12,
      isPinned: true,
      isEdited: false,
      replies: [
        {
          id: '2',
          discussionId: discussionId,
          authorId: 'user2',
          authorName: 'Alex Rodriguez',
          authorAvatar: undefined,
          content: 'Thanks for creating this group, Sarah! I\'ve been struggling with dynamic programming lately. Does anyone have good resources for understanding DP patterns?',
          createdAt: new Date('2024-01-10T11:30:00'),
          updatedAt: new Date('2024-01-10T11:30:00'),
          likes: 5,
          isPinned: false,
          isEdited: false,
          parentPostId: '1',
          replies: []
        },
        {
          id: '3',
          discussionId: discussionId,
          authorId: 'user3',
          authorName: 'Emily Davis',
          authorAvatar: undefined,
          content: 'I found the "Grokking Dynamic Programming" course really helpful! Also, LeetCode has some great DP problems organized by pattern. What specific DP problems are you working on?',
          createdAt: new Date('2024-01-10T12:15:00'),
          updatedAt: new Date('2024-01-10T12:15:00'),
          likes: 8,
          isPinned: false,
          isEdited: false,
          parentPostId: '1',
          replies: []
        }
      ]
    },
    {
      id: '4',
      discussionId: discussionId,
      authorId: 'user4',
      authorName: 'David Wilson',
      authorAvatar: undefined,
      content: 'Has anyone implemented a Trie data structure recently? I\'m working on a word search problem and wondering about the best approach for storing and searching through a dictionary of words.',
      createdAt: new Date('2024-01-11T14:20:00'),
      updatedAt: new Date('2024-01-11T14:20:00'),
      likes: 6,
      isPinned: false,
      isEdited: false,
      replies: [
        {
          id: '5',
          discussionId: discussionId,
          authorId: 'user5',
          authorName: 'Priya Sharma',
          authorAvatar: undefined,
          content: 'I just implemented a Trie for a similar problem! The key is to have a boolean flag for end-of-word and a map/array for children. Are you using Java or another language?',
          createdAt: new Date('2024-01-11T15:45:00'),
          updatedAt: new Date('2024-01-11T15:45:00'),
          likes: 3,
          isPinned: false,
          isEdited: false,
          parentPostId: '4',
          replies: []
        }
      ]
    },
    {
      id: '6',
      discussionId: discussionId,
      authorId: 'user6',
      authorName: 'Ryan Kim',
      authorAvatar: undefined,
      content: 'Quick question about time complexity: If I have a nested loop where the inner loop runs n times and the outer loop runs log(n) times, what\'s the overall time complexity? I\'m thinking O(n log n) but want to confirm.',
      createdAt: new Date('2024-01-12T09:30:00'),
      updatedAt: new Date('2024-01-12T09:30:00'),
      likes: 4,
      isPinned: false,
      isEdited: false,
      replies: []
    }
  ]);

  const [userMembership, setUserMembership] = useState<ForumMembership>({
    id: '1',
    discussionId: discussionId,
    userId: user.id,
    role: 'member',
    joinedAt: new Date('2024-01-11T10:00:00'),
    status: 'active'
  });

  const isOwner = discussion.ownerId === user.id;
  const isAdmin = userMembership.role === 'admin' || isOwner;

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;

    const newPostData: ForumPost = {
      id: Date.now().toString(),
      discussionId: discussionId,
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      content: newPost,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      isPinned: false,
      isEdited: false,
      parentPostId: replyingTo || undefined,
      replies: []
    };

    if (replyingTo) {
      // Add as reply to existing post
      setPosts(posts.map(post => 
        post.id === replyingTo 
          ? { ...post, replies: [...post.replies, newPostData] }
          : post
      ));
      setReplyingTo(null);
    } else {
      // Add as new top-level post
      setPosts([newPostData, ...posts]);
    }

    setNewPost('');
    
    // Update discussion stats
    setDiscussion(prev => ({
      ...prev,
      postCount: prev.postCount + 1,
      lastActivity: new Date()
    }));
  };

  const handleReply = (postId: string) => {
    setReplyingTo(postId);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderPost = (post: ForumPost, isReply = false) => (
    <div key={post.id} className={`${isReply ? 'ml-8 mt-4' : 'mb-6'}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        {/* Post Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(post.authorName)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-gray-900">{post.authorName}</h4>
                {post.isPinned && (
                  <Pin className="h-4 w-4 text-yellow-500" title="Pinned Post" />
                )}
                {post.isEdited && (
                  <span className="text-xs text-gray-500">(edited)</span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isAdmin && (
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800 leading-relaxed">{post.content}</p>
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLike(post.id)}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            {!isReply && (
              <button
                onClick={() => handleReply(post.id)}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Reply</span>
              </button>
            )}
          </div>
        </div>

        {/* Replies */}
        {post.replies.length > 0 && (
          <div className="mt-4 space-y-3">
            {post.replies.map(reply => renderPost(reply, true))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full" style={{marginLeft: '350px', maxWidth: 'calc(100vw - 350px - 328px)'}}>
      {/* Header */}
      <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Forums</span>
          </button>
          <div className="flex items-center space-x-2">
            {discussion.isPrivate ? (
              <Lock className="h-5 w-5 text-gray-400" title="Private Discussion" />
            ) : (
              <Globe className="h-5 w-5 text-gray-400" title="Public Discussion" />
            )}
            {isOwner && (
              <button
                onClick={() => setShowSettingsModal(true)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{discussion.title}</h1>
            <p className="text-gray-600 mb-4">{discussion.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{discussion.memberCount} members</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{discussion.postCount} posts</span>
              </div>
              <div className="flex items-center space-x-1">
                <Crown className="h-4 w-4" />
                <span>Created by {discussion.ownerName}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {discussion.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
            {getInitials(user.name)}
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={replyingTo ? "Write your reply..." : "Share your thoughts, ask questions, or start a discussion..."}
              className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              rows={3}
            />
            <div className="flex items-center justify-between mt-4">
              {replyingTo && (
                <button
                  onClick={() => setReplyingTo(null)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel Reply
                </button>
              )}
              <button
                onClick={handleSubmitPost}
                disabled={!newPost.trim()}
                className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                {replyingTo ? 'Reply' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map(post => renderPost(post))}
      </div>

      {/* Members Modal */}
      {showMembersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Discussion Members</h2>
                <button
                  onClick={() => setShowMembersModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MoreHorizontal className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials(discussion.ownerName)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{discussion.ownerName}</p>
                    <p className="text-sm text-gray-500">Owner</p>
                  </div>
                  <Crown className="h-4 w-4 text-yellow-500" />
                </div>
                {/* Add more members here */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Discussion Settings</h2>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MoreHorizontal className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discussion Title
                  </label>
                  <input
                    type="text"
                    value={discussion.title}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={discussion.description}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    checked={discussion.isPrivate}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPrivate" className="text-sm font-medium text-gray-700">
                    Private Discussion
                  </label>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowSettingsModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumDiscussionComponent;
