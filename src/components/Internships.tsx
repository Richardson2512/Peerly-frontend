import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Calendar, Search, Filter, ExternalLink, Building, Crown, Star, Eye, Users, TrendingUp } from 'lucide-react';
import { User, Internship, Application } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface InternshipsProps {
  user: User;
}

const Internships: React.FC<InternshipsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'applied' | 'tracker'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'remote' | 'on-site' | 'hybrid'>('all');
  const [filterCompany, setFilterCompany] = useState('all');
  const [filterSalary, setFilterSalary] = useState('all');

  const internships: Internship[] = [
    {
      id: '1',
      title: 'Software Engineering Intern',
      company: 'Google',
      location: 'Mountain View, CA',
      type: 'on-site',
      duration: '3 months',
      stipend: '$8,000/month',
      description: 'Join our team to work on cutting-edge projects that impact billions of users worldwide. You\'ll collaborate with senior engineers on real production systems.',
      requirements: ['Currently pursuing CS degree', '3.5+ GPA', 'Proficiency in Java/Python', 'Strong problem-solving skills'],
      postedDate: new Date('2024-01-10T09:00:00'),
      applicationDeadline: new Date('2024-02-15T23:59:59')
    },
    {
      id: '2',
      title: 'Product Management Intern',
      company: 'Meta',
      location: 'Menlo Park, CA',
      type: 'hybrid',
      duration: '4 months',
      stipend: '$7,500/month',
      description: 'Work with cross-functional teams to drive product strategy and execution for one of our core products. Perfect for students interested in tech product management.',
      requirements: ['Business/Engineering major', 'Leadership experience', 'Analytical mindset', 'Communication skills'],
      postedDate: new Date('2024-01-12T14:30:00'),
      applicationDeadline: new Date('2024-02-20T23:59:59')
    },
    {
      id: '3',
      title: 'Data Science Intern',
      company: 'Netflix',
      location: 'Remote',
      type: 'remote',
      duration: '3 months',
      stipend: '$6,500/month',
      description: 'Apply machine learning and statistical analysis to improve content recommendations and user experience. Work with large-scale datasets.',
      requirements: ['Statistics/CS/Data Science major', 'Python/R proficiency', 'Machine Learning knowledge', 'SQL experience'],
      postedDate: new Date('2024-01-08T11:15:00'),
      applicationDeadline: new Date('2024-02-10T23:59:59')
    },
    {
      id: '4',
      title: 'UX Design Intern',
      company: 'Adobe',
      location: 'San Jose, CA',
      type: 'hybrid',
      duration: '4 months',
      stipend: '$6,000/month',
      description: 'Design intuitive user experiences for our creative software products. Collaborate with product teams and conduct user research.',
      requirements: ['Design/HCI major', 'Portfolio required', 'Figma/Sketch proficiency', 'User research experience'],
      postedDate: new Date('2024-01-14T16:45:00'),
      applicationDeadline: new Date('2024-02-28T23:59:59')
    },
    {
      id: '5',
      title: 'Cybersecurity Intern',
      company: 'Microsoft',
      location: 'Seattle, WA',
      type: 'on-site',
      duration: '3 months',
      stipend: '$7,200/month',
      description: 'Help protect Microsoft\'s infrastructure and customer data. Work on threat detection, vulnerability assessment, and security automation.',
      requirements: ['CS/Cybersecurity major', 'Security fundamentals', 'Networking knowledge', 'Problem-solving skills'],
      postedDate: new Date('2024-01-11T13:20:00'),
      applicationDeadline: new Date('2024-02-18T23:59:59')
    }
  ];

  const [applications, setApplications] = useState<Application[]>([
    {
      id: '1',
      userId: user.id,
      internshipId: '1',
      status: 'under_review',
      appliedDate: new Date('2024-01-15'),
      notes: 'Applied with updated resume and cover letter',
      documents: ['resume.pdf', 'cover_letter.pdf']
    },
    {
      id: '2',
      userId: user.id,
      internshipId: '3',
      status: 'interview_scheduled',
      appliedDate: new Date('2024-01-12'),
      notes: 'Technical interview scheduled for next week',
      documents: ['resume.pdf', 'portfolio.pdf']
    }
  ]);

  const [appliedInternships, setAppliedInternships] = useState<Set<string>>(new Set(['1', '3']));

  const companies = ['all', 'Google', 'Meta', 'Netflix', 'Adobe', 'Microsoft'];
  const salaryRanges = ['all', 'Under ₹50k', '₹50k - ₹1L', '₹1L - ₹2L', 'Above ₹2L'];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || internship.type === filterType;
    const matchesCompany = filterCompany === 'all' || internship.company === filterCompany;
    const matchesSalary = filterSalary === 'all' || 
      (filterSalary === 'Under ₹50k' && internship.stipend.includes('$6,000')) ||
      (filterSalary === '₹50k - ₹1L' && internship.stipend.includes('$6,500')) ||
      (filterSalary === '₹1L - ₹2L' && (internship.stipend.includes('$7,500') || internship.stipend.includes('$7,200'))) ||
      (filterSalary === 'Above ₹2L' && internship.stipend.includes('$8,000'));
    
    return matchesSearch && matchesFilter && matchesCompany && matchesSalary;
  });

  const handleApply = (internshipId: string) => {
    const newApplication: Application = {
      id: Date.now().toString(),
      userId: user.id,
      internshipId,
      status: 'applied',
      appliedDate: new Date(),
      notes: '',
      documents: ['resume.pdf']
    };
    
    setApplications([...applications, newApplication]);
    setAppliedInternships(new Set([...appliedInternships, internshipId]));
  };

  const getApplicationStatus = (internshipId: string) => {
    const application = applications.find(app => app.internshipId === internshipId);
    return application?.status || 'not_applied';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'interview_scheduled': return 'bg-purple-100 text-purple-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'remote': return 'bg-emerald-100 text-emerald-800';
      case 'on-site': return 'bg-blue-100 text-blue-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Internships & Jobs</h1>
        <p className="text-gray-600">Discover amazing internship opportunities from top companies</p>
      </div>

      {/* Pro Features Notice */}
      {!user.isPro && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-6">
          <div className="flex items-center">
            <Crown className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">Upgrade to Pro for Advanced Features</h3>
              <p className="text-yellow-700">
                Get priority recruiter access, advanced filters, application tracker, and personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'all', label: 'All Opportunities', count: internships.length },
            { id: 'applied', label: 'My Applications', count: applications.length },
            { id: 'tracker', label: 'Application Tracker', count: applications.length, proOnly: true }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              disabled={tab.proOnly && !user.isPro}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : tab.proOnly && !user.isPro
                  ? 'border-transparent text-gray-400 cursor-not-allowed'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              {tab.proOnly && !user.isPro && <Crown className="h-3 w-3 inline ml-1" />}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters */}
      {(activeTab === 'all' || activeTab === 'applied') && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search internships by title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="all">All Types</option>
                  <option value="remote">Remote</option>
                  <option value="on-site">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {companies.map(company => (
                  <option key={company} value={company}>
                    {company === 'all' ? 'All Companies' : company}
                  </option>
                ))}
              </select>
              {user.isPro && (
                <select
                  value={filterSalary}
                  onChange={(e) => setFilterSalary(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  {salaryRanges.map(range => (
                    <option key={range} value={range}>
                      {range === 'all' ? 'All Salaries' : range}
                    </option>
                  ))}
                </select>
              )}
              {user.isPro && (
                <div className="flex items-center text-sm text-purple-600">
                  <Star className="h-4 w-4 mr-1" />
                  Pro Filters
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'tracker' && !user.isPro ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="h-12 w-12 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Tracker</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            This feature is available for Pro users only. Track your application status, get deadline reminders, and manage your job applications efficiently.
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200">
            Upgrade to Pro - ₹99/month
          </button>
        </div>
      ) : activeTab === 'tracker' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
                <div className="text-sm text-blue-800">Total Applications</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-600">
                  {applications.filter(app => app.status === 'under_review').length}
                </div>
                <div className="text-sm text-yellow-800">Under Review</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {applications.filter(app => app.status === 'interview_scheduled').length}
                </div>
                <div className="text-sm text-purple-800">Interviews</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.status === 'accepted').length}
                </div>
                <div className="text-sm text-green-800">Accepted</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {applications.map((application) => {
              const internship = internships.find(emp => emp.id === application.internshipId);
              if (!internship) return null;

              return (
                <div key={application.id} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{internship.title}</h4>
                      <p className="text-gray-600">{internship.company}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                      {application.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Applied Date</p>
                      <p className="font-medium">{application.appliedDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Deadline</p>
                      <p className="font-medium">{internship.applicationDeadline.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Documents</p>
                      <p className="font-medium">{application.documents.length} files</p>
                    </div>
                  </div>

                  {application.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Notes</p>
                      <p className="text-gray-700">{application.notes}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Found <span className="font-semibold text-purple-600">
                {activeTab === 'applied' ? applications.length : filteredInternships.length}
              </span> {activeTab === 'applied' ? 'applications' : 'internships'}
            </p>
          </div>

          {/* Internships Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {(activeTab === 'applied' ? 
              applications.map(app => internships.find(emp => emp.id === app.internshipId)).filter(Boolean) : 
              filteredInternships
            ).map((internship) => {
              if (!internship) return null;
              const applicationStatus = getApplicationStatus(internship.id);
              
              return (
                <div key={internship.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {internship.title}
                          </h3>
                          <p className="text-lg text-purple-600 font-medium">{internship.company}</p>
                          {applicationStatus !== 'not_applied' && (
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(applicationStatus)}`}>
                              {applicationStatus.replace('_', ' ').toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(internship.type)}`}>
                        {internship.type}
                      </span>
                    </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{internship.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span className="font-semibold text-emerald-600">{internship.stipend}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Apply by {internship.applicationDeadline.toLocaleDateString()}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {internship.description}
              </p>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {internship.requirements.map((req, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Posted {formatDistanceToNow(internship.postedDate, { addSuffix: true })}
                </p>
                <div className="space-x-3">
                  <button className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                    <ExternalLink className="h-4 w-4 inline mr-1" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleApply(internship.id)}
                    disabled={appliedInternships.has(internship.id)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                      appliedInternships.has(internship.id)
                        ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white'
                    }`}
                  >
                    {appliedInternships.has(internship.id) ? 'Applied ✓' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>

          {((activeTab === 'applied' && applications.length === 0) || 
            (activeTab === 'all' && filteredInternships.length === 0)) && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {activeTab === 'applied' ? 'No applications found' : 'No internships found'}
              </h3>
              <p className="text-gray-600">
                {activeTab === 'applied' 
                  ? 'You haven\'t applied to any internships yet. Browse opportunities above!' 
                  : 'Try adjusting your search terms or filters'
                }
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Internships;