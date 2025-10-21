import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Bell, 
  Newspaper, 
  User, 
  LogOut, 
  Menu,
  X,
  BookOpen,
  MessageCircle,
  Users,
  Star,
  Award,
  Calendar,
  FolderOpen,
  Crown,
  Settings,
  Info,
  MessageSquare
} from 'lucide-react';
import { User as UserType } from '../types';

interface SidebarProps {
  user: UserType;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
  currentPath: string;
  onPeerViewChange?: (view: 'main' | 'peers' | 'followers' | 'following' | 'groups' | 'events') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  user, 
  onLogout, 
  isOpen, 
  onToggle, 
  currentPath,
  onPeerViewChange 
}) => {
  const navigate = useNavigate();
  
  // Check if we're on the Peer page
  const isOnPeerPage = currentPath === '/dashboard/peer';

  // Mock data for peer counts
  const peerCounts = {
    peers: 24,
    followers: 156,
    following: 89,
    groups: 8,
    events: 12
  };

  const menuItems = [
    { icon: Home, label: 'Feed', path: '/dashboard/feed' },
    { icon: MessageCircle, label: 'Messages', path: '/dashboard/messages' },
    { icon: MessageSquare, label: 'Forums', path: '/dashboard/forums' },
    { icon: Users, label: 'Peer', path: '/dashboard/peer' },
    { icon: Briefcase, label: 'Internships', path: '/dashboard/internships' },
    { icon: BookOpen, label: 'Peerly Learning', path: '/dashboard/learning' },
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
    { icon: Newspaper, label: 'News', path: '/dashboard/news' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ];

  const proMenuItems = [
    { icon: Star, label: 'Alumni Connect', path: '/dashboard/alumni', proOnly: true },
    { icon: Award, label: 'Webinars', path: '/dashboard/webinars', proOnly: true },
    { icon: Calendar, label: 'Events', path: '/dashboard/events', proOnly: true },
    { icon: FolderOpen, label: 'Projects', path: '/dashboard/projects', proOnly: true },
    { icon: Crown, label: 'Peerly Pro', path: '/pro', proOnly: false },
  ];

  const utilityMenuItems = [
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    { icon: Info, label: 'About Us', path: '/dashboard/about' },
    { icon: Info, label: 'Privacy Policy', path: '/dashboard/privacy' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="lg:hidden absolute top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div className={`
        w-64 h-full
        ${isOpen ? 'block' : 'hidden'}
        lg:block
      `}>
        <div className="h-full flex flex-col space-y-4">
          {/* User Info + Regular Features Box */}
          <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
            {/* User Info */}
            <div className="flex items-center mb-3 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                {user.name.charAt(0)}
              </div>
              <div className="ml-2 flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  {user.isPro && (
                    <Crown className="h-3 w-3 text-yellow-500" />
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {user.course} • {user.year}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user.college}
                </p>
              </div>
            </div>

            {/* Conditional Content Based on Page */}
            {isOnPeerPage ? (
              /* Peer Management Content */
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Manage my Peers</h3>
                <nav className="space-y-1">
                  <button 
                    onClick={() => onPeerViewChange?.('peers')}
                    className="w-full flex items-center justify-between px-2 py-2 text-left rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Peers</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {peerCounts.peers}
                    </span>
                  </button>
                  <button 
                    onClick={() => onPeerViewChange?.('followers')}
                    className="w-full flex items-center justify-between px-2 py-2 text-left rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Followers</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {peerCounts.followers}
                    </span>
                  </button>
                  <button 
                    onClick={() => onPeerViewChange?.('following')}
                    className="w-full flex items-center justify-between px-2 py-2 text-left rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Following</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {peerCounts.following}
                    </span>
                  </button>
                  <button 
                    onClick={() => onPeerViewChange?.('groups')}
                    className="w-full flex items-center justify-between px-2 py-2 text-left rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Groups</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {peerCounts.groups}
                    </span>
                  </button>
                  <button 
                    onClick={() => onPeerViewChange?.('events')}
                    className="w-full flex items-center justify-between px-2 py-2 text-left rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Events</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {peerCounts.events}
                    </span>
                  </button>
                </nav>
              </div>
            ) : (
              /* Regular Features Navigation */
              <nav className="space-y-0">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path || 
                    (currentPath === '/dashboard' && item.path === '/dashboard/feed');
                  
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        w-full flex items-center px-2 py-1.5 text-left rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 shadow-sm' 
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <Icon className={`h-3.5 w-3.5 mr-2 ${isActive ? 'text-purple-600' : ''}`} />
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Pro Features Box */}
          <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
              Pro Features
            </p>
            <nav className="space-y-0">
              {proMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                const isProOnly = item.proOnly && !user.isPro;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    disabled={isProOnly}
                    className={`
                      w-full flex items-center px-2 py-1.5 text-left rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 shadow-sm' 
                        : isProOnly
                        ? 'text-gray-400 cursor-not-allowed opacity-60'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`h-3.5 w-3.5 mr-2 ${isActive ? 'text-purple-600' : isProOnly ? 'text-gray-400' : ''}`} />
                    <span className="text-xs font-medium">{item.label}</span>
                    {isProOnly && <Crown className="h-3 w-3 ml-auto text-yellow-500" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Utility Box */}
          <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
            <nav className="space-y-0">
              {utilityMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center px-2 py-1.5 text-left rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`h-3.5 w-3.5 mr-2 ${isActive ? 'text-purple-600' : ''}`} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
              
              {/* Sign Out Button */}
              <button
                onClick={onLogout}
                className="w-full flex items-center px-2 py-1.5 text-left rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700 mt-1"
              >
                <LogOut className="h-3.5 w-3.5 mr-2" />
                <span className="text-xs font-medium">Sign Out</span>
              </button>
            </nav>
          </div>

        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden absolute inset-0 z-30 bg-black bg-opacity-50"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;
