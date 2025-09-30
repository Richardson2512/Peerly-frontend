import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Bell, 
  Newspaper, 
  User, 
  LogOut, 
  GraduationCap,
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
  Info
} from 'lucide-react';
import { User as UserType } from '../types';

interface SidebarProps {
  user: UserType;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  user, 
  onLogout, 
  isOpen, 
  onToggle, 
  currentPath 
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Feed', path: '/dashboard/feed' },
    { icon: MessageCircle, label: 'Messages', path: '/dashboard/messages' },
    { icon: Users, label: 'Network', path: '/dashboard/network' },
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
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
                    <Crown className="h-3 w-3 text-yellow-500" title="Peerly Pro" />
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

            {/* Regular Features Navigation */}
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
          </div>

          {/* Pro Features Box */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
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