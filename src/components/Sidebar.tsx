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
  Crown
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
    { icon: Crown, label: 'Peerly Pro', path: '/dashboard/pro', proOnly: false },
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-purple-600 to-emerald-600">
            <GraduationCap className="h-8 w-8 text-white mr-2" />
            <span className="text-xl font-bold text-white">Peerly</span>
          </div>

          {/* User Info */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-emerald-50 border-b">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {user.name.charAt(0)}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  {user.isPro && (
                    <Crown className="h-4 w-4 text-yellow-500" title="Peerly Pro" />
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
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || 
                (currentPath === '/dashboard' && item.path === '/dashboard/feed');
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-purple-600' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
            
            {/* Pro Features Separator */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
                Pro Features
              </p>
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
                      w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700 shadow-sm' 
                        : isProOnly
                        ? 'text-gray-400 cursor-not-allowed opacity-60'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-purple-600' : isProOnly ? 'text-gray-400' : ''}`} />
                    <span className="font-medium">{item.label}</span>
                    {isProOnly && <Crown className="h-4 w-4 ml-auto text-yellow-500" />}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={onLogout}
              className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;