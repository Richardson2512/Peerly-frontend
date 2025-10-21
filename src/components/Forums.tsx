import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Lock, 
  Globe, 
  MessageCircle, 
  Clock, 
  Star,
  MoreHorizontal,
  Settings,
  UserPlus,
  Eye,
  EyeOff
} from 'lucide-react';
import { User, ForumDiscussion, ForumMembership } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ForumsProps {
  user: User;
  onNavigateToDiscussion: (discussionId: string) => void;
}

const Forums: React.FC<ForumsProps> = ({ user, onNavigateToDiscussion }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinRequestModal, setShowJoinRequestModal] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<ForumDiscussion | null>(null);

  // Mock data for discussions
  const [discussions, setDiscussions] = useState<ForumDiscussion[]>([
    {
      id: '1',
      title: 'Computer Science Study Group',
      description: 'A place for CS students to discuss algorithms, data structures, and programming concepts.',
      ownerId: 'user1',
      ownerName: 'Sarah Chen',
      isPrivate: false,
      category: 'academic',
      tags: ['programming', 'algorithms', 'study-group'],
      createdAt: new Date('2024-01-10T10:00:00'),
      updatedAt: new Date('2024-01-15T14:30:00'),
      memberCount: 45,
      postCount: 128,
      lastActivity: new Date('2024-01-15T14:30:00'),
      isActive: true
    },
    {
      id: '2',
      title: 'Hackathon Winners Circle',
      description: 'Exclusive group for students who have won hackathons. Share experiences, tips, and collaborate on projects.',
      ownerId: 'user2',
      ownerName: 'Alex Rodriguez',
      isPrivate: true,
      category: 'competition',
      tags: ['hackathon', 'winners', 'collaboration'],
      createdAt: new Date('2024-01-08T16:00:00'),
      updatedAt: new Date('2024-01-14T09:15:00'),
      memberCount: 12,
      postCount: 67,
      lastActivity: new Date('2024-01-14T09:15:00'),
      isActive: true
    },
    {
      id: '3',
      title: 'Internship Experiences',
      description: 'Share your internship experiences, tips for applications, and learn from others.',
      ownerId: 'user3',
      ownerName: 'Emily Davis',
      isPrivate: false,
      category: 'career',
      tags: ['internship', 'career', 'experience'],
      createdAt: new Date('2024-01-05T12:00:00'),
      updatedAt: new Date('2024-01-13T18:45:00'),
      memberCount: 89,
      postCount: 234,
      lastActivity: new Date('2024-01-13T18:45:00'),
      isActive: true
    },
    {
      id: '4',
      title: 'AI & Machine Learning Enthusiasts',
      description: 'Discuss the latest in AI, ML, and deep learning. Share projects and research papers.',
      ownerId: 'user4',
      ownerName: 'David Wilson',
      isPrivate: false,
      category: 'technology',
      tags: ['ai', 'machine-learning', 'research'],
      createdAt: new Date('2024-01-03T08:30:00'),
      updatedAt: new Date('2024-01-12T11:20:00'),
      memberCount: 156,
      postCount: 445,
      lastActivity: new Date('2024-01-12T11:20:00'),
      isActive: true
    },
    {
      id: '5',
      title: 'Startup Founders Network',
      description: 'Private group for students who have started or are planning to start their own companies.',
      ownerId: 'user5',
      ownerName: 'Priya Sharma',
      isPrivate: true,
      category: 'entrepreneurship',
      tags: ['startup', 'founders', 'entrepreneurship'],
      createdAt: new Date('2024-01-01T14:00:00'),
      updatedAt: new Date('2024-01-11T16:30:00'),
      memberCount: 23,
      postCount: 89,
      lastActivity: new Date('2024-01-11T16:30:00'),
      isActive: true
    }
  ]);

  const [userMemberships, setUserMemberships] = useState<ForumMembership[]>([
    {
      id: '1',
      discussionId: '1',
      userId: user.id,
      role: 'member',
      joinedAt: new Date('2024-01-11T10:00:00'),
      status: 'active'
    },
    {
      id: '2',
      discussionId: '3',
      userId: user.id,
      role: 'member',
      joinedAt: new Date('2024-01-06T15:00:00'),
      status: 'active'
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'academic', label: 'Academic' },
    { value: 'career', label: 'Career' },
    { value: 'technology', label: 'Technology' },
    { value: 'competition', label: 'Competitions' },
    { value: 'entrepreneurship', label: 'Entrepreneurship' },
    { value: 'general', label: 'General' }
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isUserMember = (discussionId: string) => {
    return userMemberships.some(membership => 
      membership.discussionId === discussionId && membership.status === 'active'
    );
  };

  const handleJoinDiscussion = (discussion: ForumDiscussion) => {
    if (discussion.isPrivate) {
      setSelectedDiscussion(discussion);
      setShowJoinRequestModal(true);
    } else {
      // Join public discussion directly
      const newMembership: ForumMembership = {
        id: Date.now().toString(),
        discussionId: discussion.id,
        userId: user.id,
        role: 'member',
        joinedAt: new Date(),
        status: 'active'
      };
      setUserMemberships([...userMemberships, newMembership]);
      
      // Update member count
      setDiscussions(discussions.map(d => 
        d.id === discussion.id 
          ? { ...d, memberCount: d.memberCount + 1 }
          : d
      ));
    }
  };

  const handleCreateDiscussion = (formData: any) => {
    const newDiscussion: ForumDiscussion = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      ownerId: user.id,
      ownerName: user.name,
      ownerAvatar: user.avatar,
      isPrivate: formData.isPrivate,
      category: formData.category,
      tags: formData.tags.split(',').map((tag: string) => tag.trim()),
      createdAt: new Date(),
      updatedAt: new Date(),
      memberCount: 1,
      postCount: 0,
      lastActivity: new Date(),
      isActive: true
    };

    setDiscussions([newDiscussion, ...discussions]);
    
    // Add user as owner
    const ownerMembership: ForumMembership = {
      id: Date.now().toString(),
      discussionId: newDiscussion.id,
      userId: user.id,
      role: 'owner',
      joinedAt: new Date(),
      status: 'active'
    };
    setUserMemberships([...userMemberships, ownerMembership]);
    
    setShowCreateModal(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="w-full p-6" style={{marginLeft: '350px', maxWidth: 'calc(100vw - 350px - 328px)'}}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Discussion Forums</h1>
            <p className="text-gray-600 mt-2">Connect with fellow students and engage in meaningful discussions</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Discussion
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-4xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Discussions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDiscussions.map((discussion) => {
          const isMember = isUserMember(discussion.id);
          const isOwner = discussion.ownerId === user.id;
          
          return (
            <div key={discussion.id} className="bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                {/* Discussion Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {getInitials(discussion.ownerName)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{discussion.title}</h3>
                      <p className="text-sm text-gray-500">by {discussion.ownerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {discussion.isPrivate ? (
                      <Lock className="h-4 w-4 text-gray-400" title="Private Discussion" />
                    ) : (
                      <Globe className="h-4 w-4 text-gray-400" title="Public Discussion" />
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{discussion.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {discussion.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {discussion.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{discussion.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{discussion.memberCount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{discussion.postCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDistanceToNow(discussion.lastActivity, { addSuffix: true })}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {isOwner ? (
                    <button
                      onClick={() => onNavigateToDiscussion(discussion.id)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Manage
                    </button>
                  ) : isMember ? (
                    <button
                      onClick={() => onNavigateToDiscussion(discussion.id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Enter Discussion
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoinDiscussion(discussion)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      {discussion.isPrivate ? (
                        <>
                          <UserPlus className="h-4 w-4" />
                          Request to Join
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Join Discussion
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Discussion Modal */}
      {showCreateModal && (
        <CreateDiscussionModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateDiscussion}
          categories={categories}
        />
      )}

      {/* Join Request Modal */}
      {showJoinRequestModal && selectedDiscussion && (
        <JoinRequestModal
          discussion={selectedDiscussion}
          onClose={() => {
            setShowJoinRequestModal(false);
            setSelectedDiscussion(null);
          }}
          onSubmit={(message) => {
            console.log('Join request sent:', { discussionId: selectedDiscussion.id, message });
            setShowJoinRequestModal(false);
            setSelectedDiscussion(null);
          }}
        />
      )}
    </div>
  );
};

// Create Discussion Modal Component
interface CreateDiscussionModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  categories: { value: string; label: string }[];
}

const CreateDiscussionModal: React.FC<CreateDiscussionModalProps> = ({ onClose, onSubmit, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    isPrivate: false,
    tags: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-md max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create New Discussion</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <MoreHorizontal className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discussion Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter a descriptive title for your discussion"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this discussion is about and what topics will be covered"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.filter(cat => cat.value !== 'all').map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Enter tags separated by commas"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isPrivate"
                checked={formData.isPrivate}
                onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="isPrivate" className="text-sm font-medium text-gray-700">
                Make this a private discussion (invite-only)
              </label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Create Discussion
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Join Request Modal Component
interface JoinRequestModalProps {
  discussion: ForumDiscussion;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

const JoinRequestModal: React.FC<JoinRequestModalProps> = ({ discussion, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-md max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Request to Join</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <MoreHorizontal className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{discussion.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to Owner (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell the owner why you'd like to join this discussion..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forums;
