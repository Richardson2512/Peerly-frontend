import React, { useState } from 'react';
import { Users, UserPlus, Check, X, Search, Filter, Crown, MapPin, Calendar, MoreVertical, Share, Flag, Ban, Trash2, MessageCircle, SortAsc, SortDesc, ChevronDown, Settings } from 'lucide-react';
import { User as UserType, ConnectionRequest } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface PeerProps {
  user: UserType;
  activeView?: 'main' | 'peers' | 'followers' | 'following' | 'groups' | 'events';
  onViewChange?: (view: 'main' | 'peers' | 'followers' | 'following' | 'groups' | 'events') => void;
}

const Peer: React.FC<PeerProps> = ({ user, activeView: propActiveView, onViewChange }) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'discover'>('discover');
  const [activeView, setActiveView] = useState<'main' | 'peers' | 'followers' | 'following' | 'groups' | 'events'>(propActiveView || 'main');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'college' | 'recent'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    people: true,
    company: false,
    colleges: [] as string[],
    dateRange: { start: '', end: '' },
    internships: false,
    locations: [] as string[]
  });

  // Update local state when prop changes
  React.useEffect(() => {
    if (propActiveView) {
      setActiveView(propActiveView);
    }
  }, [propActiveView]);

  // Disable internships filter for non-pro users
  React.useEffect(() => {
    if (!user.isPro && filters.internships) {
      setFilters(prev => ({ ...prev, internships: false }));
    }
  }, [user.isPro, filters.internships]);
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([
    {
      id: '1',
      fromUserId: '5',
      toUserId: user.id,
      status: 'pending',
      timestamp: new Date('2024-01-14T10:30:00'),
      message: 'Hi! I saw your posts about machine learning. Would love to connect and share ideas!'
    },
    {
      id: '2',
      fromUserId: '6',
      toUserId: user.id,
      status: 'pending',
      timestamp: new Date('2024-01-13T15:20:00'),
      message: 'Fellow CS student here! Let\'s connect and help each other with projects.'
    }
  ]);

  const [sentRequests, setSentRequests] = useState<ConnectionRequest[]>([
    {
      id: '3',
      fromUserId: user.id,
      toUserId: '7',
      status: 'pending',
      timestamp: new Date('2024-01-12T09:15:00')
    }
  ]);

  const [connections, setConnections] = useState([
    {
      id: '2',
      name: 'Sarah Chen',
      course: 'Computer Science',
      year: '3rd Year',
      college: 'MIT',
      avatar: undefined,
      skills: ['JavaScript', 'React', 'Python'],
      isPro: true,
      lastActive: new Date('2024-01-15T10:30:00')
    },
    {
      id: '3',
      name: 'Alex Rodriguez',
      course: 'Data Science',
      year: '2nd Year',
      college: 'Stanford University',
      avatar: undefined,
      skills: ['Python', 'Machine Learning', 'SQL'],
      isPro: false,
      lastActive: new Date('2024-01-14T16:45:00')
    },
    {
      id: '4',
      name: 'Emily Davis',
      course: 'Business Administration',
      year: '4th Year',
      college: 'Harvard University',
      avatar: undefined,
      skills: ['Marketing', 'Analytics', 'Leadership'],
      isPro: true,
      lastActive: new Date('2024-01-13T14:20:00')
    }
  ]);

  const [discoverUsers, setDiscoverUsers] = useState([
    {
      id: '5',
      name: 'David Wilson',
      course: 'Computer Science',
      year: '2nd Year',
      college: 'UC Berkeley',
      avatar: undefined,
      skills: ['Java', 'Spring Boot', 'Docker'],
      isPro: false,
      mutualConnections: 3,
      lastActive: new Date('2024-01-15T08:30:00')
    },
    {
      id: '6',
      name: 'Lisa Zhang',
      course: 'Information Technology',
      year: '3rd Year',
      college: 'Carnegie Mellon',
      avatar: undefined,
      skills: ['React', 'Node.js', 'MongoDB'],
      isPro: true,
      mutualConnections: 1,
      lastActive: new Date('2024-01-14T12:15:00')
    },
    {
      id: '7',
      name: 'Michael Brown',
      course: 'Computer Engineering',
      year: '1st Year',
      college: 'Georgia Tech',
      avatar: undefined,
      skills: ['C++', 'Arduino', 'Robotics'],
      isPro: false,
      mutualConnections: 2,
      lastActive: new Date('2024-01-13T18:45:00')
    }
  ]);

  // Mock data for peer management
  const [peers, setPeers] = useState([
    {
      id: '1',
      name: 'Sarah Chen',
      course: 'Computer Science',
      year: '3rd Year',
      college: 'MIT',
      avatar: undefined,
      skills: ['JavaScript', 'React', 'Python'],
      isPro: true,
      lastActive: new Date('2024-01-15T10:30:00'),
      connectedSince: new Date('2023-09-15T00:00:00')
    },
    {
      id: '2',
      name: 'Alex Rodriguez',
      course: 'Data Science',
      year: '2nd Year',
      college: 'Stanford University',
      avatar: undefined,
      skills: ['Python', 'Machine Learning', 'SQL'],
      isPro: false,
      lastActive: new Date('2024-01-14T16:45:00'),
      connectedSince: new Date('2023-11-20T00:00:00')
    },
    {
      id: '3',
      name: 'Emily Davis',
      course: 'Business Administration',
      year: '4th Year',
      college: 'Harvard University',
      avatar: undefined,
      skills: ['Marketing', 'Analytics', 'Leadership'],
      isPro: true,
      lastActive: new Date('2024-01-13T14:20:00'),
      connectedSince: new Date('2023-08-10T00:00:00')
    }
  ]);

  const [followers, setFollowers] = useState([
    {
      id: '4',
      name: 'John Smith',
      course: 'Engineering',
      year: '1st Year',
      college: 'Caltech',
      avatar: undefined,
      skills: ['Physics', 'Math', 'Research'],
      isPro: false,
      lastActive: new Date('2024-01-15T09:15:00'),
      followedSince: new Date('2024-01-01T00:00:00')
    },
    {
      id: '5',
      name: 'Maria Garcia',
      course: 'Medicine',
      year: '2nd Year',
      college: 'Johns Hopkins',
      avatar: undefined,
      skills: ['Biology', 'Chemistry', 'Research'],
      isPro: true,
      lastActive: new Date('2024-01-14T11:30:00'),
      followedSince: new Date('2023-12-15T00:00:00')
    }
  ]);

  const [following, setFollowing] = useState([
    {
      id: '6',
      name: 'Dr. Robert Johnson',
      course: 'Professor - Computer Science',
      year: 'Faculty',
      college: 'MIT',
      avatar: undefined,
      skills: ['AI Research', 'Machine Learning', 'Teaching'],
      isPro: true,
      lastActive: new Date('2024-01-15T14:00:00'),
      followingSince: new Date('2023-10-01T00:00:00')
    },
    {
      id: '7',
      name: 'Tech Startup Inc',
      course: 'Company',
      year: 'Founded 2020',
      college: 'Silicon Valley',
      avatar: undefined,
      skills: ['Innovation', 'Technology', 'Leadership'],
      isPro: true,
      lastActive: new Date('2024-01-15T12:00:00'),
      followingSince: new Date('2023-09-01T00:00:00')
    }
  ]);

  const [groups, setGroups] = useState([
    {
      id: '1',
      name: 'Computer Science Study Group',
      description: 'Weekly study sessions for CS courses',
      members: 24,
      isAdmin: true,
      joinedSince: new Date('2023-09-01T00:00:00')
    },
    {
      id: '2',
      name: 'Tech Entrepreneurs',
      description: 'Networking group for aspiring entrepreneurs',
      members: 156,
      isAdmin: false,
      joinedSince: new Date('2023-10-15T00:00:00')
    },
    {
      id: '3',
      name: 'Data Science Enthusiasts',
      description: 'Share projects and learn together',
      members: 89,
      isAdmin: false,
      joinedSince: new Date('2023-11-01T00:00:00')
    }
  ]);

  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Tech Career Fair 2024',
      date: new Date('2024-03-15T09:00:00'),
      location: 'Convention Center',
      attendees: 250,
      isRegistered: true,
      registeredSince: new Date('2024-01-10T00:00:00')
    },
    {
      id: '2',
      title: 'Startup Pitch Competition',
      date: new Date('2024-03-20T14:00:00'),
      location: 'Innovation Hub',
      attendees: 80,
      isRegistered: true,
      registeredSince: new Date('2024-01-05T00:00:00')
    },
    {
      id: '3',
      title: 'Networking Mixer',
      date: new Date('2024-03-25T18:00:00'),
      location: 'Downtown Club',
      attendees: 120,
      isRegistered: false,
      registeredSince: null
    }
  ]);

  const handleAcceptRequest = (requestId: string) => {
    setConnectionRequests(requests => 
      requests.filter(req => req.id !== requestId)
    );
    // In real app, would add to connections and notify backend
  };

  const handleRejectRequest = (requestId: string) => {
    setConnectionRequests(requests => 
      requests.filter(req => req.id !== requestId)
    );
  };

  const handleSendConnectionRequest = (userId: string) => {
    const newRequest: ConnectionRequest = {
      id: Date.now().toString(),
      fromUserId: user.id,
      toUserId: userId,
      status: 'pending',
      timestamp: new Date()
    };
    setSentRequests([...sentRequests, newRequest]);
    setDiscoverUsers(users => users.filter(u => u.id !== userId));
  };

  const handleRemovePeer = (peerId: string) => {
    setPeers(peers => peers.filter(p => p.id !== peerId));
  };

  const handleRemoveFollower = (followerId: string) => {
    setFollowers(followers => followers.filter(f => f.id !== followerId));
  };

  const handleUnfollow = (followingId: string) => {
    setFollowing(following => following.filter(f => f.id !== followingId));
  };

  const handleLeaveGroup = (groupId: string) => {
    setGroups(groups => groups.filter(g => g.id !== groupId));
  };

  const handleUnregisterEvent = (eventId: string) => {
    setEvents(events => events.map(e => 
      e.id === eventId ? { ...e, isRegistered: false, registeredSince: null } : e
    ));
  };

  const handleRegisterEvent = (eventId: string) => {
    setEvents(events => events.map(e => 
      e.id === eventId ? { ...e, isRegistered: true, registeredSince: new Date() } : e
    ));
  };

  const handleDropdownToggle = (id: string) => {
    setShowDropdown(showDropdown === id ? null : id);
  };

  // Filter modal component
  const FilterModal = () => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
      onClick={() => setShowFilters(false)}
    >
      <div 
        className="bg-white rounded-md shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Filter Options</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* People Filter */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.people}
                  onChange={(e) => setFilters({...filters, people: e.target.checked})}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">People</span>
              </label>
            </div>

            {/* Company Filter */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.company}
                  onChange={(e) => setFilters({...filters, company: e.target.checked})}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">Company</span>
              </label>
            </div>

            {/* Colleges Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Colleges</label>
              <div className="space-y-2">
                {['MIT', 'Stanford', 'Harvard', 'UC Berkeley', 'Carnegie Mellon'].map((college) => (
                  <label key={college} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={filters.colleges.includes(college)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({...filters, colleges: [...filters.colleges, college]});
                        } else {
                          setFilters({...filters, colleges: filters.colleges.filter(c => c !== college)});
                        }
                      }}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{college}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => setFilters({...filters, dateRange: {...filters.dateRange, start: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">End Date</label>
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => setFilters({...filters, dateRange: {...filters.dateRange, end: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Internships Filter (Pro Feature) */}
            <div>
              <label 
                className={`flex items-center space-x-3 ${!user.isPro ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={(e) => {
                  if (!user.isPro) {
                    e.preventDefault();
                    alert('This feature is available for Pro users only. Upgrade to Pro to access internship filters and discover actively hiring companies!');
                  }
                }}
              >
                <input
                  type="checkbox"
                  checked={filters.internships}
                  onChange={(e) => {
                    if (user.isPro) {
                      setFilters({...filters, internships: e.target.checked});
                    }
                  }}
                  disabled={!user.isPro}
                  className={`w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 ${
                    !user.isPro ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
                <span className={`text-sm font-medium ${!user.isPro ? 'text-gray-400' : 'text-gray-700'}`}>
                  Internships
                </span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                  Pro
                </span>
              </label>
              <p className={`text-xs mt-1 ml-7 ${!user.isPro ? 'text-gray-400' : 'text-gray-500'}`}>
                {!user.isPro ? 'Upgrade to Pro to access internship filters' : 'Shows actively hiring companies'}
              </p>
            </div>

            {/* Locations Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Locations</label>
              <div className="space-y-2">
                {['New York', 'San Francisco', 'Boston', 'Seattle', 'Austin'].map((location) => (
                  <label key={location} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={filters.locations.includes(location)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({...filters, locations: [...filters.locations, location]});
                        } else {
                          setFilters({...filters, locations: filters.locations.filter(l => l !== location)});
                        }
                      }}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{location}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-8">
            <button
              onClick={() => setFilters({
                people: true,
                company: false,
                colleges: [] as string[],
                dateRange: { start: '', end: '' },
                internships: user.isPro ? false : false, // Always false for non-pro users
                locations: [] as string[]
              })}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Reset Filters
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Search and filter bar component
  const SearchFilterBar = () => (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or college..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Sort and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Sort Dropdown */}
        <div className="flex-1">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'college' | 'recent')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="name">Sort by Name</option>
              <option value="college">Sort by College</option>
              <option value="recent">Sort by Recent</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Sort Order Toggle */}
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          <span className="text-sm text-gray-700">{sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
        </button>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>
    </div>
  );

  const getUserName = (userId: string) => {
    const names: { [key: string]: string } = {
      '5': 'David Wilson',
      '6': 'Lisa Zhang',
      '7': 'Michael Brown'
    };
    return names[userId] || 'Unknown User';
  };

  const filteredConnections = connections.filter(conn => 
    conn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conn.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conn.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDiscoverUsers = discoverUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render different views based on activeView
  const renderPeersView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Peers</h2>
          <p className="text-gray-600">Manage your peer connections</p>
        </div>
        <button 
          onClick={() => {
            setActiveView('main');
            onViewChange?.('main');
          }}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          ← Back to Discover
        </button>
      </div>
      
      <SearchFilterBar />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {peers.map((peer) => (
          <div key={peer.id} className="bg-white rounded-md shadow-sm border p-4 relative flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-base">
                {getInitials(peer.name)}
              </div>
              <div className="flex items-center space-x-2">
                {peer.isPro && <Crown className="h-4 w-4 text-yellow-500" />}
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(peer.id)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                  {showDropdown === peer.id && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Share className="h-4 w-4 mr-2" />
                        Share Profile
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Flag className="h-4 w-4 mr-2" />
                        Report
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Ban className="h-4 w-4 mr-2" />
                        Block
                      </button>
                      <button 
                        onClick={() => handleRemovePeer(peer.id)}
                        className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex-grow">
              <h3 className="font-semibold text-gray-900 mb-1">{peer.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{peer.course} • {peer.year}</p>
              <p className="text-sm text-gray-500 mb-3 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {peer.college}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {peer.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
                {peer.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{peer.skills.length - 3}
                  </span>
                )}
              </div>
              
              <div className="text-xs text-gray-500 mb-3">
                Connected since {formatDistanceToNow(peer.connectedSince, { addSuffix: true })}
              </div>
            </div>
            
            <div className="flex space-x-2 mt-auto">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-1.5 px-3 rounded-lg transition-colors text-xs font-medium">
                Message
              </button>
              <button className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors text-xs font-medium">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Filter Modal */}
      {showFilters && <FilterModal />}
    </div>
  );

  const renderFollowersView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Followers</h2>
          <p className="text-gray-600">People who follow you</p>
        </div>
        <button 
          onClick={() => {
            setActiveView('main');
            onViewChange?.('main');
          }}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          ← Back to Discover
        </button>
      </div>
      
      <SearchFilterBar />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {followers.map((follower) => (
          <div key={follower.id} className="bg-white rounded-md shadow-sm border p-4 relative">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-base">
                {getInitials(follower.name)}
              </div>
              <div className="flex items-center space-x-2">
                {follower.isPro && <Crown className="h-4 w-4 text-yellow-500" />}
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(follower.id)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                  {showDropdown === follower.id && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Share className="h-4 w-4 mr-2" />
                        Share Profile
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Flag className="h-4 w-4 mr-2" />
                        Report
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Ban className="h-4 w-4 mr-2" />
                        Block
                      </button>
                      <button 
                        onClick={() => handleRemoveFollower(follower.id)}
                        className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-1">{follower.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{follower.course} • {follower.year}</p>
            <p className="text-sm text-gray-500 mb-3 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {follower.college}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {follower.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {skill}
                </span>
              ))}
              {follower.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{follower.skills.length - 3}
                </span>
              )}
            </div>
            
            <div className="text-xs text-gray-500 mb-3">
              Following since {formatDistanceToNow(follower.followedSince, { addSuffix: true })}
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-1.5 px-3 rounded-lg transition-colors text-xs font-medium">
                Follow Back
              </button>
              <button className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors text-xs font-medium">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Filter Modal */}
      {showFilters && <FilterModal />}
    </div>
  );

  const renderFollowingView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Following</h2>
          <p className="text-gray-600">People and organizations you follow</p>
        </div>
        <button 
          onClick={() => {
            setActiveView('main');
            onViewChange?.('main');
          }}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          ← Back to Discover
        </button>
      </div>
      
      <SearchFilterBar />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {following.map((follow) => (
          <div key={follow.id} className="bg-white rounded-md shadow-sm border p-4 relative flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-base">
                {getInitials(follow.name)}
              </div>
              <div className="flex items-center space-x-2">
                {follow.isPro && <Crown className="h-4 w-4 text-yellow-500" />}
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(follow.id)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                  {showDropdown === follow.id && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Share className="h-4 w-4 mr-2" />
                        Share Profile
                      </button>
                      <button 
                        onClick={() => handleUnfollow(follow.id)}
                        className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Unfollow
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex-grow">
              <h3 className="font-semibold text-gray-900 mb-1">{follow.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{follow.course} • {follow.year}</p>
              <p className="text-sm text-gray-500 mb-3 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {follow.college}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {follow.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
                {follow.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{follow.skills.length - 3}
                  </span>
                )}
              </div>
              
              <div className="text-xs text-gray-500 mb-3">
                Following since {formatDistanceToNow(follow.followingSince, { addSuffix: true })}
              </div>
            </div>
            
            <div className="flex space-x-2 mt-auto">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-1.5 px-3 rounded-lg transition-colors text-xs font-medium">
                Message
              </button>
              <button className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors text-xs font-medium">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Filter Modal */}
      {showFilters && <FilterModal />}
    </div>
  );

  const renderGroupsView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Groups</h2>
          <p className="text-gray-600">Groups you're part of</p>
        </div>
        <button 
          onClick={() => {
            setActiveView('main');
            onViewChange?.('main');
          }}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          ← Back to Discover
        </button>
      </div>
      
      <SearchFilterBar />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {groups.map((group) => (
          <div key={group.id} className="bg-white rounded-md shadow-sm border p-4 relative flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-base">
                {group.name.charAt(0)}
              </div>
              <div className="flex items-center space-x-2">
                {group.isAdmin && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                    Admin
                  </span>
                )}
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(group.id)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                  {showDropdown === group.id && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        View Group
                      </button>
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Share className="h-4 w-4 mr-2" />
                        Share Group
                      </button>
                      {group.isAdmin && (
                        <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Settings className="h-4 w-4 mr-2" />
                          Manage Group
                        </button>
                      )}
                      <button 
                        onClick={() => handleLeaveGroup(group.id)}
                        className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Leave Group
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex-grow">
              <h3 className="font-semibold text-gray-900 mb-2">{group.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{group.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {group.members} members
                </div>
                <div className="text-xs text-gray-500">
                  Joined {formatDistanceToNow(group.joinedSince, { addSuffix: true })}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-auto">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-1.5 px-3 rounded-lg transition-colors text-xs font-medium">
                View Group
              </button>
              <button className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Filter Modal */}
      {showFilters && <FilterModal />}
    </div>
  );

  const renderEventsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Events</h2>
          <p className="text-gray-600">Events you're registered for and recommendations</p>
        </div>
        <button 
          onClick={() => {
            setActiveView('main');
            onViewChange?.('main');
          }}
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          ← Back to Discover
        </button>
      </div>
      
      <SearchFilterBar />

      {/* Registered Events */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Registered Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {events.filter(e => e.isRegistered).map((event) => (
            <div key={event.id} className="bg-white rounded-md shadow-sm border p-4 relative flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-base">
                  <Calendar className="h-8 w-8" />
                </div>
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(event.id)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                  {showDropdown === event.id && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Share className="h-4 w-4 mr-2" />
                        Share Event
                      </button>
                      <button 
                        onClick={() => handleUnregisterEvent(event.id)}
                        className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Unregister
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-grow">
                <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p className="flex items-center">
                    <Calendar className="h-3 w-3 mr-2" />
                    {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <p className="flex items-center">
                    <MapPin className="h-3 w-3 mr-2" />
                    {event.location}
                  </p>
                  <p className="flex items-center">
                    <Users className="h-3 w-3 mr-2" />
                    {event.attendees} attendees
                  </p>
                </div>
                
                <div className="text-xs text-gray-500 mb-4">
                  Registered {formatDistanceToNow(event.registeredSince!, { addSuffix: true })}
                </div>
              </div>
              
              <div className="flex space-x-2 mt-auto">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-3 rounded-lg transition-colors text-xs font-medium">
                  View Event
                </button>
                <button className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                  <Share className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            { title: "Tech Career Fair 2024", date: "March 15, 2024", location: "Convention Center", attendees: 250 },
            { title: "Startup Pitch Competition", date: "March 20, 2024", location: "Innovation Hub", attendees: 80 },
            { title: "Networking Mixer", date: "March 25, 2024", location: "Downtown Club", attendees: 120 },
            { title: "AI & ML Workshop", date: "March 30, 2024", location: "Tech Campus", attendees: 60 }
          ].map((event, index) => (
            <div key={index} className="bg-white rounded-md shadow-sm border p-4 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-base">
                  <Calendar className="h-8 w-8" />
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                  Upcoming
                </span>
              </div>
              
              <div className="flex-grow">
                <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p className="flex items-center">
                    <Calendar className="h-3 w-3 mr-2" />
                    {event.date}
                  </p>
                  <p className="flex items-center">
                    <MapPin className="h-3 w-3 mr-2" />
                    {event.location}
                  </p>
                  <p className="flex items-center">
                    <Users className="h-3 w-3 mr-2" />
                    {event.attendees} attendees
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-auto">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-3 rounded-lg transition-colors text-xs font-medium">
                  Join Event
                </button>
                <button className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                  <Share className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Recommendations */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Events (Next 30 Days)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {events.filter(e => !e.isRegistered).map((event) => (
            <div key={event.id} className="bg-white rounded-md shadow-sm border p-4 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-base">
                  <Calendar className="h-8 w-8" />
                </div>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                  Recommended
                </span>
              </div>
              
              <div className="flex-grow">
                <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p className="flex items-center">
                    <Calendar className="h-3 w-3 mr-2" />
                    {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <p className="flex items-center">
                    <MapPin className="h-3 w-3 mr-2" />
                    {event.location}
                  </p>
                  <p className="flex items-center">
                    <Users className="h-3 w-3 mr-2" />
                    {event.attendees} attendees
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-auto">
                <button 
                  onClick={() => handleRegisterEvent(event.id)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-1.5 px-3 rounded-lg transition-colors text-xs font-medium"
                >
                  Register
                </button>
                <button className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                  <Share className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Filter Modal */}
      {showFilters && <FilterModal />}
    </div>
  );

  // If not on main view, render the specific view
  if (activeView !== 'main') {
    return (
      <div className="w-full p-6">
        {activeView === 'peers' && renderPeersView()}
        {activeView === 'followers' && renderFollowersView()}
        {activeView === 'following' && renderFollowingView()}
        {activeView === 'groups' && renderGroupsView()}
        {activeView === 'events' && renderEventsView()}
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Peer</h1>
        <p className="text-gray-600">Connect with fellow students and build your professional network</p>
      </div>


      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'requests', label: 'Requests', count: connectionRequests.length },
            { id: 'discover', label: 'Discover', count: discoverUsers.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, course, or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <button 
          onClick={() => setShowFilters(true)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">

        {activeTab === 'requests' && (
          <div className="space-y-4">
            {connectionRequests.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No connection requests</h3>
                <p className="text-gray-500">You don't have any pending connection requests</p>
              </div>
            ) : (
              connectionRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-md shadow-sm border p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {getInitials(getUserName(request.fromUserId))}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{getUserName(request.fromUserId)}</h3>
                        <span className="text-sm text-gray-500">
                          {formatDistanceToNow(request.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{request.message}</p>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="flex items-center px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'discover' && (
          <div className="space-y-6">
            {/* Discover People */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Discover New People</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" style={{maxWidth: 'calc(100vw - 350px - 328px)'}}>
                {[
                  { name: "Sarah Johnson", course: "Computer Science", college: "MIT", mutual: 12, skills: ["JavaScript", "React", "Python"], isPro: true },
                  { name: "Mike Chen", course: "Data Science", college: "Stanford", mutual: 8, skills: ["Python", "Machine Learning", "SQL"], isPro: false },
                  { name: "Emily Davis", course: "Business", college: "Harvard", mutual: 15, skills: ["Marketing", "Analytics", "Leadership"], isPro: true },
                  { name: "Alex Rodriguez", course: "Engineering", college: "Berkeley", mutual: 6, skills: ["Java", "Spring Boot", "Docker"], isPro: false },
                  { name: "Lisa Wang", course: "Design", college: "RISD", mutual: 9, skills: ["UI/UX", "Figma", "Adobe Creative"], isPro: true },
                  { name: "David Kim", course: "Medicine", college: "Johns Hopkins", mutual: 11, skills: ["Biology", "Chemistry", "Research"], isPro: false },
                  { name: "David Wilson", course: "Computer Science", year: "2nd Year", college: "UC Berkeley", mutual: 3, skills: ["Java", "Spring Boot", "Docker"], isPro: false },
                  { name: "Lisa Zhang", course: "Information Technology", year: "3rd Year", college: "Carnegie Mellon", mutual: 1, skills: ["React", "Node.js", "MongoDB"], isPro: true },
                  { name: "Michael Brown", course: "Computer Engineering", year: "1st Year", college: "Georgia Tech", mutual: 2, skills: ["C++", "Arduino", "Robotics"], isPro: false }
                ].map((person, index) => (
                  <div key={index} className="bg-white rounded-md shadow-sm border p-4 flex flex-col h-full">
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-base mb-2">
                        {getInitials(person.name)}
                      </div>
                      <div className="flex items-center space-x-2">
                        {person.isPro && <Crown className="h-4 w-4 text-yellow-500" />}
                        <span className="text-xs text-gray-500">
                          {person.mutual} mutual
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1">{person.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{person.course} • {person.year || "Student"}</p>
                      <p className="text-sm text-gray-500 mb-3 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {person.college}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {person.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                        {person.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{person.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors mt-auto">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Peer up
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Filter Modal */}
      {showFilters && <FilterModal />}
    </div>
  );
};

export default Peer;
