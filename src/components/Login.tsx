import React, { useState, useRef } from 'react';
import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';
import { User } from '../types';
import { supabase, db } from '../lib/supabase';
import { initializeUserStorage } from '../lib/storage';
import AutocompleteInput from './AutocompleteInput';
import { filterColleges, addCollege } from '../data/colleges';
import { filterCourses, addCourse } from '../data/courses';

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
    courseLevel: 'undergraduate' as 'diploma' | 'undergraduate' | 'postgraduate' | 'phd',
    year: '',
    graduationYear: new Date().getFullYear() + 1,
    skills: [] as string[],
    interests: [] as string[]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  
  // Refs for focusing next fields
  const courseInputRef = useRef<HTMLDivElement>(null);
  const courseLevelRef = useRef<HTMLSelectElement>(null);

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

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (!validateCollegeEmail(email)) {
      setError('Please use your college email address (.edu, .ac.in, etc.). Gmail, Outlook, Yahoo, and Hotmail are not allowed.');
      setLoading(false);
      return;
    }

        try {
          // Skip hardcoded credentials check if signing up
          if (!isSignUp && ((email === 'john.student@stanford.edu' && password === 'demo123') || demoMode)) {
            const testUser: User = {
              id: 'test-user-123',
              name: 'John Student',
              email: 'john.student@stanford.edu',
              college: 'Stanford University',
              course: 'Computer Science',
              courseDuration: 4,
              courseLevel: 'undergraduate',
              year: '3rd Year',
              graduationDate: new Date('2025-07-01'),
              bio: 'Passionate computer science student exploring opportunities in tech and AI. Love building projects and connecting with fellow students.',
              isPro: false, // Regular user, can test Pro upgrade
              connections: ['user-2', 'user-3'],
              connectionRequests: [],
              followers: ['user-2', 'user-4', 'user-5'],
              following: ['user-2', 'user-3'],
              skills: ['JavaScript', 'React', 'Python', 'Machine Learning', 'Node.js'],
              interests: ['Technology', 'Innovation', 'AI', 'Web Development'],
              languages: [
                { id: '1', language: 'English', proficiency: 'native' },
                { id: '2', language: 'Spanish', proficiency: 'intermediate' },
                { id: '3', language: 'French', proficiency: 'beginner' }
              ],
              awards: [
                { id: '1', title: 'Dean\'s List', issuer: 'Stanford University', date: new Date('2024-01-15'), category: 'academic' },
                { id: '2', title: 'Best Project Award', issuer: 'Hackathon 2024', date: new Date('2024-02-20'), category: 'hackathon' }
              ],
              achievements: [
                { id: '1', title: 'Published Research Paper', description: 'AI in Education', date: new Date('2024-01-10'), category: 'academic' },
                { id: '2', title: 'Student Council President', description: 'Led student initiatives', date: new Date('2023-09-01'), category: 'leadership' }
              ],
              certifications: [
                { id: '1', userId: 'test-user-123', courseId: '1', courseName: 'React Development', issuedDate: new Date('2024-01-10'), certificateUrl: '/certificates/react-cert.pdf' }
              ],
              internships: [
                { id: '1', title: 'Software Engineering Intern', company: 'Google', location: 'Mountain View, CA', startDate: new Date('2024-06-01'), endDate: new Date('2024-08-31'), description: 'Worked on search algorithms', skills: ['Python', 'Machine Learning'], isCurrent: false },
                { id: '2', title: 'Frontend Developer Intern', company: 'Meta', location: 'Menlo Park, CA', startDate: new Date('2024-01-01'), endDate: new Date('2024-03-31'), description: 'Developed React components', skills: ['React', 'JavaScript'], isCurrent: true }
              ],
              companyRecommendations: [
                { id: '1', companyName: 'Google', recommenderName: 'Sarah Johnson', recommenderTitle: 'Senior Software Engineer', recommendation: 'John was an excellent intern with strong problem-solving skills.', date: new Date('2024-09-01'), rating: 5 }
              ],
              isAccountActive: true,
              profileViews: 1250,
              location: 'Stanford, CA',
              linkedinUrl: 'https://linkedin.com/in/johnstudent',
              githubUrl: 'https://github.com/johnstudent'
            };
            
            onLogin(testUser);
            setLoading(false);
            return;
          }

          // Pro user credentials (skip if signing up)
          if (!isSignUp && email === 'sarah.chen@mit.edu' && password === 'pro123') {
            const proUser: User = {
              id: 'pro-user-456',
              name: 'Sarah Chen',
              email: 'sarah.chen@mit.edu',
              college: 'MIT',
              course: 'Computer Science',
              courseDuration: 4,
              courseLevel: 'undergraduate',
              year: '3rd Year',
              graduationDate: new Date('2025-06-15'),
              bio: 'Software engineering intern at Google. Passionate about AI/ML and helping students break into tech.',
              isPro: true,
              proExpiryDate: new Date('2024-12-31'),
              connections: ['user-1', 'user-3', 'user-4'],
              connectionRequests: [],
              followers: ['user-1', 'user-3', 'user-4', 'user-6', 'user-7'],
              following: ['user-1', 'user-3'],
              skills: ['Java', 'Python', 'React', 'Node.js', 'Machine Learning'],
              interests: ['Technology', 'Startups', 'AI'],
              languages: [
                { id: '1', language: 'English', proficiency: 'native' },
                { id: '2', language: 'Mandarin', proficiency: 'native' },
                { id: '3', language: 'Japanese', proficiency: 'intermediate' }
              ],
              awards: [
                { id: '1', title: 'Google Intern Excellence Award', issuer: 'Google', date: new Date('2024-08-15'), category: 'professional' },
                { id: '2', title: 'MIT Dean\'s List', issuer: 'MIT', date: new Date('2024-01-20'), category: 'academic' }
              ],
              achievements: [
                { id: '1', title: 'Published AI Research', description: 'Machine Learning for Healthcare', date: new Date('2024-02-15'), category: 'academic' },
                { id: '2', title: 'Tech Startup Founder', description: 'Founded AI tutoring platform', date: new Date('2023-06-01'), category: 'leadership' }
              ],
              certifications: [
                { id: '1', userId: 'pro-user-456', courseId: '2', courseName: 'Advanced Machine Learning', issuedDate: new Date('2024-01-15'), certificateUrl: '/certificates/ml-cert.pdf' }
              ],
              internships: [
                { id: '1', title: 'Software Engineering Intern', company: 'Google', location: 'Mountain View, CA', startDate: new Date('2024-06-01'), endDate: new Date('2024-08-31'), description: 'Worked on AI/ML infrastructure', skills: ['Python', 'TensorFlow', 'Machine Learning'], isCurrent: false },
                { id: '2', title: 'Research Intern', company: 'MIT AI Lab', location: 'Cambridge, MA', startDate: new Date('2024-01-01'), endDate: new Date('2024-05-31'), description: 'AI research in healthcare', skills: ['Python', 'Research', 'Statistics'], isCurrent: false }
              ],
              companyRecommendations: [
                { id: '1', companyName: 'Google', recommenderName: 'Dr. Michael Zhang', recommenderTitle: 'Staff Software Engineer', recommendation: 'Sarah is an exceptional talent with deep understanding of AI/ML concepts.', date: new Date('2024-09-01'), rating: 5 },
                { id: '2', companyName: 'MIT AI Lab', recommenderName: 'Prof. Lisa Wang', recommenderTitle: 'Research Director', recommendation: 'Outstanding research skills and innovative thinking.', date: new Date('2024-06-01'), rating: 5 }
              ],
              isAccountActive: true,
              profileViews: 3250,
              location: 'Cambridge, MA',
              linkedinUrl: 'https://linkedin.com/in/sarahchen',
              githubUrl: 'https://github.com/sarahchen'
            };
            
            onLogin(proUser);
            setLoading(false);
            return;
          }

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
          options: {
            data: {
              name: formData.name,
              college: formData.college,
            },
            emailRedirectTo: window.location.origin
          }
        });

        if (authError) {
          console.error('Signup error:', authError);
          setError(authError.message || 'Failed to create account. Please try again.');
          setLoading(false);
          return;
        }

        // Check if email confirmation is required
        if (authData.user && !authData.session) {
          setError('Please check your email to confirm your account before logging in.');
          setLoading(false);
          setIsSignUp(false);
          return;
        }

        if (authData.user) {
          try {
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

            // Initialize user storage buckets
            await initializeUserStorage(authData.user.id);

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
              followers: [],
              following: [],
              skills: formData.skills,
              interests: formData.interests,
              languages: [],
              awards: [],
              achievements: [],
              certifications: [],
              internships: [],
              companyRecommendations: [],
              isAccountActive: true,
              profileViews: 0
            };

            onLogin(user);
          } catch (dbError) {
            console.error('Database error:', dbError);
            setError('Account created but failed to save profile. Please try logging in.');
            setLoading(false);
            setIsSignUp(false);
          }
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
            followers: [],
            following: [],
            skills: userProfile.skills,
            interests: userProfile.interests,
            languages: [],
            awards: [],
            achievements: [],
            certifications: [],
            internships: [],
            companyRecommendations: [],
            isAccountActive: userProfile.is_account_active,
            profileViews: userProfile.profile_views || 0,
            location: userProfile.location,
            linkedinUrl: userProfile.linkedin_url,
            githubUrl: userProfile.github_url
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
            <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {isSignUp ? 'Join Peerly - Start Your Journey' : 'Welcome Back'}
              </h2>

          {/* Test Credentials Info */}
          {!isSignUp && (
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-emerald-50 border border-purple-200 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Test Credentials</h3>
              <div className="text-sm text-purple-700 space-y-2">
                <div className="bg-white p-2 rounded border">
                  <p className="font-medium text-purple-800">Regular User:</p>
                  <p><strong>Email:</strong> john.student@stanford.edu</p>
                  <p><strong>Password:</strong> demo123</p>
                </div>
                <div className="bg-white p-2 rounded border">
                  <p className="font-medium text-purple-800">Pro User:</p>
                  <p><strong>Email:</strong> sarah.chen@mit.edu</p>
                  <p><strong>Password:</strong> pro123</p>
                </div>
              </div>
              <p className="text-xs text-purple-600 mt-2">Use these credentials to explore the platform features</p>
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

                <div ref={courseInputRef}>
                  <AutocompleteInput
                    label="College/University"
                    value={formData.college}
                    onChange={(value) => setFormData({...formData, college: value})}
                    suggestions={[]}
                    placeholder="Search or enter your college name"
                    required
                    filterFunction={filterColleges}
                    onAdd={(value) => {
                      addCollege(value);
                      setFormData({...formData, college: value});
                    }}
                    onMoveNext={() => {
                      // Focus the course input field
                      const courseInput = courseInputRef.current?.nextElementSibling?.querySelector('input');
                      if (courseInput instanceof HTMLInputElement) {
                        courseInput.focus();
                      }
                    }}
                  />
                </div>

                <AutocompleteInput
                  label="Course/Program"
                  value={formData.course}
                  onChange={(value) => setFormData({...formData, course: value})}
                  suggestions={[]}
                  placeholder="Search or enter your course (e.g., Computer Science)"
                  required
                  filterFunction={filterCourses}
                  onAdd={(value) => {
                    addCourse(value);
                    setFormData({...formData, course: value});
                  }}
                  onMoveNext={() => {
                    // Focus the course level dropdown
                    courseLevelRef.current?.focus();
                  }}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Level
                    </label>
                    <select
                      ref={courseLevelRef}
                      value={formData.courseLevel}
                      onChange={(e) => setFormData({...formData, courseLevel: e.target.value as 'diploma' | 'undergraduate' | 'postgraduate' | 'phd'})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      required
                    >
                      <option value="diploma">Diploma</option>
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
                  minLength={6}
                  required
                />
              </div>
              {isSignUp && (
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          {/* Quick Login Buttons */}
          {!isSignUp && (
            <div className="mt-3 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setDemoMode(true);
                  setEmail('john.student@stanford.edu');
                  setPassword('demo123');
                  handleSubmit(new Event('submit') as any);
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                👤 Login as Regular User
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('sarah.chen@mit.edu');
                  setPassword('pro123');
                  handleSubmit(new Event('submit') as any);
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                👑 Login as Pro User
              </button>
            </div>
          )}

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
