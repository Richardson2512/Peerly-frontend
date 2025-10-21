import React, { useState } from 'react';
import { Search, Home, User, Bell, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchModal from './SearchModal';

interface HeaderProps {
  user: {
    name: string;
    avatar?: string;
    isPro: boolean;
  };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check if we're on the home page (feed page)
  const isHomePage = location.pathname === '/dashboard' || location.pathname === '/dashboard/feed';
  
  // Check if we're on forum page, peer page, or upgrade page
  const isForumPage = location.pathname.startsWith('/dashboard/forums');
  const isPeerPage = location.pathname === '/dashboard/peer';
  const isUpgradePage = location.pathname === '/pro';
  const shouldShowIcons = isForumPage || isPeerPage || isUpgradePage;
  

  const handleUpgradeToPro = () => {
    console.log('Upgrade to Pro clicked, navigating to /pro');
    navigate('/pro');
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsSearchOpen(true);
    }
  };

  const handlePeerlyClick = () => {
    navigate('/');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-2 relative">
        <div className="flex items-center justify-between">
          {/* Left side - Welcome message (only on home page) or placeholder */}
          <div className="flex items-center" style={{marginLeft: '350px'}}>
            {isHomePage ? (
              <h1 className="text-lg font-semibold text-gray-900">Welcome back, {user.name.split(' ')[0]}!</h1>
            ) : (
              <div className="text-lg font-semibold text-transparent">Welcome back, John!</div>
            )}
          </div>

          {/* Right side - User actions */}
          <div className="flex items-center space-x-4">
            {!user.isPro && (
              <button 
                onClick={handleUpgradeToPro}
                className="text-royal-blue hover:text-blue-800 font-semibold text-sm transition-all duration-200 flex items-center gap-2"
              >
                <span>⭐</span>
                Upgrade to Pro
              </button>
            )}
          </div>
        </div>

      {/* Peerly + Search + Navigation Icons aligned with peer content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-4" style={{transform: 'translate(-50%, -50%) translateX(-70px)'}}>
        <button 
          onClick={handlePeerlyClick}
          className="text-xl font-bold text-black hover:text-purple-600 transition-colors duration-200 cursor-pointer"
          style={{fontFamily: 'Anona'}}
        >
          Peerly
        </button>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search events, colleges, students, hackathons, companies, recruiters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={handleSearchClick}
            onKeyPress={handleSearchKeyPress}
            className="pl-7 pr-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent w-64 cursor-pointer"
          />
        </div>
        
        {/* Navigation Icons - Only visible on forum, peer, and upgrade pages */}
        {shouldShowIcons && (
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => navigate('/dashboard/feed')}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-all duration-200 group"
              title="Feed"
            >
              <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/dashboard/profile')}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-all duration-200 group"
              title="Profile"
            >
              <User className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/dashboard/notifications')}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-all duration-200 group"
              title="Notifications"
            >
              <Bell className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/dashboard/messages')}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-all duration-200 group"
              title="Messages"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </header>

    {/* Search Modal */}
    <SearchModal
      isOpen={isSearchOpen}
      onClose={() => setIsSearchOpen(false)}
      initialQuery={searchQuery}
    />
    </>
  );
};

export default Header;
