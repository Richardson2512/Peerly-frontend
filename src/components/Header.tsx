import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  

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

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-2 relative">
        <div className="flex items-center justify-between">
          {/* Left side - Welcome message */}
          <div className="flex items-center" style={{marginLeft: '350px'}}>
            <h1 className="text-lg font-semibold text-gray-900">Welcome back, {user.name.split(' ')[0]}!</h1>
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

      {/* Centered Peerly + Search aligned with feed column */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-4" style={{transform: 'translate(-50%, -50%) translateX(-150px)'}}>
        <span className="text-xl font-bold text-black" style={{fontFamily: 'Anona'}}>Peerly</span>
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
