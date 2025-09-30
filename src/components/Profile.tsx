import React, { useState } from 'react';
import { User, Post, Event, Language, Award, Achievement, UserInternship, CompanyRecommendation } from '../types';
import { 
  User as UserIcon, 
  MapPin, 
  Calendar, 
  Award as AwardIcon, 
  GraduationCap, 
  Briefcase, 
  Star, 
  Eye, 
  Users, 
  MessageCircle,
  Plus,
  Edit,
  ExternalLink,
  Globe,
  Github,
  Linkedin,
  Trophy,
  BookOpen,
  Code,
  Heart,
  Share,
  MoreHorizontal,
  Camera,
  UserPlus,
  CheckCircle
} from 'lucide-react';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'activity' | 'events'>('about');
  const [isFollowing, setIsFollowing] = useState(false);

  // Sample data for demonstration
  const userPosts: Post[] = [
    {
      id: '1',
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: 'Excited to announce that I\'ll be interning at Google this summer! 🎉 Looking forward to working on amazing projects and learning from the best.',
      timestamp: new Date('2024-01-15T10:00:00'),
      likes: 45,
      comments: []
    },
    {
      id: '2',
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: 'Just completed my machine learning certification from Peerly Learning. The course was fantastic and really helped me understand the fundamentals! 📚',
      timestamp: new Date('2024-01-12T14:30:00'),
      likes: 32,
      comments: []
    }
  ];

  const recommendedEvents: Event[] = [
    {
      id: '1',
      title: 'Tech Career Fair 2024',
      description: 'Connect with top tech companies and explore internship opportunities',
      date: new Date('2024-02-15'),
      location: 'Campus Center',
      type: 'career_fair',
      isExclusive: false,
      maxAttendees: 500,
      currentAttendees: 234
    },
    {
      id: '2',
      title: 'AI/ML Workshop with Industry Experts',
      description: 'Hands-on workshop on machine learning applications',
      date: new Date('2024-02-20'),
      location: 'Computer Science Building',
      type: 'workshop',
      isExclusive: user.isPro,
      maxAttendees: 50,
      currentAttendees: 32
    }
  ];

  const renderProficiencyBadge = (proficiency: string) => {
    const colors = {
      native: 'bg-green-100 text-green-800',
      advanced: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      beginner: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[proficiency as keyof typeof colors]}`}>
        {proficiency}
      </span>
    );
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-purple-600 to-emerald-600 relative">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <button className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all">
            <Edit className="h-4 w-4 mr-2 inline" />
            Edit Cover
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex items-end -mt-16 mb-4">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-white text-3xl font-bold">{getInitials(user.name)}</span>
                )}
              </div>
              <button className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="ml-6 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                {user.isPro && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Pro
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-lg">{user.course} Student at {user.college}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                {user.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {user.location}
                  </div>
                )}
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {user.profileViews.toLocaleString()} profile views
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {user.followers.length} followers
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </button>
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center ${
                  isFollowing 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isFollowing ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </>
                )}
              </button>
              <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{user.bio}</p>
            </div>
          )}

          {/* Social Links */}
          <div className="flex gap-4 mb-6">
            {user.linkedinUrl && (
              <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-700">
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </a>
            )}
            {user.githubUrl && (
              <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-gray-800">
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
            )}
            {user.portfolioUrl && (
              <a href={user.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-purple-600 hover:text-purple-700">
                <Globe className="h-5 w-5 mr-2" />
                Portfolio
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'about', label: 'About', icon: UserIcon },
              { id: 'activity', label: 'Activity', icon: BookOpen },
              { id: 'events', label: 'Events', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* Education */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-purple-600" />
                  Education
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">{user.college}</h4>
                  <p className="text-gray-600">{user.course} • {user.courseLevel}</p>
                  <p className="text-gray-500 text-sm">{user.year} • Expected Graduation: {user.graduationDate.toLocaleDateString()}</p>
                </div>
              </div>

              {/* Experience/Internships */}
              {user.internships.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-purple-600" />
                    Experience
                  </h3>
                  <div className="space-y-4">
                    {user.internships.map((internship) => (
                      <div key={internship.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{internship.title}</h4>
                            <p className="text-gray-600">{internship.company} • {internship.location}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            internship.isCurrent ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {internship.isCurrent ? 'Current' : 'Past'}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mb-2">
                          {internship.startDate.toLocaleDateString()} - {internship.endDate.toLocaleDateString()}
                        </p>
                        {internship.description && (
                          <p className="text-gray-700 text-sm">{internship.description}</p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {internship.skills.map((skill) => (
                            <span key={skill} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Code className="h-5 w-5 mr-2 text-purple-600" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              {user.languages.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-purple-600" />
                    Languages
                  </h3>
                  <div className="space-y-3">
                    {user.languages.map((language) => (
                      <div key={language.id} className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{language.language}</span>
                        {renderProficiencyBadge(language.proficiency)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards */}
              {user.awards.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <AwardIcon className="h-5 w-5 mr-2 text-purple-600" />
                    Awards & Recognition
                  </h3>
                  <div className="space-y-3">
                    {user.awards.map((award) => (
                      <div key={award.id} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900">{award.title}</h4>
                        <p className="text-gray-600">{award.issuer}</p>
                        <p className="text-gray-500 text-sm">{award.date.toLocaleDateString()}</p>
                        {award.description && (
                          <p className="text-gray-700 text-sm mt-1">{award.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Company Recommendations */}
              {user.companyRecommendations.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-purple-600" />
                    Recommendations
                  </h3>
                  <div className="space-y-4">
                    {user.companyRecommendations.map((rec) => (
                      <div key={rec.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{rec.recommenderName}</h4>
                            <p className="text-gray-600">{rec.recommenderTitle} at {rec.companyName}</p>
                          </div>
                          {renderStarRating(rec.rating)}
                        </div>
                        <p className="text-gray-700 text-sm italic">"{rec.recommendation}"</p>
                        <p className="text-gray-500 text-xs mt-2">{rec.date.toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
              {userPosts.map((post) => (
                <div key={post.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-white font-semibold text-sm">{getInitials(user.name)}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900">{post.userName}</span>
                        <span className="text-gray-500 text-sm">{post.timestamp.toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex items-center space-x-4 text-gray-500">
                        <button className="flex items-center hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </button>
                        <button className="flex items-center hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments.length}
                        </button>
                        <button className="flex items-center hover:text-green-500 transition-colors">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Events</h3>
              {recommendedEvents.map((event) => (
                <div key={event.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    {event.isExclusive && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        Pro Exclusive
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                  <div className="flex items-center space-x-4 text-gray-500 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date.toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {event.currentAttendees}/{event.maxAttendees}
                    </div>
                  </div>
                  <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    Register
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;