import React, { useState } from 'react';
import { CreditCard as Edit3, MapPin, Calendar, Mail, GraduationCap, Award, Users, Camera, Plus } from 'lucide-react';
import { User } from '../types';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(user);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
  };

  const achievements = [
    { title: 'Dean\'s List', description: 'Fall 2023 & Spring 2024', icon: Award },
    { title: 'Hackathon Winner', description: 'Stanford Hackathon 2024', icon: Award },
    { title: 'Research Assistant', description: 'AI Ethics Lab', icon: GraduationCap },
  ];

  const connections = [
    { name: 'Sarah Chen', role: 'Software Engineer @ Google', mutual: 5 },
    { name: 'Mike Johnson', role: 'Product Manager @ Meta', mutual: 12 },
    { name: 'Emily Davis', role: 'Data Scientist @ Netflix', mutual: 8 },
    { name: 'Alex Rodriguez', role: 'UX Designer @ Adobe', mutual: 3 },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Cover Photo & Profile */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-purple-400 via-emerald-400 to-orange-400 relative">
          <button className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-lg transition-all">
            <Camera className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {getInitials(profileData.name)}
              </div>
              <button className="absolute bottom-2 right-2 bg-white border-2 border-gray-200 p-2 rounded-full hover:bg-gray-50 transition-colors">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-purple-500 focus:outline-none"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                  )}
                  
                  <div className="flex items-center space-x-4 mt-2 text-gray-600">
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.major}
                          onChange={(e) => setProfileData({...profileData, major: e.target.value})}
                          className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-purple-500"
                        />
                      ) : (
                        <span>{profileData.major}</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {isEditing ? (
                        <select
                          value={profileData.year}
                          onChange={(e) => setProfileData({...profileData, year: e.target.value})}
                          className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-purple-500"
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="Graduate">Graduate</option>
                        </select>
                      ) : (
                        <span>{profileData.year}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-4 sm:mt-0">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-emerald-700 transition-all"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{profileData.college}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">About</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio || ''}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                placeholder="Tell us about yourself..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows={4}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {profileData.bio || 'No bio added yet.'}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
            <button className="text-purple-600 hover:text-purple-700">
              <Plus className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-purple-50 to-emerald-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Connections */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              <Users className="h-5 w-5 inline mr-2" />
              Connections ({connections.length})
            </h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {connections.slice(0, 4).map((connection, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials(connection.name)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{connection.name}</h4>
                    <p className="text-sm text-gray-600">{connection.role}</p>
                    <p className="text-xs text-purple-600">{connection.mutual} mutual connections</p>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  Message
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;