import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, Crown, Trophy, Code, Briefcase, Award } from 'lucide-react';
import { User, Event } from '../types';
import { formatDistanceToNow, format } from 'date-fns';

interface EventsProps {
  user: User;
}

const Events: React.FC<EventsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'registered' | 'hackathons' | 'workshops'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'TechCrunch Hackathon 2024',
      description: 'Build innovative solutions using AI/ML technologies. 48-hour coding marathon with prizes worth ₹5 Lakhs.',
      category: 'hackathon',
      date: new Date('2024-03-15T09:00:00'),
      location: 'IIT Bombay Campus',
      isVirtual: false,
      maxParticipants: 500,
      currentParticipants: 342,
      isProOnly: false,
      isProPriority: true,
      registrationDeadline: new Date('2024-03-10T23:59:59'),
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'AWS Cloud Architecture Workshop',
      description: 'Learn to design and deploy scalable cloud solutions using AWS services. Hands-on workshop with real-world projects.',
      category: 'workshop',
      date: new Date('2024-02-28T14:00:00'),
      location: 'Virtual Event',
      isVirtual: true,
      maxParticipants: 100,
      currentParticipants: 78,
      isProOnly: true,
      isProPriority: false,
      registrationDeadline: new Date('2024-02-25T23:59:59'),
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Data Science Competition 2024',
      description: 'Compete in solving real-world data science problems. Use machine learning to predict customer behavior.',
      category: 'competition',
      date: new Date('2024-04-01T10:00:00'),
      location: 'Online Platform',
      isVirtual: true,
      maxParticipants: 200,
      currentParticipants: 156,
      isProOnly: false,
      isProPriority: true,
      registrationDeadline: new Date('2024-03-25T23:59:59'),
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      title: 'Product Management Conference',
      description: 'Learn from industry leaders about product strategy, user research, and agile development methodologies.',
      category: 'conference',
      date: new Date('2024-03-20T09:30:00'),
      location: 'Taj Palace, Mumbai',
      isVirtual: false,
      maxParticipants: 150,
      currentParticipants: 89,
      isProOnly: true,
      isProPriority: false,
      registrationDeadline: new Date('2024-03-15T23:59:59'),
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '5',
      title: 'React Native Mobile Development Bootcamp',
      description: 'Build cross-platform mobile applications using React Native. From basics to advanced concepts.',
      category: 'workshop',
      date: new Date('2024-03-05T16:00:00'),
      location: 'Virtual Event',
      isVirtual: true,
      maxParticipants: 80,
      currentParticipants: 45,
      isProOnly: false,
      isProPriority: false,
      registrationDeadline: new Date('2024-03-01T23:59:59'),
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]);

  const [registeredEvents, setRegisteredEvents] = useState<string[]>(['1', '3']);

  const categories = ['all', 'hackathon', 'workshop', 'conference', 'competition'];
  const locations = ['all', 'Virtual Event', 'Online Platform', 'IIT Bombay Campus', 'Taj Palace, Mumbai'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hackathon':
        return Code;
      case 'workshop':
        return Briefcase;
      case 'conference':
        return Users;
      case 'competition':
        return Trophy;
      default:
        return Calendar;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hackathon':
        return 'bg-blue-100 text-blue-800';
      case 'workshop':
        return 'bg-green-100 text-green-800';
      case 'conference':
        return 'bg-purple-100 text-purple-800';
      case 'competition':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRegister = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    if (event.isProOnly && !user.isPro) {
      alert('This event is available for Pro users only. Upgrade to Peerly Pro to access premium events.');
      return;
    }

    if (event.currentParticipants >= event.maxParticipants) {
      alert('This event is full. Please try another one.');
      return;
    }

    if (new Date() > event.registrationDeadline) {
      alert('Registration deadline has passed for this event.');
      return;
    }

    setRegisteredEvents([...registeredEvents, eventId]);
    setEvents(events.map(e => 
      e.id === eventId 
        ? { ...e, currentParticipants: e.currentParticipants + 1 }
        : e
    ));
  };

  const handleUnregister = (eventId: string) => {
    setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
    setEvents(events.map(e => 
      e.id === eventId 
        ? { ...e, currentParticipants: e.currentParticipants - 1 }
        : e
    ));
  };

  const filteredEvents = () => {
    let eventList = events;

    switch (activeTab) {
      case 'registered':
        eventList = events.filter(e => registeredEvents.includes(e.id));
        break;
      case 'hackathons':
        eventList = events.filter(e => e.category === 'hackathon');
        break;
      case 'workshops':
        eventList = events.filter(e => e.category === 'workshop');
        break;
    }

    return eventList.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation;
      
      return matchesSearch && matchesCategory && matchesLocation;
    });
  };

  const isEventFull = (event: Event) => {
    return event.currentParticipants >= event.maxParticipants;
  };

  const isRegistrationClosed = (event: Event) => {
    return new Date() > event.registrationDeadline;
  };

  const canRegister = (event: Event) => {
    return (!event.isProOnly || user.isPro) && 
           !isEventFull(event) && 
           !isRegistrationClosed(event) && 
           !registeredEvents.includes(event.id);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Events & Hackathons</h1>
        <p className="text-gray-600">Participate in exciting events, hackathons, and workshops to enhance your skills</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'all', label: 'All Events', count: events.length },
            { id: 'registered', label: 'My Events', count: registeredEvents.length },
            { id: 'hackathons', label: 'Hackathons', count: events.filter(e => e.category === 'hackathon').length },
            { id: 'workshops', label: 'Workshops', count: events.filter(e => e.category === 'workshop').length }
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
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search events, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {locations.map(location => (
              <option key={location} value={location}>
                {location === 'all' ? 'All Locations' : location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents().map((event) => {
          const CategoryIcon = getCategoryIcon(event.category);
          const isRegistered = registeredEvents.includes(event.id);
          
          return (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  {event.isProOnly && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Crown className="h-3 w-3 mr-1" />
                      Pro
                    </span>
                  )}
                  {event.isProPriority && user.isPro && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                      Priority
                    </span>
                  )}
                  {isRegistered && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Registered
                    </span>
                  )}
                  {isEventFull(event) && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      Full
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-600 font-medium">
                    {formatDistanceToNow(event.date, { addSuffix: true })}
                  </span>
                  <span className="text-sm text-gray-500">
                    {event.currentParticipants}/{event.maxParticipants} participants
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{format(event.date, 'MMM dd, yyyy • h:mm a')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Max {event.maxParticipants} participants</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Registration until {format(event.registrationDeadline, 'MMM dd, yyyy')}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {isRegistrationClosed(event) ? (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
                    >
                      Registration Closed
                    </button>
                  ) : isRegistered ? (
                    <button
                      onClick={() => handleUnregister(event.id)}
                      className="w-full border border-red-600 text-red-600 hover:bg-red-50 py-2 px-4 rounded-lg transition-colors"
                    >
                      Unregister
                    </button>
                  ) : canRegister(event) ? (
                    <button
                      onClick={() => handleRegister(event.id)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Register Now
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed"
                    >
                      {event.isProOnly ? 'Pro Only' : 'Registration Full'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents().length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or check back later for new events</p>
        </div>
      )}
    </div>
  );
};

export default Events;
