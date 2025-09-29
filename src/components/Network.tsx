import React, { useState } from 'react';
import { Users, UserPlus, Check, X, Search, Filter, Crown, MapPin, Briefcase } from 'lucide-react';
import { User, ConnectionRequest } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface NetworkProps {
  user: User;
}

const Network: React.FC<NetworkProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'connections' | 'requests' | 'discover'>('connections');
  const [searchTerm, setSearchTerm] = useState('');
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Network</h1>
        <p className="text-gray-600">Connect with fellow students and build your professional network</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'connections', label: 'Connections', count: connections.length },
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
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'connections' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConnections.map((connection) => (
              <div key={connection.id} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {getInitials(connection.name)}
                  </div>
                  <div className="flex items-center space-x-2">
                    {connection.isPro && <Crown className="h-4 w-4 text-yellow-500" />}
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(connection.lastActive, { addSuffix: true })}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">{connection.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{connection.course} • {connection.year}</p>
                <p className="text-sm text-gray-500 mb-3 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {connection.college}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {connection.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {connection.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{connection.skills.length - 3}
                    </span>
                  )}
                </div>
                
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Message
                </button>
              </div>
            ))}
          </div>
        )}

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
                <div key={request.id} className="bg-white rounded-xl shadow-sm border p-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiscoverUsers.map((discoverUser) => (
              <div key={discoverUser.id} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {getInitials(discoverUser.name)}
                  </div>
                  <div className="flex items-center space-x-2">
                    {discoverUser.isPro && <Crown className="h-4 w-4 text-yellow-500" />}
                    <span className="text-xs text-gray-500">
                      {discoverUser.mutualConnections} mutual
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">{discoverUser.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{discoverUser.course} • {discoverUser.year}</p>
                <p className="text-sm text-gray-500 mb-3 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {discoverUser.college}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {discoverUser.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {discoverUser.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{discoverUser.skills.length - 3}
                    </span>
                  )}
                </div>
                
                <button
                  onClick={() => handleSendConnectionRequest(discoverUser.id)}
                  className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Connect
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Network;
