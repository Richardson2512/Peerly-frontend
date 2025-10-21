import React from 'react';
import { 
  Users, 
  Calendar, 
  Building, 
  Star, 
  MapPin, 
  Clock,
  TrendingUp,
  Award,
  ExternalLink
} from 'lucide-react';

interface RecommendationsProps {
  user: {
    name: string;
    isPro: boolean;
  };
}

const Recommendations: React.FC<RecommendationsProps> = ({ user }) => {
  const profileRecommendations = [
    {
      id: 1,
      name: 'Priya Sharma',
      title: 'Computer Science Student',
      college: 'IIT Delhi',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      mutualConnections: 12,
      skills: ['AI/ML', 'Python', 'React'],
      verified: true
    },
    {
      id: 2,
      name: 'Arjun Patel',
      title: 'MBA Student',
      college: 'IIM Bangalore',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      mutualConnections: 8,
      skills: ['Finance', 'Strategy', 'Leadership'],
      verified: true
    },
    {
      id: 3,
      name: 'Sneha Reddy',
      title: 'Mechanical Engineering',
      college: 'NIT Trichy',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      mutualConnections: 15,
      skills: ['Robotics', 'CAD', 'Innovation'],
      verified: true
    },
    {
      id: 4,
      name: 'Rahul Kumar',
      title: 'Data Science Student',
      college: 'Delhi University',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      mutualConnections: 20,
      skills: ['Data Science', 'Python', 'SQL'],
      verified: true
    },
    {
      id: 5,
      name: 'Ananya Singh',
      title: 'Design Student',
      college: 'NID Ahmedabad',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      mutualConnections: 18,
      skills: ['UX/UI', 'Figma', 'Design'],
      verified: true
    }
  ];

  const eventRecommendations = [
    {
      id: 1,
      title: 'Tech Career Fair 2024',
      date: 'March 15, 2024',
      location: 'IIT Delhi',
      attendees: 500,
      category: 'Career',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100',
      verified: true
    },
    {
      id: 2,
      title: 'AI Workshop Series',
      date: 'March 22, 2024',
      location: 'Online',
      attendees: 200,
      category: 'Learning',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100',
      verified: true
    },
    {
      id: 3,
      title: 'Startup Pitch Competition',
      date: 'March 28, 2024',
      location: 'IIM Bangalore',
      attendees: 150,
      category: 'Entrepreneurship',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100',
      verified: true
    },
    {
      id: 4,
      title: 'Blockchain Development Bootcamp',
      date: 'April 5, 2024',
      location: 'NIT Warangal',
      attendees: 120,
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100',
      verified: true
    },
    {
      id: 5,
      title: 'Finance & Investment Summit',
      date: 'April 12, 2024',
      location: 'IIM Ahmedabad',
      attendees: 300,
      category: 'Finance',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100',
      verified: true
    }
  ];

  const companyRecommendations = [
    {
      id: 1,
      name: 'Google India',
      industry: 'Technology',
      location: 'Bangalore',
      openings: 25,
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100',
      rating: 4.9,
      verified: true
    },
    {
      id: 2,
      name: 'Microsoft India',
      industry: 'Technology',
      location: 'Hyderabad',
      openings: 18,
      image: 'https://images.unsplash.com/photo-1633417533259-7b0b0b0b0b0b?w=100',
      rating: 4.8,
      verified: true
    },
    {
      id: 3,
      name: 'TCS',
      industry: 'IT Services',
      location: 'Mumbai',
      openings: 45,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100',
      rating: 4.6,
      verified: true
    }
  ];

  return (
    <div className="w-80 flex flex-col space-y-4">
      {/* People You May Know Box */}
      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Users className="h-4 w-4 mr-2 text-blue-600" />
          People You May Know
        </h3>
        <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
          {profileRecommendations.map((person) => (
            <div key={person.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="relative">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {person.verified && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Award className="h-2.5 w-2.5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">{person.name}</h4>
                <p className="text-xs text-gray-600 truncate">{person.title}</p>
                <p className="text-xs text-gray-500 truncate">{person.college}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500">{person.mutualConnections} mutual connections</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {person.skills.slice(0, 2).map((skill, index) => (
                    <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Events Box */}
      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-green-600" />
          Recommended Events
        </h3>
        <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
          {eventRecommendations.map((event) => (
            <div key={event.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-start space-x-3">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 mb-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{event.title}</h4>
                    {event.verified && (
                      <Award className="h-3 w-3 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {event.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                      {event.category}
                    </span>
                    <span className="text-xs text-gray-500">{event.attendees} attending</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
