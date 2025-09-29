import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Image as ImageIcon, Video, Send, MoreHorizontal, Flag, AlertTriangle, Shield } from 'lucide-react';
import { User, Post, ContentModeration } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface FeedProps {
  user: User;
}

const Feed: React.FC<FeedProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Sarah Chen',
      userAvatar: undefined,
      content: "Just finished my first week at Google as a software engineering intern! The experience has been incredible so far. Working on real projects that impact millions of users is both exciting and challenging. Can't wait to share more updates! 🚀",
      timestamp: new Date('2024-01-15T10:30:00'),
      likes: 42,
      comments: [
        {
          id: '1',
          userId: '3',
          userName: 'Mike Johnson',
          content: 'Congratulations Sarah! That sounds amazing!',
          timestamp: new Date('2024-01-15T11:00:00')
        }
      ]
    },
    {
      id: '2',
      userId: '3',
      userName: 'Alex Rodriguez',
      userAvatar: undefined,
      content: "Participating in our university's hackathon this weekend! Our team is building an AI-powered study buddy app. Excited to see what we can create in 48 hours. Anyone else participating in hackathons this season?",
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      timestamp: new Date('2024-01-14T16:45:00'),
      likes: 28,
      comments: []
    },
    {
      id: '3',
      userId: '4',
      userName: 'Emily Davis',
      userAvatar: undefined,
      content: "Pro tip for fellow computer science students: Don't just focus on coding! Soft skills like communication and teamwork are equally important in the tech industry. Just landed my dream internship at Microsoft, and I know my presentation skills made a huge difference in the interview process.",
      timestamp: new Date('2024-01-13T14:20:00'),
      likes: 67,
      comments: [
        {
          id: '2',
          userId: '5',
          userName: 'David Wilson',
          content: 'This is so true! Thanks for sharing your experience.',
          timestamp: new Date('2024-01-13T15:00:00')
        }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showContentWarning, setShowContentWarning] = useState(false);
  const [flaggedPosts, setFlaggedPosts] = useState<Set<string>>(new Set());

  // Content moderation keywords
  const inappropriateKeywords = [
    'nude', 'naked', 'sex', 'sexual', 'porn', 'pornography', 'xxx', 'adult', 'explicit',
    'harassment', 'hate', 'racist', 'discrimination', 'abuse', 'violence', 'threat'
  ];

  const checkContent = (content: string): boolean => {
    const lowerContent = content.toLowerCase();
    return inappropriateKeywords.some(keyword => lowerContent.includes(keyword));
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;

    // Check for inappropriate content
    if (checkContent(newPost)) {
      setShowContentWarning(true);
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: []
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleFlagPost = (postId: string) => {
    setFlaggedPosts(new Set([...flaggedPosts, postId]));
    
    // In real implementation, this would trigger content moderation review
    const post = posts.find(p => p.id === postId);
    if (post) {
      const moderation: ContentModeration = {
        id: Date.now().toString(),
        postId,
        userId: user.id,
        content: post.content,
        flaggedReason: 'other',
        status: 'pending',
        actionTaken: 'none'
      };
      
      console.log('Content flagged for review:', moderation);
      alert('Content has been flagged for review. Our moderation team will review it shortly.');
    }
  };

  const handleReportContent = (postId: string, reason: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      const moderation: ContentModeration = {
        id: Date.now().toString(),
        postId,
        userId: user.id,
        content: post.content,
        flaggedReason: reason as any,
        status: 'pending',
        actionTaken: 'none'
      };
      
      console.log('Content reported:', moderation);
      alert('Thank you for reporting. Our moderation team will review this content.');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Content Warning Modal */}
      {showContentWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Content Warning</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Your post contains content that may be inappropriate for our platform. Please review our community guidelines and ensure your content is appropriate for all students.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowContentWarning(false);
                  setNewPost('');
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cancel Post
              </button>
              <button
                onClick={() => {
                  setShowContentWarning(false);
                  // Force post despite warning (for demo purposes)
                  const post: Post = {
                    id: Date.now().toString(),
                    userId: user.id,
                    userName: user.name,
                    content: newPost,
                    timestamp: new Date(),
                    likes: 0,
                    comments: []
                  };
                  setPosts([post, ...posts]);
                  setNewPost('');
                }}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Post Anyway
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Content Moderation Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-blue-600 mr-3" />
          <div>
            <h4 className="font-semibold text-blue-800">Safe Learning Environment</h4>
            <p className="text-sm text-blue-700">
              We automatically monitor content for inappropriate material. Help us maintain a positive community by reporting any violations.
            </p>
          </div>
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
            {getInitials(user.name)}
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind? Share your experiences, achievements, or thoughts..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              rows={3}
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Photo
                </button>
                <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                  <Video className="h-5 w-5 mr-2" />
                  Video
                </button>
              </div>
              <button
                onClick={handleSubmitPost}
                disabled={!newPost.trim()}
                className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border">
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(post.userName)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.userName}</h3>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  {/* Flag dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="py-1">
                      <button
                        onClick={() => handleFlagPost(post.id)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Flag className="h-4 w-4 mr-2 text-red-500" />
                        Report Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-4">
              <p className="text-gray-800 leading-relaxed">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="px-6 pb-4">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full rounded-lg object-cover max-h-96"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{post.comments.length}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-emerald-500 transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments */}
            {post.comments.length > 0 && (
              <div className="px-6 pb-4 space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {getInitials(comment.userName)}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="font-semibold text-sm text-gray-900">{comment.userName}</p>
                        <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;