import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Messages from './Messages';
import Network from './Network';
import Internships from './Internships';
import Learning from './Learning';
import Notifications from './Notifications';
import News from './News';
import Profile from './Profile';
import Alumni from './Alumni';
import Webinars from './Webinars';
import Events from './Events';
import Projects from './Projects';
import PeerlyPro from './PeerlyPro';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        user={user}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPath={location.pathname}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <main className="flex-1 overflow-y-auto">
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
            <Route path="/alumni" element={<Alumni user={user} />} />
            <Route path="/webinars" element={<Webinars user={user} />} />
            <Route path="/events" element={<Events user={user} />} />
            <Route path="/projects" element={<Projects user={user} />} />
            <Route path="/pro" element={<PeerlyPro user={user} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;