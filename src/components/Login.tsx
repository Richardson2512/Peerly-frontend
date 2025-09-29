import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';
import { User } from '../types';
import { supabase, db } from '../lib/supabase';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    course: '',
    courseDuration: 4,
    courseLevel: 'undergraduate' as 'undergraduate' | 'postgraduate' | 'phd',
    year: '',
    graduationYear: new Date().getFullYear() + 1,
    skills: [] as string[],
    interests: [] as string[]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateCollegeEmail = (email: string): boolean => {
    const collegeDomains = ['.edu', '.ac.in', '.ac.uk', '.university'];
    const invalidDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];
    
    if (invalidDomains.some(domain => email.toLowerCase().includes(domain))) {
      return false;
    }
    
    return collegeDomains.some(domain => email.toLowerCase().includes(domain));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateCollegeEmail(email)) {
      setError('Please use your college email address (.edu, .ac.in, etc.). Gmail, Outlook, Yahoo, and Hotmail are not allowed.');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        if (!formData.name || !formData.college || !formData.course || !formData.year) {
          setError('Please fill in all required fields');
          setLoading(false);
          return;
        }
        
        // Check if graduation date is in the past
        const graduationDate = new Date(formData.graduationYear, 6, 1);
        if (graduationDate < new Date()) {
          setError('Graduation date cannot be in the past');
          setLoading(false);
          return;
        }

        // Sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (authError) {
          setError(authError.message);
          setLoading(false);
          return;
        }

        if (authData.user) {
          // Create user profile in database
          const userData = {
            id: authData.user.id,
            name: formData.name,
            email,
            college: formData.college,
            course: formData.course,
            course_duration: formData.courseDuration,
            course_level: formData.courseLevel,
            year: formData.year,
            graduation_date: graduationDate.toISOString().split('T')[0],
            skills: formData.skills,
            interests: formData.interests,
            is_pro: false,
            is_account_active: true
          };

          await db.createUser(userData);

          // Convert to User type for the app
          const user: User = {
            id: authData.user.id,
            name: formData.name,
            email,
            college: formData.college,
            course: formData.course,
            courseDuration: formData.courseDuration,
            courseLevel: formData.courseLevel,
            year: formData.year,
            graduationDate,
            bio: 'Passionate student exploring new opportunities in tech.',
            isPro: false,
            connections: [],
            connectionRequests: [],
            skills: formData.skills,
            interests: formData.interests,
            isAccountActive: true
          };

          onLogin(user);
        }
      } else {
        // Sign in with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) {
          setError(authError.message);
          setLoading(false);
          return;
        }

        if (authData.user) {
          // Get user profile from database
          const userProfile = await db.getUserById(authData.user.id);

          // Convert to User type for the app
          const user: User = {
            id: userProfile.id,
            name: userProfile.name,
            email: userProfile.email,
            college: userProfile.college,
            course: userProfile.course,
            courseDuration: userProfile.course_duration,
            courseLevel: userProfile.course_level,
            year: userProfile.year,
            graduationDate: new Date(userProfile.graduation_date),
            avatar: userProfile.avatar_url,
            bio: userProfile.bio,
            isPro: userProfile.is_pro,
            proExpiryDate: userProfile.pro_expiry_date ? new Date(userProfile.pro_expiry_date) : undefined,
            connections: [], // Will be loaded separately
            connectionRequests: [], // Will be loaded separately
            skills: userProfile.skills,
            interests: userProfile.interests,
            isAccountActive: userProfile.is_account_active
          };

          // Check if account is still active (not graduated)
          if (!user.isAccountActive || user.graduationDate < new Date()) {
            setError('Your account has been deactivated as your course duration has ended.');
            setLoading(false);
            return;
          }

          onLogin(user);
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Authentication failed. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-full mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent">
            Peerly
          </h1>
          <p className="text-gray-600 mt-2">Connect. Learn. Grow.</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {isSignUp ? 'Join Peerly' : 'Welcome Back'}
          </h2>

          {/* Demo Credentials Info */}
          {!isSignUp && (
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-emerald-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Demo Credentials</h3>
              <div className="text-sm text-purple-700 space-y-1">
                <p><strong>Email:</strong> john.student@stanford.edu</p>
                <p><strong>Password:</strong> demo123</p>
              </div>
              <p className="text-xs text-purple-600 mt-2">Use these credentials to explore the platform</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College/University
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({...formData, college: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="Enter your college name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course/Program
                  </label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="e.g., Computer Science, Business Administration"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Level
                    </label>
                    <select
                      value={formData.courseLevel}
                      onChange={(e) => setFormData({...formData, courseLevel: e.target.value as 'undergraduate' | 'postgraduate' | 'phd'})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      required
                    >
                      <option value="undergraduate">Undergraduate</option>
                      <option value="postgraduate">Postgraduate</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Duration (Years)
                    </label>
                    <select
                      value={formData.courseDuration}
                      onChange={(e) => setFormData({...formData, courseDuration: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      required
                    >
                      <option value={1}>1 Year</option>
                      <option value={2}>2 Years</option>
                      <option value={3}>3 Years</option>
                      <option value={4}>4 Years</option>
                      <option value={5}>5 Years</option>
                      <option value={6}>6 Years</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Year
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      required
                    >
                      <option value="">Select</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="5th Year">5th Year</option>
                      <option value="Final Year">Final Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Graduation Year
                    </label>
                    <select
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({...formData, graduationYear: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      required
                    >
                      <option value={2024}>2024</option>
                      <option value={2025}>2025</option>
                      <option value={2026}>2026</option>
                      <option value={2027}>2027</option>
                      <option value={2028}>2028</option>
                      <option value={2029}>2029</option>
                      <option value={2030}>2030</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                College Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="student@university.edu"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use your college email address (.edu, .ac.in, etc.)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;