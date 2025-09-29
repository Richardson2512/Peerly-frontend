import React, { useState } from 'react';
import { Award, Calendar, Clock, Users, Play, Star, Filter, Search, Crown, Video, MapPin } from 'lucide-react';
import { User, Webinar } from '../types';
import { formatDistanceToNow, format } from 'date-fns';

interface WebinarsProps {
  user: User;
}

const Webinars: React.FC<WebinarsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'registered' | 'past'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [webinars, setWebinars] = useState<Webinar[]>([
    {
      id: '1',
      title: 'Getting Your First Tech Job: A Complete Guide',
      description: 'Learn from industry experts about the recruitment process, interview preparation, and how to stand out in competitive tech roles.',
      speaker: 'Sarah Johnson',
      speakerTitle: 'Senior Recruiter',
      speakerCompany: 'Google',
      date: new Date('2024-02-15T18:00:00'),
      duration: '90 minutes',
      maxAttendees: 100,
      currentAttendees: 67,
      isProOnly: false,
      meetingLink: 'https://meet.google.com/example',
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Building Scalable Web Applications with Modern Architecture',
      description: 'Deep dive into microservices, containerization, and cloud deployment strategies used by top tech companies.',
      speaker: 'Michael Chen',
      speakerTitle: 'Principal Engineer',
      speakerCompany: 'Amazon',
      date: new Date('2024-02-20T19:00:00'),
      duration: '120 minutes',
      maxAttendees: 50,
      currentAttendees: 42,
      isProOnly: true,
      meetingLink: 'https://meet.google.com/example2',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Data Science Career Path: From Beginner to Industry Expert',
      description: 'Comprehensive overview of data science roles, required skills, and career progression in the field.',
      speaker: 'Dr. Priya Sharma',
      speakerTitle: 'Data Science Director',
      speakerCompany: 'Microsoft',
      date: new Date('2024-02-25T17:00:00'),
      duration: '75 minutes',
      maxAttendees: 80,
      currentAttendees: 56,
      isProOnly: false,
      meetingLink: 'https://meet.google.com/example3',
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      title: 'AI/ML Product Development: Real-World Case Studies',
      description: 'Exclusive session covering AI product development, model deployment, and business impact measurement.',
      speaker: 'Alex Rodriguez',
      speakerTitle: 'AI Product Manager',
      speakerCompany: 'Netflix',
      date: new Date('2024-03-01T18:30:00'),
      duration: '100 minutes',
      maxAttendees: 30,
      currentAttendees: 28,
      isProOnly: true,
      meetingLink: 'https://meet.google.com/example4',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]);

  const [registeredWebinars, setRegisteredWebinars] = useState<string[]>(['1', '3']);
  const [pastWebinars, setPastWebinars] = useState<Webinar[]>([
    {
      id: '5',
      title: 'Resume Building Workshop: Stand Out in Tech Applications',
      description: 'Learn how to create compelling resumes that get noticed by recruiters and hiring managers.',
      speaker: 'Emily Davis',
      speakerTitle: 'Career Coach',
      speakerCompany: 'LinkedIn',
      date: new Date('2024-01-15T16:00:00'),
      duration: '60 minutes',
      maxAttendees: 120,
      currentAttendees: 98,
      isProOnly: false,
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]);

  const categories = ['all', 'Career Development', 'Technical Skills', 'AI/ML', 'Product Management', 'Interview Prep'];

  const handleRegister = (webinarId: string) => {
    const webinar = webinars.find(w => w.id === webinarId);
    if (!webinar) return;

    if (webinar.isProOnly && !user.isPro) {
      alert('This webinar is available for Pro users only. Upgrade to Peerly Pro to access premium webinars.');
      return;
    }

    if (webinar.currentAttendees >= webinar.maxAttendees) {
      alert('This webinar is full. Please try another one.');
      return;
    }

    setRegisteredWebinars([...registeredWebinars, webinarId]);
    setWebinars(webinars.map(w => 
      w.id === webinarId 
        ? { ...w, currentAttendees: w.currentAttendees + 1 }
        : w
    ));
  };

  const handleUnregister = (webinarId: string) => {
    setRegisteredWebinars(registeredWebinars.filter(id => id !== webinarId));
    setWebinars(webinars.map(w => 
      w.id === webinarId 
        ? { ...w, currentAttendees: w.currentAttendees - 1 }
        : w
    ));
  };

  const getUpcomingWebinars = () => {
    const now = new Date();
    return webinars.filter(w => w.date > now);
  };

  const getPastWebinars = () => {
    const now = new Date();
    return [...webinars.filter(w => w.date <= now), ...pastWebinars];
  };

  const getRegisteredWebinars = () => {
    const now = new Date();
    return webinars.filter(w => registeredWebinars.includes(w.id) && w.date > now);
  };

  const filteredWebinars = () => {
    let webinarList: Webinar[] = [];
    
    switch (activeTab) {
      case 'upcoming':
        webinarList = getUpcomingWebinars();
        break;
      case 'registered':
        webinarList = getRegisteredWebinars();
        break;
      case 'past':
        webinarList = getPastWebinars();
        break;
    }

    return webinarList.filter(webinar => {
      const matchesSearch = webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           webinar.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           webinar.speakerCompany.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
        webinar.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        webinar.description.toLowerCase().includes(selectedCategory.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });
  };

  const isWebinarFull = (webinar: Webinar) => {
    return webinar.currentAttendees >= webinar.maxAttendees;
  };

  const canRegister = (webinar: Webinar) => {
    return (!webinar.isProOnly || user.isPro) && !isWebinarFull(webinar) && !registeredWebinars.includes(webinar.id);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Exclusive Webinars & Workshops</h1>
        <p className="text-gray-600">Learn from industry experts and advance your career with premium educational sessions</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'upcoming', label: 'Upcoming', count: getUpcomingWebinars().length },
            { id: 'registered', label: 'My Registrations', count: getRegisteredWebinars().length },
            { id: 'past', label: 'Past Webinars', count: getPastWebinars().length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search webinars, speakers, companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Webinars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWebinars().map((webinar) => {
          const isRegistered = registeredWebinars.includes(webinar.id);
          const isPast = webinar.date <= new Date();
          
          return (
            <div key={webinar.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="relative">
                <img
                  src={webinar.thumbnail}
                  alt={webinar.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {webinar.isProOnly && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Crown className="h-3 w-3 mr-1" />
                      Pro
                    </span>
                  )}
                  {isRegistered && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Registered
                    </span>
                  )}
                  {isWebinarFull(webinar) && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      Full
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-600 font-medium">
                    {isPast ? 'Past Event' : formatDistanceToNow(webinar.date, { addSuffix: true })}
                  </span>
                  <span className="text-sm text-gray-500">
                    {webinar.currentAttendees}/{webinar.maxAttendees} registered
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{webinar.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{webinar.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{webinar.speaker} - {webinar.speakerTitle}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Building className="h-4 w-4 mr-2" />
                    <span>{webinar.speakerCompany}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{format(webinar.date, 'MMM dd, yyyy • h:mm a')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{webinar.duration}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {isPast ? (
                    <button
                      disabled
                      className="flex-1 bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
                    >
                      Event Ended
                    </button>
                  ) : isRegistered ? (
                    <>
                      <button
                        onClick={() => handleUnregister(webinar.id)}
                        className="flex-1 border border-red-600 text-red-600 hover:bg-red-50 py-2 px-4 rounded-lg transition-colors"
                      >
                        Unregister
                      </button>
                      <button
                        onClick={() => window.open(webinar.meetingLink, '_blank')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Join Now
                      </button>
                    </>
                  ) : canRegister(webinar) ? (
                    <button
                      onClick={() => handleRegister(webinar.id)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Register Now
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
                    >
                      {webinar.isProOnly ? 'Pro Only' : 'Registration Full'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredWebinars().length === 0 && (
        <div className="text-center py-12">
          <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No webinars found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or check back later for new sessions</p>
        </div>
      )}
    </div>
  );
};

export default Webinars;
