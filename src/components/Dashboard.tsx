import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Feed from './Feed';
import FlyerAds from './FlyerAds';
import VideoAds from './VideoAds';
import Recommendations from './Recommendations';
import Messages from './Messages';
import Network from './Network';
import Internships from './Internships';
import Learning from './Learning';
import Notifications from './Notifications';
import News from './News';
import Profile from './Profile';
import Settings from './Settings';
import About from './About';
import Alumni from './Alumni';
import Webinars from './Webinars';
import Events from './Events';
import Projects from './Projects';
import { User, UserAdInteraction } from '../types';
import { recommendationService } from '../services/recommendationService';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const handleAdInteraction = (interaction: UserAdInteraction) => {
    // Track the interaction for recommendation purposes
    recommendationService.trackInteraction(interaction);
    
    // Log user analytics (for demo purposes)
    const analytics = recommendationService.getUserAnalytics(user.id);
    console.log('User Analytics:', analytics);
  };

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Header spans full width */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header user={user} />
      </div>
      
      {/* Content area with padding for header */}
        <div className="flex w-full pt-11 p-2 gap-1">
        <div className="mt-4" style={{marginLeft: '350px'}}>
          <Sidebar
            user={user}
            onLogout={onLogout}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            currentPath={location.pathname}
          />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden" style={{marginLeft: '10px'}}>
          <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <Routes>
              <Route path="/" element={<Feed user={user} />} />
              <Route path="/feed" element={<Feed user={user} />} />
              <Route path="/messages" element={<Messages user={user} />} />
              <Route path="/network" element={<Network user={user} />} />
              <Route path="/internships" element={<Internships user={user} />} />
              <Route path="/learning" element={<Learning user={user} />} />
              <Route path="/notifications" element={<Notifications user={user} />} />
              <Route path="/news" element={<News user={user} />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/settings" element={<Settings user={user} />} />
              <Route path="/about" element={<About />} />
              <Route path="/alumni" element={<Alumni user={user} />} />
              <Route path="/webinars" element={<Webinars user={user} />} />
              <Route path="/events" element={<Events user={user} />} />
              <Route path="/projects" element={<Projects user={user} />} />
            </Routes>
          </div>

          {/* Recommendations Box */}
          <div className="hidden xl:block w-80 mt-4 ml-2">
            <Recommendations user={user} />
          </div>

          {/* Advertisement Sidebar */}
          <div className="hidden xl:block w-80 mt-4 ml-2">
            <div className="h-full flex flex-col space-y-4">
              {/* Flyer Ads Box */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <FlyerAds 
                  user={user} 
                  onInteraction={handleAdInteraction}
                />
              </div>
              
              {/* Video Ads Box */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <VideoAds 
                  user={user} 
                  onInteraction={handleAdInteraction}
                />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;