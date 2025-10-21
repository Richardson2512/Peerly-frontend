import React, { useState } from 'react';
import { User, NotificationSettings, PrivacySettings } from '../types';
import { 
  Settings as SettingsIcon,
  User as UserIcon,
  Bell,
  Shield,
  Lock,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'account' | 'privacy' | 'notifications'>('account');
  const [accountData, setAccountData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    location: user.location || '',
    bio: user.bio || '',
    linkedinUrl: user.linkedinUrl || '',
    githubUrl: user.githubUrl || '',
    portfolioUrl: user.portfolioUrl || ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    connectionRequests: true,
    newFollowers: true,
    postLikes: true,
    comments: true,
    messages: true,
    eventInvites: true,
    jobRecommendations: true,
    learningUpdates: true
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    showConnections: true,
    showFollowers: true,
    allowMessagesFrom: 'connections',
    showOnlineStatus: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const renderSaveButton = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <button disabled className="bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Saving...
          </button>
        );
      case 'saved':
        return (
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Saved
          </button>
        );
      case 'error':
        return (
          <button onClick={handleSave} className="bg-red-600 text-white px-6 py-2 rounded-lg flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Retry
          </button>
        );
      default:
        return (
          <button onClick={handleSave} className="bg-purple-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-purple-700 transition-colors">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <SettingsIcon className="h-8 w-8 mr-3 text-purple-600" />
          Settings
        </h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-md shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'account', label: 'Account', icon: UserIcon },
              { id: 'privacy', label: 'Privacy', icon: Shield },
              { id: 'notifications', label: 'Notifications', icon: Bell }
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
          {activeTab === 'account' && (
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-purple-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={accountData.name}
                      onChange={(e) => setAccountData({...accountData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={accountData.email}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={accountData.phone}
                      onChange={(e) => setAccountData({...accountData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={accountData.location}
                      onChange={(e) => setAccountData({...accountData, location: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Bio</h3>
                <textarea
                  value={accountData.bio}
                  onChange={(e) => setAccountData({...accountData, bio: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  rows={4}
                  placeholder="Tell others about yourself..."
                />
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Links</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={accountData.linkedinUrl}
                      onChange={(e) => setAccountData({...accountData, linkedinUrl: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={accountData.githubUrl}
                      onChange={(e) => setAccountData({...accountData, githubUrl: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio URL
                    </label>
                    <input
                      type="url"
                      value={accountData.portfolioUrl}
                      onChange={(e) => setAccountData({...accountData, portfolioUrl: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </div>

              {/* Password Change */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-purple-600" />
                  Change Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-8">
              {/* Profile Visibility */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-600" />
                  Profile Visibility
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Who can see your profile?
                    </label>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value as any})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="public">Everyone</option>
                      <option value="connections">Connections only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Information Visibility */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Information Visibility</h3>
                <div className="space-y-4">
                  {[
                    { key: 'showEmail', label: 'Show email address', icon: Mail },
                    { key: 'showPhone', label: 'Show phone number', icon: Phone },
                    { key: 'showLocation', label: 'Show location', icon: MapPin },
                    { key: 'showConnections', label: 'Show connections', icon: UserIcon },
                    { key: 'showFollowers', label: 'Show followers count', icon: UserIcon },
                    { key: 'showOnlineStatus', label: 'Show online status', icon: Eye }
                  ].map((setting) => {
                    const Icon = setting.icon;
                    return (
                      <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Icon className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-900">{setting.label}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacySettings[setting.key as keyof PrivacySettings] as boolean}
                            onChange={(e) => setPrivacySettings({...privacySettings, [setting.key]: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Messages */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Messages</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Who can send you messages?
                  </label>
                  <select
                    value={privacySettings.allowMessagesFrom}
                    onChange={(e) => setPrivacySettings({...privacySettings, allowMessagesFrom: e.target.value as any})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="everyone">Everyone</option>
                    <option value="connections">Connections only</option>
                    <option value="none">No one</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8">
              {/* Notification Preferences */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-purple-600" />
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email notifications', description: 'Receive notifications via email' },
                    { key: 'pushNotifications', label: 'Push notifications', description: 'Receive push notifications in browser' },
                    { key: 'connectionRequests', label: 'Connection requests', description: 'When someone sends you a connection request' },
                    { key: 'newFollowers', label: 'New followers', description: 'When someone starts following you' },
                    { key: 'postLikes', label: 'Post likes', description: 'When someone likes your posts' },
                    { key: 'comments', label: 'Comments', description: 'When someone comments on your posts' },
                    { key: 'messages', label: 'Messages', description: 'When you receive new messages' },
                    { key: 'eventInvites', label: 'Event invites', description: 'When you\'re invited to events' },
                    { key: 'jobRecommendations', label: 'Job recommendations', description: 'New job and internship recommendations' },
                    { key: 'learningUpdates', label: 'Learning updates', description: 'Updates about courses and certifications' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{setting.label}</div>
                        <div className="text-sm text-gray-500">{setting.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[setting.key as keyof NotificationSettings] as boolean}
                          onChange={(e) => setNotificationSettings({...notificationSettings, [setting.key]: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
            {renderSaveButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
