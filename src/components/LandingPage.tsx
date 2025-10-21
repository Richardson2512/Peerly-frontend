import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap,
  Users,
  Briefcase,
  BookOpen,
  MessageCircle,
  Bell,
  Star,
  Award,
  Globe,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Play,
  Download,
  Apple,
  Smartphone as Android,
  Heart,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Calendar,
  FolderOpen,
  UserCheck,
  Eye,
  Code,
  Trophy
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: 'Student Peer Connection',
      description: 'Connect with fellow students from colleges worldwide and build meaningful professional relationships.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Briefcase,
      title: 'Internship Opportunities',
      description: 'Discover and apply for internships with top companies, tailored to your skills and interests.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: BookOpen,
      title: 'Peerly Learning',
      description: 'Access free, high-quality courses and earn certificates to enhance your skills and knowledge.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: MessageCircle,
      title: 'Professional Messaging',
      description: 'Communicate with connections and collaborate on projects in a secure, professional environment.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Award,
      title: 'Achievements & Recognition',
      description: 'Showcase your accomplishments, awards, and certifications to build your professional profile.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Shield,
      title: 'Content Moderation',
      description: 'Safe, moderated environment ensuring appropriate content and professional interactions.',
      color: 'from-indigo-500 to-indigo-600'
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

  const testimonials = [
    {
      name: 'Sarah Chen',
      college: 'MIT',
      role: 'Software Engineer at Google',
      content: 'Peerly helped me connect with amazing mentors and land my dream internship at Google. The networking opportunities are incredible!',
      avatar: '👩‍💻'
    },
    {
      name: 'Alex Rodriguez',
      college: 'Stanford',
      role: 'Product Manager at Meta',
      content: 'The learning courses on Peerly are top-notch. I earned 3 certifications that directly helped me get my current role.',
      avatar: '👨‍💼'
    },
    {
      name: 'Emily Davis',
      college: 'Harvard',
      role: 'Data Scientist at Netflix',
      content: 'The alumni network feature is a game-changer. I got career advice from industry leaders that shaped my path.',
      avatar: '👩‍🔬'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-full mr-3">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Peerly
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">About</a>
              <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Reviews</a>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-emerald-700 transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block h-0.5 w-6 bg-gray-600 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-gray-600 transition-all mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-gray-600 transition-all mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
                <a href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">About</a>
                <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
                <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Reviews</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => navigate('/login')}
                    className="text-gray-600 hover:text-purple-600 font-medium transition-colors text-left"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-emerald-700 transition-all"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-purple-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The Future of{' '}
              <span className="bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Student Peer Connection
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Connect with peers, discover opportunities, and build your professional future with Peerly - 
              the ultimate platform designed exclusively for college students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-8 py-4 rounded-md font-semibold text-lg hover:from-purple-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight className="inline h-5 w-5 ml-2" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-md font-semibold text-lg hover:border-purple-600 hover:text-purple-600 transition-all flex items-center justify-center">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* Mobile App Download */}
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Smartphone className="h-8 w-8 text-purple-600" />
                  <span className="text-2xl font-bold text-gray-900">Download Our Mobile App</span>
                </div>
                <p className="text-gray-600">Available on iOS and Android</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#"
                  className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Apple className="h-6 w-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Android className="h-6 w-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-lg text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-purple-50 to-emerald-50">
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
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Students Say</h2>
            <p className="text-xl text-gray-600">
              Join thousands of students who are already building their future with Peerly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{testimonial.avatar}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.college}</p>
                  <p className="text-purple-600 font-medium">{testimonial.role}</p>
                </div>
                <p className="text-gray-700 italic text-center">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peerly Pro Section */}
      <section id="pricing" className="py-20 bg-gradient-to-r from-purple-600 to-emerald-600">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-purple-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-emerald-700 transition-all"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join thousands of students who are already building their future with Peerly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Sign Up Free
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-full mr-3">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Peerly</span>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate networking platform for college students. Connect, learn, and grow with peers from around the world.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Heart className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Reviews</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2024 Peerly. All rights reserved. Made with ❤️ for students worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
