import React from 'react';
import { 
  Heart, 
  Target, 
  Eye, 
  Users, 
  GraduationCap, 
  Globe, 
  Award,
  TrendingUp,
  Shield,
  Zap,
  BookOpen,
  Briefcase,
  MessageCircle,
  Star
} from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Student Peer Connection',
      description: 'Connect with fellow students from colleges worldwide and build meaningful professional relationships.'
    },
    {
      icon: Briefcase,
      title: 'Internship Opportunities',
      description: 'Discover and apply for internships with top companies, tailored to your skills and interests.'
    },
    {
      icon: BookOpen,
      title: 'Peerly Learning',
      description: 'Access free, high-quality courses and earn certificates to enhance your skills and knowledge.'
    },
    {
      icon: MessageCircle,
      title: 'Messaging & Collaboration',
      description: 'Communicate with connections and collaborate on projects in a secure, professional environment.'
    },
    {
      icon: Award,
      title: 'Achievements & Recognition',
      description: 'Showcase your accomplishments, awards, and certifications to build your professional profile.'
    },
    {
      icon: Shield,
      title: 'Content Moderation',
      description: 'Safe, moderated environment ensuring appropriate content and professional interactions.'
    }
  ];

  const proFeatures = [
    'Exclusive Alumni Connect for mentorship opportunities',
    'Priority access to premium internships and recruiters',
    'Advanced job search filters and personalized recommendations',
    'Resume & Portfolio Builder with professional templates',
    'Access to exclusive webinars and workshops',
    'Profile boost and enhanced visibility to recruiters',
    'Project Collaboration Workspace',
    'Advanced Application Tracker',
    'Premium Learning Hub access',
    'Priority access to events and hackathons'
  ];

  const stats = [
    { number: '50K+', label: 'Active Students', icon: Users },
    { number: '1000+', label: 'Partner Companies', icon: Briefcase },
    { number: '500+', label: 'Learning Courses', icon: BookOpen },
    { number: '95%', label: 'Success Rate', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-full mb-8">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">Peerly</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The ultimate networking platform designed exclusively for college students. 
              Connect, learn, and grow with peers from around the world while building your professional future.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To empower college students worldwide by providing a professional networking platform 
                that connects them with opportunities, mentors, and peers to accelerate their career growth 
                and personal development.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-emerald-50 p-6 rounded-md">
                <p className="text-gray-700 italic">
                  "Building bridges between students and their dreams, one connection at a time."
                </p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-emerald-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To become the world's leading student networking platform, where every college student 
                can find their tribe, discover opportunities, and build a successful career through 
                meaningful connections and continuous learning.
              </p>
              <div className="bg-gradient-to-r from-emerald-50 to-purple-50 p-6 rounded-md">
                <p className="text-gray-700 italic">
                  "A world where every student has access to the network and resources they need to succeed."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Peerly */}
      <div className="py-20 bg-gradient-to-br from-purple-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Peerly?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the unique needs of college students and have built a platform 
              specifically designed to help you succeed in your academic and professional journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Impact</h2>
            <p className="text-xl text-gray-600">
              Join thousands of students who are already building their future with Peerly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-lg text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Peerly Pro */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl font-bold mb-6">Unlock Your Potential with Peerly Pro</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Get exclusive access to premium features designed to accelerate your career growth
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-full mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Peerly Pro - ₹99/month</h3>
              <p className="text-gray-600">Premium features for ambitious students</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-emerald-700 transition-all">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Future Plans */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Future Plans</h2>
            <p className="text-xl text-gray-600">
              We're constantly evolving to better serve our student community
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Expansion</h3>
              <p className="text-gray-600">
                Expanding to universities worldwide, connecting students across continents 
                and creating a truly global network of opportunities.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-lg">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enhanced Learning</h3>
              <p className="text-gray-600">
                Partnering with top universities and industry leaders to offer 
                exclusive courses, workshops, and certification programs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Services</h3>
              <p className="text-gray-600">
                Launching comprehensive career services including resume reviews, 
                mock interviews, and personalized career coaching.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-br from-purple-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join thousands of students who are already building their future with Peerly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">
              Sign Up Free
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-full mb-4">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Peerly</h3>
            <p className="text-gray-400 mb-6">Connect. Learn. Grow.</p>
            <div className="flex justify-center space-x-8 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="hover:text-white transition-colors">Help Center</a>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800 text-gray-400 text-sm">
              <p>&copy; 2024 Peerly. All rights reserved. Made with ❤️ for students worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
