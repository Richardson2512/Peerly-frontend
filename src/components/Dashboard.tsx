import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Feed from './Feed';
import FlyerAds from './FlyerAds';
import VideoAds from './VideoAds';
import Recommendations from './Recommendations';
import Messages from './Messages';
import Peer from './Peer';
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
import Forums from './Forums';
import ForumDiscussion from './ForumDiscussion';
import { User, UserAdInteraction } from '../types';
import { recommendationService } from '../services/recommendationService';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentForumDiscussion, setCurrentForumDiscussion] = useState<string | null>(null);
  const [peerView, setPeerView] = useState<'main' | 'peers' | 'followers' | 'following' | 'groups' | 'events'>('main');
  const location = useLocation();

  // Check if we're in forums section
  const isInForums = location.pathname.startsWith('/dashboard/forums');
  
  // Check if we're on the Peer page
  const isOnPeerPage = location.pathname === '/dashboard/peer';
  
  // Check if we're on the Pro page (ProPage is outside Dashboard, so this will always be false in Dashboard)
  const isOnProPage = location.pathname === '/pro';
  
  // Check if we're on the Messages page
  const isOnMessagesPage = location.pathname === '/dashboard/messages';
  
  // Check if we're on pages that should not show recommendations
  const isOnProfilePage = location.pathname === '/dashboard/profile';
  const isOnNewsPage = location.pathname === '/dashboard/news';
  const isOnInternshipsPage = location.pathname === '/dashboard/internships';
  const isOnLearningPage = location.pathname === '/dashboard/learning';
  const shouldHideRecommendations = isOnMessagesPage || isOnPeerPage || isOnProfilePage || isOnNewsPage || isOnInternshipsPage || isOnLearningPage;

  const handleAdInteraction = (interaction: UserAdInteraction) => {
    // Track the interaction for recommendation purposes
    recommendationService.trackInteraction(interaction);
    
    // Log user analytics (for demo purposes)
    const analytics = recommendationService.getUserAnalytics(user.id);
    console.log('User Analytics:', analytics);
  };

  const handleNavigateToDiscussion = (discussionId: string) => {
    setCurrentForumDiscussion(discussionId);
  };

  const handleBackToForums = () => {
    setCurrentForumDiscussion(null);
  };

  const handlePeerViewChange = (view: 'main' | 'peers' | 'followers' | 'following' | 'groups' | 'events') => {
    setPeerView(view);
  };

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Header spans full width */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header user={user} />
      </div>
      
      {/* Content area with padding for header */}
      <div className="flex w-full pt-11 p-2 gap-1">
        {/* Sidebar - hidden when in forums */}
        {!isInForums && (
          <div className="mt-4" style={{marginLeft: '350px'}}>
            <Sidebar
              user={user}
              onLogout={onLogout}
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              currentPath={location.pathname}
              onPeerViewChange={handlePeerViewChange}
            />
          </div>
        )}
        
        <div className={`flex-1 flex flex-col overflow-hidden ${isInForums ? 'ml-0' : 'ml-2'}`}>
          <div className="flex-1 flex overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <Routes>
                <Route path="/" element={<Feed user={user} />} />
                <Route path="/feed" element={<Feed user={user} />} />
                <Route path="/messages" element={<Messages user={user} />} />
                <Route path="/forums" element={
                  currentForumDiscussion ? (
                    <ForumDiscussion 
                      user={user} 
                      discussionId={currentForumDiscussion} 
                      onBack={handleBackToForums} 
                    />
                  ) : (
                    <Forums 
                      user={user} 
                      onNavigateToDiscussion={handleNavigateToDiscussion} 
                    />
                  )
                } />
                <Route path="/forums/:discussionId" element={
                  <ForumDiscussion 
                    user={user} 
                    discussionId={currentForumDiscussion || ''} 
                    onBack={handleBackToForums} 
                  />
                } />
                <Route path="/peer" element={<Peer user={user} activeView={peerView} onViewChange={setPeerView} />} />
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

            {/* Sidebar content - hidden when in forums */}
            {!isInForums && (
              <>
                {/* Recommendations Box - hidden on specific pages */}
                {!shouldHideRecommendations && (
                  <div className="hidden xl:block w-80 mt-4 ml-2">
                    <Recommendations user={user} />
                  </div>
                )}

                {/* Advertisement Sidebar - shown on all pages except Pro page and Peer page */}
                {!isOnProPage && !isOnPeerPage && (
                  <div className="hidden xl:block w-80 mt-4 ml-2">
                    <div className="h-full flex flex-col space-y-4">
                      {/* Flyer Ads Box */}
                      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
                        <FlyerAds 
                          user={user} 
                          onInteraction={handleAdInteraction}
                        />
                      </div>
                      
                      {/* Video Ads Box */}
                      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
                        <VideoAds 
                          user={user} 
                          onInteraction={handleAdInteraction}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Ad Box for Peer page - only bottom ad */}
                {isOnPeerPage && (
                  <div className="hidden xl:block w-80 mt-4 ml-2">
                    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
                      <VideoAds 
                        user={user} 
                        onInteraction={handleAdInteraction}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Advertisement Sidebar for Forums - shown on forums page but not Pro page */}
            {isInForums && !isOnProPage && (
              <div className="hidden xl:block w-80 mt-4 ml-2">
                <div className="h-full flex flex-col space-y-4">
                  {/* Flyer Ads Box */}
                  <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
                    <FlyerAds 
                      user={user} 
                      onInteraction={handleAdInteraction}
                    />
                  </div>
                  
                  {/* Video Ads Box */}
                  <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
                    <VideoAds 
                      user={user} 
                      onInteraction={handleAdInteraction}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
