import React, { useState } from 'react';
import { Star, Search, Filter, MapPin, Briefcase, Calendar, MessageCircle, Award, Crown, Users, Building, TrendingUp } from 'lucide-react';
import { User, Alumni } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface AlumniProps {
  user: User;
}

const AlumniConnect: React.FC<AlumniProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [selectedMentorship, setSelectedMentorship] = useState('all');

  const [alumni, setAlumni] = useState<Alumni[]>([
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@google.com',
      college: 'IIT Delhi',
      course: 'Computer Science',
      graduationYear: 2018,
      currentCompany: 'Google',
      currentPosition: 'Senior Software Engineer',
      experience: 6,
      isVerified: true,
      bio: 'Passionate about AI/ML and helping students break into tech. Led multiple product launches at Google.',
      avatar: undefined,
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'Leadership'],
      isAvailableForMentorship: true
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@microsoft.com',
      college: 'BITS Pilani',
      course: 'Computer Science',
      graduationYear: 2017,
      currentCompany: 'Microsoft',
      currentPosition: 'Product Manager',
      experience: 7,
      isVerified: true,
      bio: 'Product management expert with experience in cloud services. Love mentoring students in product thinking.',
      avatar: undefined,
      skills: ['Product Management', 'Strategy', 'Cloud Computing', 'Analytics'],
      isAvailableForMentorship: true
    },
    {
      id: '3',
      name: 'Anita Desai',
      email: 'anita.desai@amazon.com',
      college: 'NIT Trichy',
      course: 'Information Technology',
      graduationYear: 2019,
      currentCompany: 'Amazon',
      currentPosition: 'Data Scientist',
      experience: 5,
      isVerified: true,
      bio: 'Data science enthusiast working on recommendation systems. Always excited to help students with ML projects.',
      avatar: undefined,
      skills: ['Data Science', 'Python', 'SQL', 'Machine Learning', 'Statistics'],
      isAvailableForMentorship: true
    },
    {
      id: '4',
      name: 'Vikram Singh',
      email: 'vikram.singh@netflix.com',
      college: 'IIIT Hyderabad',
      course: 'Computer Science',
      graduationYear: 2016,
      currentCompany: 'Netflix',
      currentPosition: 'Engineering Manager',
      experience: 8,
      isVerified: true,
      bio: 'Engineering leader passionate about building scalable systems. Mentored 20+ engineers throughout my career.',
      avatar: undefined,
      skills: ['Engineering Management', 'System Design', 'Java', 'Microservices'],
      isAvailableForMentorship: false
    },
    {
      id: '5',
      name: 'Sneha Patel',
      email: 'sneha.patel@uber.com',
      college: 'IIT Bombay',
      course: 'Computer Science',
      graduationYear: 2020,
      currentCompany: 'Uber',
      currentPosition: 'Software Engineer III',
      experience: 4,
      isVerified: true,
      bio: 'Full-stack engineer working on ride-sharing algorithms. Love helping students with interview preparation.',
      avatar: undefined,
      skills: ['Full Stack Development', 'React', 'Node.js', 'Algorithms'],
      isAvailableForMentorship: true
    },
    {
      id: '6',
      name: 'Arjun Reddy',
      email: 'arjun.reddy@stripe.com',
      college: 'IIT Madras',
      course: 'Computer Science',
      graduationYear: 2018,
      currentCompany: 'Stripe',
      currentPosition: 'Staff Engineer',
      experience: 6,
      isVerified: true,
      bio: 'Fintech expert working on payment systems. Passionate about clean code and system architecture.',
      avatar: undefined,
      skills: ['System Architecture', 'Fintech', 'Go', 'Distributed Systems'],
      isAvailableForMentorship: true
    }
  ]);

  const companies = ['all', 'Google', 'Microsoft', 'Amazon', 'Netflix', 'Uber', 'Stripe'];
  const experienceLevels = ['all', '0-2 years', '3-5 years', '6-8 years', '9+ years'];
  const mentorshipOptions = ['all', 'Available', 'Not Available'];

  const handleConnect = (alumniId: string) => {
    // In real implementation, this would send a connection request
    alert(`Connection request sent to ${alumni.find(a => a.id === alumniId)?.name}`);
  };

  const handleMessage = (alumniId: string) => {
    // In real implementation, this would open messaging
    alert(`Opening conversation with ${alumni.find(a => a.id === alumniId)?.name}`);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredAlumni = alumni.filter(alumnus => {
    const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumnus.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCompany = selectedCompany === 'all' || alumnus.currentCompany === selectedCompany;
    const matchesExperience = selectedExperience === 'all' || 
      (selectedExperience === '0-2 years' && alumnus.experience <= 2) ||
      (selectedExperience === '3-5 years' && alumnus.experience >= 3 && alumnus.experience <= 5) ||
      (selectedExperience === '6-8 years' && alumnus.experience >= 6 && alumnus.experience <= 8) ||
      (selectedExperience === '9+ years' && alumnus.experience >= 9);
    const matchesMentorship = selectedMentorship === 'all' ||
      (selectedMentorship === 'Available' && alumnus.isAvailableForMentorship) ||
      (selectedMentorship === 'Not Available' && !alumnus.isAvailableForMentorship);

    return matchesSearch && matchesCompany && matchesExperience && matchesMentorship;
  });

  if (!user.isPro) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Alumni Connect</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            This exclusive feature is available only for Peerly Pro members. Connect with verified alumni from top companies for mentorship and career guidance.
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Upgrade to Peerly Pro</h3>
            <p className="text-purple-600 mb-4">Get access to verified alumni network and mentorship opportunities</p>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200">
              Upgrade Now - ₹99/month
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Alumni Connect</h1>
        <p className="text-gray-600">Connect with verified alumni from top companies for mentorship and career guidance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{alumni.length}</p>
              <p className="text-sm text-gray-600">Verified Alumni</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{companies.length - 1}</p>
              <p className="text-sm text-gray-600">Top Companies</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {alumni.reduce((acc, a) => acc + a.experience, 0)}
              </p>
              <p className="text-sm text-gray-600">Years of Experience</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {alumni.filter(a => a.isAvailableForMentorship).length}
              </p>
              <p className="text-sm text-gray-600">Available Mentors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search alumni by name, company, position, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {companies.map(company => (
              <option key={company} value={company}>
                {company === 'all' ? 'All Companies' : company}
              </option>
            ))}
          </select>
          
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {experienceLevels.map(level => (
              <option key={level} value={level}>
                {level === 'all' ? 'All Experience' : level}
              </option>
            ))}
          </select>
          
          <select
            value={selectedMentorship}
            onChange={(e) => setSelectedMentorship(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {mentorshipOptions.map(option => (
              <option key={option} value={option}>
                {option === 'all' ? 'All Mentors' : option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alumnus) => (
          <div key={alumnus.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {getInitials(alumnus.name)}
              </div>
              <div className="flex items-center space-x-2">
                {alumnus.isVerified && (
                  <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    <Award className="h-3 w-3 mr-1" />
                    Verified
                  </div>
                )}
                {alumnus.isAvailableForMentorship && (
                  <div className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                    <Star className="h-3 w-3 mr-1" />
                    Mentor
                  </div>
                )}
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-1">{alumnus.name}</h3>
            <p className="text-sm text-gray-600 mb-1 flex items-center">
              <Briefcase className="h-3 w-3 mr-1" />
              {alumnus.currentPosition}
            </p>
            <p className="text-sm text-gray-600 mb-1 flex items-center">
              <Building className="h-3 w-3 mr-1" />
              {alumnus.currentCompany}
            </p>
            <p className="text-sm text-gray-600 mb-1 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {alumnus.college} • {alumnus.graduationYear}
            </p>
            <p className="text-sm text-gray-500 mb-3 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {alumnus.experience} years experience
            </p>
            
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">{alumnus.bio}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {alumnus.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {skill}
                </span>
              ))}
              {alumnus.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{alumnus.skills.length - 3}
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handleConnect(alumnus.id)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
              >
                Connect
              </button>
              {alumnus.isAvailableForMentorship && (
                <button
                  onClick={() => handleMessage(alumnus.id)}
                  className="flex-1 border border-purple-600 text-purple-600 hover:bg-purple-50 py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAlumni.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No alumni found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default AlumniConnect;
