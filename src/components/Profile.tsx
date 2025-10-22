import React, { useState, useRef, useMemo } from 'react';
import { User, Post, Event } from '../types';
import { uploadPostMedia } from '../lib/storage';
import { usePosts } from '../contexts/PostsContext';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import MediaUploadModal from './MediaUploadModal';
import MediaEditor from './MediaEditor';
import { 
  User as UserIcon, 
  MapPin, 
  Calendar, 
  Award as AwardIcon, 
  GraduationCap, 
  Briefcase, 
  Star, 
  Eye, 
  Users, 
  MessageCircle,
  Plus,
  Edit,
  Globe,
  Github,
  Linkedin,
  BookOpen,
  Code,
  Heart,
  Share,
  MoreHorizontal,
  UserPlus,
  CheckCircle,
  X,
  Image as ImageIcon,
  Smile,
  Camera,
  Trash2,
  Link as LinkIcon
} from 'lucide-react';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { posts: allPosts, addPost, deletePost: deletePostFromContext, getUserPosts } = usePosts();
  const [activeTab, setActiveTab] = useState<'about' | 'activity' | 'events'>('about');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [postImage, setPostImage] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [showMediaEditor, setShowMediaEditor] = useState(false);
  const [tempMediaUrl, setTempMediaUrl] = useState<string | null>(null);
  const [mediaValidationResult, setMediaValidationResult] = useState<any>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [openPostDropdown, setOpenPostDropdown] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Get user's posts from shared context - memoized to update when posts change
  const userPosts = useMemo(() => {
    return allPosts.filter(post => post.userId === user.id);
  }, [allPosts, user.id]);

  // Recommended events (empty for new users, would be fetched from backend)
  const recommendedEvents: Event[] = [];

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;

    try {
      setUploadingImage(true);

      let imageUrl: string | undefined;

      // Upload image to Supabase Storage if there's one
      if (imageFile) {
        try {
          imageUrl = await uploadPostMedia(user.id, imageFile);
          console.log('Image uploaded successfully:', imageUrl);
        } catch (uploadError) {
          console.error('Failed to upload image:', uploadError);
          alert('Failed to upload image. Post will be created without the image.');
        }
      }

      const post: Post = {
        id: Date.now().toString(), // Temporary ID, will be replaced by Supabase
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        content: newPost,
        image: imageUrl,
        timestamp: new Date(),
        likes: 0,
        comments: []
      };

      await addPost(post);
      setNewPost('');
      setPostImage(null);
      setImageFile(null);
      setShowCreatePost(false);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePostFromContext(postId);
        setOpenPostDropdown(null);
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleCopyPostLink = (postId: string) => {
    const postLink = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postLink);
    alert('Post link copied to clipboard!');
    setOpenPostDropdown(null);
  };

  const handleEditPost = (postId: string) => {
    // Edit functionality can be implemented later
    alert('Edit functionality coming soon!');
    setOpenPostDropdown(null);
  };

  const handleMediaFileSelect = (file: File, validationResult?: any) => {
    try {
      // Validate file size
      const maxSize = file.type.startsWith('image/') ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`File size must be less than ${file.type.startsWith('image/') ? '10MB' : '50MB'}`);
        return;
      }

      // Validate file type
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
      const validVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
      
      if (!validImageTypes.includes(file.type) && !validVideoTypes.includes(file.type)) {
        alert('Please upload a valid media file (Images: JPEG, PNG, GIF, WebP or Videos: MP4, WebM)');
        return;
      }

      // Close media modal
      setShowMediaModal(false);

      // For images, show editor
      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        setTempMediaUrl(previewUrl);
        setImageFile(file);
        setMediaValidationResult(validationResult);
        setShowMediaEditor(true);
      } else {
        // For videos, add directly (no editing)
        const previewUrl = URL.createObjectURL(file);
        setPostImage(previewUrl);
        setImageFile(file);
      }
    } catch (error) {
      console.error('Error handling media:', error);
      alert('Failed to process media. Please try again.');
    }
  };

  const handleSaveEditedMedia = (editedUrl: string) => {
    setPostImage(editedUrl);
    setShowMediaEditor(false);
    
    // Convert the edited canvas blob back to File for upload
    fetch(editedUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `edited-${Date.now()}.jpg`, { type: 'image/jpeg' });
        setImageFile(file);
      });
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;
    const textarea = textareaRef.current;
    
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = newPost;
      const newText = text.substring(0, start) + emoji + text.substring(end);
      
      setNewPost(newText);
      
      // Set cursor position after emoji
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
      }, 0);
    } else {
      setNewPost(newPost + emoji);
    }
    
    setShowEmojiPicker(false);
  };

  const renderProficiencyBadge = (proficiency: string) => {
    const colors = {
      native: 'bg-green-100 text-green-800',
      advanced: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      beginner: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[proficiency as keyof typeof colors]}`}>
        {proficiency}
      </span>
    );
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-purple-600 to-emerald-600 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <button className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
            <Edit className="h-4 w-4 mr-2 inline" />
            Edit Cover
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end -mt-16 mb-4">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-white text-3xl font-bold">{getInitials(user.name)}</span>
                )}
              </div>
              <button className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="ml-6 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                {user.isPro && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Pro
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-lg">{user.course} Student at {user.college}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                {user.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {user.location}
                  </div>
                )}
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {user.profileViews.toLocaleString()} profile views
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {user.followers.length} followers
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </button>
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
                  isFollowing 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isFollowing ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </>
                )}
              </button>
              <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{user.bio}</p>
            </div>
          )}

          {/* Social Links */}
          <div className="flex gap-4 mb-6">
            {user.linkedinUrl && (
              <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-700">
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </a>
            )}
            {user.githubUrl && (
              <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-gray-800">
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
            )}
            {user.portfolioUrl && (
              <a href={user.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-600 hover:text-purple-700">
                <Globe className="h-5 w-5 mr-2" />
                Portfolio
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-md shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'about', label: 'About', icon: UserIcon },
              { id: 'activity', label: 'Activity', icon: BookOpen },
              { id: 'events', label: 'Events', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* Education */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-purple-600" />
                  Education
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">{user.college}</h4>
                  <p className="text-gray-600">{user.course} • {user.courseLevel}</p>
                  <p className="text-gray-500 text-sm">{user.year} • Expected Graduation: {user.graduationDate.toLocaleDateString()}</p>
                </div>
              </div>

              {/* Experience/Internships */}
              {user.internships.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-purple-600" />
                    Experience
                  </h3>
                  <div className="space-y-4">
                    {user.internships.map((internship) => (
                      <div key={internship.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{internship.title}</h4>
                            <p className="text-gray-600">{internship.company} • {internship.location}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            internship.isCurrent ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {internship.isCurrent ? 'Current' : 'Past'}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mb-2">
                          {internship.startDate.toLocaleDateString()} - {internship.endDate.toLocaleDateString()}
                        </p>
                        {internship.description && (
                          <p className="text-gray-700 text-sm">{internship.description}</p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {internship.skills.map((skill) => (
                            <span key={skill} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {user.skills && user.skills.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Code className="h-5 w-5 mr-2 text-purple-600" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {user.languages.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-purple-600" />
                    Languages
                  </h3>
                  <div className="space-y-3">
                    {user.languages.map((language) => (
                      <div key={language.id} className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{language.language}</span>
                        {renderProficiencyBadge(language.proficiency)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards */}
              {user.awards.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <AwardIcon className="h-5 w-5 mr-2 text-purple-600" />
                    Awards & Recognition
                  </h3>
                  <div className="space-y-3">
                    {user.awards.map((award) => (
                      <div key={award.id} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900">{award.title}</h4>
                        <p className="text-gray-600">{award.issuer}</p>
                        <p className="text-gray-500 text-sm">{award.date.toLocaleDateString()}</p>
                        {award.description && (
                          <p className="text-gray-700 text-sm mt-1">{award.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Company Recommendations */}
              {user.companyRecommendations.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-purple-600" />
                    Recommendations
                  </h3>
                  <div className="space-y-4">
                    {user.companyRecommendations.map((rec) => (
                      <div key={rec.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{rec.recommenderName}</h4>
                            <p className="text-gray-600">{rec.recommenderTitle} at {rec.companyName}</p>
                          </div>
                          {renderStarRating(rec.rating)}
                        </div>
                        <p className="text-gray-700 text-sm italic">"{rec.recommendation}"</p>
                        <p className="text-gray-500 text-xs mt-2">{rec.date.toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              {/* Create Post Button */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">My Posts</h3>
                <button
                  onClick={() => setShowCreatePost(true)}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all shadow-sm"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Post
                </button>
              </div>

              {/* Posts List */}
              {userPosts.length > 0 ? (
                <div className="space-y-4">
                  {userPosts.map((post) => (
                    <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <span className="text-white font-semibold">{getInitials(user.name)}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-gray-900">{post.userName}</span>
                              <span className="text-gray-500 text-sm">{post.timestamp.toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-700 mb-3 whitespace-pre-wrap">{post.content}</p>
                            
                            {/* Post Image */}
                            {post.image && (
                              <img 
                                src={post.image} 
                                alt="Post content" 
                                className="w-full rounded-lg mt-3 max-h-96 object-cover"
                              />
                            )}

                            <div className="flex items-center space-x-6 text-gray-500 mt-4">
                              <button className="flex items-center hover:text-red-500 transition-colors">
                                <Heart className="h-5 w-5 mr-1" />
                                {post.likes}
                              </button>
                              <button className="flex items-center hover:text-blue-500 transition-colors">
                                <MessageCircle className="h-5 w-5 mr-1" />
                                {post.comments.length}
                              </button>
                              <button className="flex items-center hover:text-emerald-500 transition-colors">
                                <Share className="h-5 w-5 mr-1" />
                                Share
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Post Actions Menu */}
                        <div className="relative">
                          <button
                            onClick={() => setOpenPostDropdown(openPostDropdown === post.id ? null : post.id)}
                            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                          
                          {/* Dropdown Menu */}
                          {openPostDropdown === post.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-20 py-1">
                              {/* Edit Post */}
                              <button
                                onClick={() => handleEditPost(post.id)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                              >
                                <Edit className="h-4 w-4 mr-3 text-blue-500" />
                                Edit Post
                              </button>
                              
                              {/* Delete Post */}
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                              >
                                <Trash2 className="h-4 w-4 mr-3 text-red-500" />
                                Delete Post
                              </button>
                              
                              <div className="border-t border-gray-200 my-1"></div>
                              
                              {/* Copy Link */}
                              <button
                                onClick={() => handleCopyPostLink(post.id)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors"
                              >
                                <LinkIcon className="h-4 w-4 mr-3 text-gray-500" />
                                Copy Link
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-500 mb-4">Share your thoughts with your network</p>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Post
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Events</h3>
              {recommendedEvents.length > 0 ? (
                recommendedEvents.map((event) => (
                  <div key={event.id} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                    <div className="flex items-center space-x-4 text-gray-500 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {event.date.toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </div>
                    </div>
                    <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                      Learn More
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
                  <p className="text-gray-500">Check back later for upcoming events and workshops</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create Post</h2>
                <button
                  onClick={() => {
                    setShowCreatePost(false);
                    setNewPost('');
                    setPostImage(null);
                    setImageFile(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-white font-semibold">{getInitials(user.name)}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.college}</p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none min-h-[150px]"
                    autoFocus
                  />
                  {/* Emoji Picker Button */}
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded"
                  >
                    <Smile className="h-6 w-6" />
                  </button>
                  
                  {/* Emoji Picker Dropdown */}
                  {showEmojiPicker && (
                    <div className="absolute bottom-16 right-0 z-50">
                      <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                  )}
                </div>

                {/* Image Preview */}
                {postImage && (
                  <div className="relative">
                    <img src={postImage} alt="Preview" className="w-full rounded-lg max-h-96 object-cover" />
                    <button
                      onClick={() => {
                        if (postImage) {
                          URL.revokeObjectURL(postImage);
                        }
                        setPostImage(null);
                        setImageFile(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Add Media Button */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowMediaModal(true)}
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    title="Add Media"
                  >
                    <ImageIcon className="h-5 w-5 mr-2" />
                    Add Media
                  </button>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowCreatePost(false);
                      setNewPost('');
                      setPostImage(null);
                      setImageFile(null);
                    }}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPost.trim() || uploadingImage}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingImage ? 'Uploading...' : 'Post'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Upload Modal */}
      {showMediaModal && (
        <MediaUploadModal
          onFileSelect={handleMediaFileSelect}
          onClose={() => setShowMediaModal(false)}
        />
      )}

      {/* Media Editor Modal */}
      {showMediaEditor && tempMediaUrl && (
        <MediaEditor
          imageUrl={tempMediaUrl}
          onSave={handleSaveEditedMedia}
          onCancel={() => {
            setShowMediaEditor(false);
            setTempMediaUrl(null);
            setMediaValidationResult(null);
          }}
          autoCropSuggestion={mediaValidationResult?.autoCropSuggestion}
        />
      )}
    </div>
  );
};

export default Profile;
