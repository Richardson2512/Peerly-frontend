import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Image as ImageIcon, Video, Send, MoreHorizontal, Flag, AlertTriangle, Shield, Volume2, VolumeX, Edit, Trash2, Pin, Link as LinkIcon, X, Smile } from 'lucide-react';
import { User, Post, ContentModeration } from '../types';
import { usePosts } from '../contexts/PostsContext';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import MediaUploadModal from './MediaUploadModal';
import MediaEditor from './MediaEditor';
import { uploadPostMedia } from '../lib/storage';
import { formatDistanceToNow } from 'date-fns';

interface FeedProps {
  user: User;
}

const Feed: React.FC<FeedProps> = ({ user }) => {
  const { posts, addPost, deletePost: deletePostFromContext, updatePost } = usePosts();
  const [globalMute, setGlobalMute] = useState(true); // Start muted by default
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [visibleVideos, setVisibleVideos] = useState<Set<string>>(new Set());
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [featuredPostId, setFeaturedPostId] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showMediaEditor, setShowMediaEditor] = useState(false);
  const [tempMediaUrl, setTempMediaUrl] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [postImage, setPostImage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [newPost, setNewPost] = useState('');
  const [showContentWarning, setShowContentWarning] = useState(false);
  const [flaggedPosts, setFlaggedPosts] = useState<Set<string>>(new Set());

  // Video management functions
  const toggleGlobalMute = () => {
    const newMuteState = !globalMute;
    setGlobalMute(newMuteState);
    
    // Update all videos in the feed
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.muted = newMuteState;
      }
    });
  };

  // Intersection Observer for auto-play on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute('data-video-id');
          if (videoId) {
            if (entry.isIntersecting) {
              // Video is visible, play it
              setVisibleVideos(prev => new Set([...prev, videoId]));
              const video = videoRefs.current[videoId];
              if (video) {
                video.play().catch(console.error);
              }
            } else {
              // Video is not visible, pause it
              setVisibleVideos(prev => {
                const newSet = new Set(prev);
                newSet.delete(videoId);
                return newSet;
              });
              const video = videoRefs.current[videoId];
              if (video) {
                video.pause();
              }
            }
          }
        });
      },
      {
        threshold: 0.5, // Video must be 50% visible to play
        rootMargin: '0px 0px -10% 0px' // Start playing slightly before fully visible
      }
    );

    // Observe all video elements
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => observer.disconnect();
  }, [posts]);

  // Update video mute state when global mute changes
  useEffect(() => {
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.muted = globalMute;
      }
    });
  }, [globalMute]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

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

  const handleSubmitPost = async () => {
    if (!newPost.trim()) return;

    // Check for inappropriate content
    if (checkContent(newPost)) {
      setShowContentWarning(true);
      return;
    }

    const post: Post = {
      id: Date.now().toString(), // Temporary ID, will be replaced by Supabase
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: newPost,
      image: postImage || undefined,
      timestamp: new Date(),
      likes: 0,
      comments: []
    };

    try {
      await addPost(post);
    setNewPost('');
      setPostImage(null);
      setImageFile(null);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
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

  // Post action functions
  const canEditPost = (post: Post) => {
    const now = new Date();
    const postTime = new Date(post.timestamp);
    const hoursDiff = (now.getTime() - postTime.getTime()) / (1000 * 60 * 60);
    return post.userId === user.id && hoursDiff <= 24;
  };

  const handleEditPost = (post: Post) => {
    setEditingPostId(post.id);
    setEditContent(post.content);
    setOpenDropdown(null);
  };

  const handleSaveEdit = async (postId: string) => {
    if (!editContent.trim()) return;
    
    try {
      await updatePost(postId, editContent);
      setEditingPostId(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditContent('');
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePostFromContext(postId);
        setOpenDropdown(null);
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleFeaturePost = (postId: string) => {
    setFeaturedPostId(featuredPostId === postId ? null : postId);
    setOpenDropdown(null);
  };

  const handleCopyLink = (postId: string) => {
    const postLink = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postLink);
    alert('Post link copied to clipboard!');
    setOpenDropdown(null);
  };

  const handleReportPost = (postId: string) => {
    handleFlagPost(postId);
    setOpenDropdown(null);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 scrollbar-hide">
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
                onClick={async () => {
                  // Force post despite warning (for demo purposes)
                  const post: Post = {
                    id: Date.now().toString(),
                    userId: user.id,
                    userName: user.name,
                    userAvatar: user.avatar,
                    content: newPost,
                    timestamp: new Date(),
                    likes: 0,
                    comments: []
                  };
                  try {
                    await addPost(post);
                  setNewPost('');
                    setShowContentWarning(false);
                  } catch (error) {
                    console.error('Error creating post:', error);
                    alert('Failed to create post. Please try again.');
                  }
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
      <div className="bg-black border border-gray-800 rounded-xl p-4">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-white mr-3" />
          <div>
            <h4 className="font-semibold text-white">Safe Learning Environment</h4>
            <p className="text-sm text-gray-300">
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
          <div key={post.id} className={`bg-white rounded-xl shadow-sm border ${post.id === featuredPostId ? 'ring-2 ring-purple-500' : ''}`}>
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(post.userName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{post.userName}</h3>
                      {post.id === featuredPostId && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <Pin className="h-3 w-3 mr-1" />
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setOpenDropdown(openDropdown === post.id ? null : post.id)}
                    className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  
                  {/* Action Dropdown Menu */}
                  {openDropdown === post.id && (
                    <div className="absolute right-0 top-8 w-52 bg-white rounded-lg shadow-xl border border-gray-200 z-20 py-1">
                      {post.userId === user.id && (
                        <>
                          {canEditPost(post) && (
                            <button
                              onClick={() => handleEditPost(post)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                            >
                              <Edit className="h-4 w-4 mr-3 text-blue-500" />
                              Edit Post
                            </button>
                          )}
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                          >
                            <Trash2 className="h-4 w-4 mr-3 text-red-500" />
                            Delete Post
                          </button>
                          <button
                            onClick={() => handleFeaturePost(post.id)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                          >
                            <Pin className={`h-4 w-4 mr-3 ${post.id === featuredPostId ? 'text-purple-500' : 'text-gray-500'}`} />
                            {post.id === featuredPostId ? 'Unfeature Post' : 'Feature on Profile'}
                          </button>
                          <div className="border-t border-gray-200 my-1"></div>
                        </>
                      )}
                      <button
                        onClick={() => handleCopyLink(post.id)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                      >
                        <LinkIcon className="h-4 w-4 mr-3 text-gray-500" />
                        Copy Link
                      </button>
                      {post.userId !== user.id && (
                        <>
                          <div className="border-t border-gray-200 my-1"></div>
                      <button
                            onClick={() => handleReportPost(post.id)}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                      >
                            <Flag className="h-4 w-4 mr-3" />
                        Report Post
                      </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-4">
              {editingPostId === post.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={3}
                    placeholder="Edit your post..."
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(post.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
              <p className="text-gray-800 leading-relaxed">{post.content}</p>
              )}
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

            {/* Post Video */}
            {post.video && (
              <div className="px-6 pb-4">
                <div className="relative w-full rounded-lg overflow-hidden bg-black">
                  <video
                    ref={(el) => {
                      videoRefs.current[post.id] = el;
                    }}
                    data-video-id={post.id}
                    src={post.video}
                    className="w-full h-auto max-h-96 object-cover"
                    loop
                    muted={globalMute}
                    playsInline
                    preload="metadata"
                    onLoadedData={() => {
                      // Set up intersection observer for this video
                      const video = videoRefs.current[post.id];
                      if (video) {
                        const observer = new IntersectionObserver(
                          (entries) => {
                            entries.forEach((entry) => {
                              if (entry.isIntersecting) {
                                video.play().catch(console.error);
                              } else {
                                video.pause();
                              }
                            });
                          },
                          {
                            threshold: 0.5,
                            rootMargin: '0px 0px -10% 0px'
                          }
                        );
                        observer.observe(video);
                      }
                    }}
                  />
                  
                  {/* Mute Button */}
                  <button
                    onClick={toggleGlobalMute}
                    className="absolute bottom-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                  >
                    {globalMute ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
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
