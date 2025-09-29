import React, { useState } from 'react';
import { BookOpen, Play, Clock, Users, Star, Award, Filter, Search, Crown, CheckCircle } from 'lucide-react';
import { User, Course, Certificate } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface LearningProps {
  user: User;
}

const Learning: React.FC<LearningProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'enrolled' | 'completed' | 'certificates'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Introduction to React Development',
      description: 'Learn the fundamentals of React.js including components, state, props, and hooks. Perfect for beginners who want to start their frontend development journey.',
      instructor: 'Dr. Sarah Johnson',
      duration: '4 weeks',
      level: 'beginner',
      category: 'Web Development',
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: '',
      isFree: true,
      isProOnly: false,
      completionCertificate: true,
      enrolledStudents: 1250,
      rating: 4.8,
      modules: [
        {
          id: '1-1',
          title: 'Getting Started with React',
          description: 'Introduction to React and setting up your development environment',
          videoUrl: '',
          duration: '45 min',
          isCompleted: false
        },
        {
          id: '1-2',
          title: 'Components and JSX',
          description: 'Understanding React components and JSX syntax',
          videoUrl: '',
          duration: '60 min',
          isCompleted: false
        }
      ]
    },
    {
      id: '2',
      title: 'Advanced Machine Learning with Python',
      description: 'Deep dive into machine learning algorithms, neural networks, and practical applications using Python and popular ML libraries.',
      instructor: 'Prof. Michael Chen',
      duration: '8 weeks',
      level: 'advanced',
      category: 'Data Science',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: '',
      isFree: false,
      isProOnly: true,
      completionCertificate: true,
      enrolledStudents: 456,
      rating: 4.9,
      modules: [
        {
          id: '2-1',
          title: 'Introduction to ML Algorithms',
          description: 'Overview of machine learning algorithms and their applications',
          videoUrl: '',
          duration: '90 min',
          isCompleted: false
        }
      ]
    },
    {
      id: '3',
      title: 'Full-Stack Web Development Bootcamp',
      description: 'Complete course covering frontend, backend, and database technologies to build modern web applications.',
      instructor: 'Alex Rodriguez',
      duration: '12 weeks',
      level: 'intermediate',
      category: 'Web Development',
      thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: '',
      isFree: true,
      isProOnly: false,
      completionCertificate: true,
      enrolledStudents: 890,
      rating: 4.7,
      modules: []
    }
  ]);

  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(['1', '3']);
  const [completedCourses, setCompletedCourses] = useState<string[]>(['3']);
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      userId: user.id,
      courseId: '3',
      courseName: 'Full-Stack Web Development Bootcamp',
      issuedDate: new Date('2024-01-10'),
      certificateUrl: '/certificates/cert-1.pdf'
    }
  ]);

  const categories = ['all', 'Web Development', 'Data Science', 'Mobile Development', 'AI/ML', 'Design', 'Business'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const handleEnrollCourse = (courseId: string) => {
    if (courses.find(c => c.id === courseId)?.isProOnly && !user.isPro) {
      alert('This course is available for Pro users only. Upgrade to Peerly Pro to access premium courses.');
      return;
    }
    
    setEnrolledCourses([...enrolledCourses, courseId]);
  };

  const handleCompleteCourse = (courseId: string) => {
    if (!completedCourses.includes(courseId)) {
      setCompletedCourses([...completedCourses, courseId]);
      
      const course = courses.find(c => c.id === courseId);
      if (course?.completionCertificate) {
        const newCertificate: Certificate = {
          id: Date.now().toString(),
          userId: user.id,
          courseId,
          courseName: course.title,
          issuedDate: new Date(),
          certificateUrl: `/certificates/cert-${courseId}.pdf`
        };
        setCertificates([...certificates, newCertificate]);
      }
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getDisplayCourses = () => {
    switch (activeTab) {
      case 'enrolled':
        return filteredCourses.filter(course => enrolledCourses.includes(course.id));
      case 'completed':
        return filteredCourses.filter(course => completedCourses.includes(course.id));
      default:
        return filteredCourses;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Peerly Learning</h1>
        <p className="text-gray-600">Enhance your skills with free and premium courses from industry experts</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'all', label: 'All Courses', count: courses.length },
            { id: 'enrolled', label: 'My Courses', count: enrolledCourses.length },
            { id: 'completed', label: 'Completed', count: completedCourses.length },
            { id: 'certificates', label: 'Certificates', count: certificates.length }
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
            placeholder="Search courses, instructors..."
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
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            {levels.map(level => (
              <option key={level} value={level}>
                {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'certificates' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="h-12 w-12 text-yellow-500" />
                <div className="text-right">
                  <p className="text-sm text-gray-500">Issued</p>
                  <p className="font-medium">{certificate.issuedDate.toLocaleDateString()}</p>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{certificate.courseName}</h3>
              <p className="text-sm text-gray-600 mb-4">Completion Certificate</p>
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
                Download Certificate
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getDisplayCourses().map((course) => {
            const isEnrolled = enrolledCourses.includes(course.id);
            const isCompleted = completedCourses.includes(course.id);
            const canEnroll = !course.isProOnly || user.isPro;
            
            return (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {course.isFree ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Free
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Crown className="h-3 w-3 mr-1" />
                        Pro
                      </span>
                    )}
                    {isCompleted && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-purple-600 font-medium">{course.category}</span>
                    <span className="text-sm text-gray-500 capitalize">{course.level}</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="mr-4">{course.enrolledStudents.toLocaleString()} enrolled</span>
                    <div className="flex items-center">
                      {renderStars(course.rating)}
                      <span className="ml-1">{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">by {course.instructor}</span>
                    {course.completionCertificate && (
                      <Award className="h-4 w-4 text-yellow-500" title="Certificate available" />
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {isEnrolled ? (
                      isCompleted ? (
                        <button
                          onClick={() => window.open(`/course/${course.id}`, '_blank')}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          View Certificate
                        </button>
                      ) : (
                        <button
                          onClick={() => window.open(`/course/${course.id}`, '_blank')}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Continue Course
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => handleEnrollCourse(course.id)}
                        disabled={!canEnroll}
                        className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${
                          canEnroll
                            ? 'bg-purple-600 hover:bg-purple-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        {canEnroll ? 'Enroll Now' : 'Pro Only'}
                      </button>
                    )}
                    
                    {isEnrolled && !isCompleted && (
                      <button
                        onClick={() => handleCompleteCourse(course.id)}
                        className="px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Learning;
