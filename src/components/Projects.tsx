import React, { useState } from 'react';
import { FolderOpen, Plus, Search, Filter, Users, Github, ExternalLink, Star, Eye, Crown, Code, Palette, Database } from 'lucide-react';
import { User, Project } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ProjectsProps {
  user: User;
}

const Projects: React.FC<ProjectsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'my' | 'collaborating'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'AI-Powered Study Buddy',
      description: 'An intelligent study companion that helps students create personalized study plans and tracks learning progress using machine learning algorithms.',
      ownerId: '1',
      collaborators: ['2', '3'],
      technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'MongoDB'],
      githubUrl: 'https://github.com/example/study-buddy',
      demoUrl: 'https://study-buddy-demo.com',
      isPublic: true,
      createdAt: new Date('2024-01-15T10:30:00'),
      updatedAt: new Date('2024-01-20T14:45:00')
    },
    {
      id: '2',
      title: 'Campus Event Management System',
      description: 'A comprehensive platform for managing college events, registrations, and attendee tracking with real-time notifications.',
      ownerId: '2',
      collaborators: ['1', '4'],
      technologies: ['React Native', 'Express.js', 'PostgreSQL', 'Socket.io'],
      githubUrl: 'https://github.com/example/event-management',
      demoUrl: 'https://campus-events-demo.com',
      isPublic: true,
      createdAt: new Date('2024-01-10T09:15:00'),
      updatedAt: new Date('2024-01-18T16:20:00')
    },
    {
      id: '3',
      title: 'Smart Attendance Tracker',
      description: 'IoT-based attendance system using facial recognition and RFID technology for automated attendance management.',
      ownerId: '3',
      collaborators: ['1', '5'],
      technologies: ['Python', 'OpenCV', 'Arduino', 'Firebase', 'React'],
      githubUrl: 'https://github.com/example/attendance-tracker',
      demoUrl: 'https://smart-attendance-demo.com',
      isPublic: false,
      createdAt: new Date('2024-01-05T14:00:00'),
      updatedAt: new Date('2024-01-12T11:30:00')
    },
    {
      id: '4',
      title: 'Peerly Learning Analytics Dashboard',
      description: 'Advanced analytics dashboard for tracking learning progress, performance metrics, and personalized recommendations.',
      ownerId: '1',
      collaborators: ['6'],
      technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'Redis'],
      githubUrl: 'https://github.com/example/learning-analytics',
      demoUrl: 'https://analytics-demo.com',
      isPublic: true,
      createdAt: new Date('2023-12-20T08:45:00'),
      updatedAt: new Date('2024-01-08T13:15:00')
    }
  ]);

  const [collaboratingProjects, setCollaboratingProjects] = useState<string[]>(['2', '3']);

  const technologies = ['all', 'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB', 'PostgreSQL', 'TensorFlow', 'OpenCV', 'Arduino'];

  const getUserName = (userId: string) => {
    const names: { [key: string]: string } = {
      '1': user.name,
      '2': 'Sarah Chen',
      '3': 'Alex Rodriguez',
      '4': 'Emily Davis',
      '5': 'David Wilson',
      '6': 'Lisa Zhang'
    };
    return names[userId] || 'Unknown User';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getTechIcon = (tech: string) => {
    switch (tech.toLowerCase()) {
      case 'react':
      case 'javascript':
      case 'typescript':
        return Code;
      case 'python':
      case 'tensorflow':
        return Database;
      case 'node.js':
      case 'express.js':
        return Code;
      case 'mongodb':
      case 'postgresql':
      case 'redis':
        return Database;
      default:
        return Palette;
    }
  };

  const handleCreateProject = () => {
    if (!user.isPro) {
      alert('Creating projects is available for Pro users only. Upgrade to Peerly Pro to start collaborating on projects.');
      return;
    }
    setShowCreateModal(true);
  };

  const handleJoinProject = (projectId: string) => {
    if (!user.isPro) {
      alert('Project collaboration is available for Pro users only. Upgrade to Peerly Pro to join projects.');
      return;
    }
    
    setCollaboratingProjects([...collaboratingProjects, projectId]);
    setProjects(projects.map(p => 
      p.id === projectId 
        ? { ...p, collaborators: [...p.collaborators, user.id] }
        : p
    ));
  };

  const filteredProjects = () => {
    let projectList = projects;

    switch (activeTab) {
      case 'my':
        projectList = projects.filter(p => p.ownerId === user.id);
        break;
      case 'collaborating':
        projectList = projects.filter(p => collaboratingProjects.includes(p.id));
        break;
    }

    return projectList.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTech = selectedTech === 'all' || project.technologies.includes(selectedTech);
      
      return matchesSearch && matchesTech;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Collaboration Workspace</h1>
          <p className="text-gray-600">Build and showcase projects collaboratively with peers and mentors</p>
        </div>
        <button
          onClick={handleCreateProject}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </button>
      </div>

      {/* Pro Feature Notice */}
      {!user.isPro && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-6">
          <div className="flex items-center">
            <Crown className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">Pro Feature</h3>
              <p className="text-yellow-700">
                Project collaboration workspace is available for Pro users. Create projects, invite collaborators, and showcase your work.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'all', label: 'All Projects', count: projects.length },
            { id: 'my', label: 'My Projects', count: projects.filter(p => p.ownerId === user.id).length },
            { id: 'collaborating', label: 'Collaborating', count: collaboratingProjects.length }
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
            placeholder="Search projects, technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <select
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          {technologies.map(tech => (
            <option key={tech} value={tech}>
              {tech === 'all' ? 'All Technologies' : tech}
            </option>
          ))}
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects().map((project) => {
          const isOwner = project.ownerId === user.id;
          const isCollaborating = collaboratingProjects.includes(project.id);
          const TechIcon = getTechIcon(project.technologies[0]);
          
          return (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white">
                  <TechIcon className="h-6 w-6" />
                </div>
                <div className="flex items-center space-x-2">
                  {!project.isPublic && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                      Private
                    </span>
                  )}
                  {isOwner && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Owner
                    </span>
                  )}
                  {isCollaborating && !isOwner && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Collaborating
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>
              
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Technologies</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Collaborators</p>
                <div className="flex items-center space-x-2">
                  {project.collaborators.slice(0, 3).map((collaboratorId, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                      title={getUserName(collaboratorId)}
                    >
                      {getInitials(getUserName(collaboratorId))}
                    </div>
                  ))}
                  {project.collaborators.length > 3 && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-semibold">
                      +{project.collaborators.length - 3}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Created {formatDistanceToNow(project.createdAt, { addSuffix: true })}</span>
                <span>Updated {formatDistanceToNow(project.updatedAt, { addSuffix: true })}</span>
              </div>
              
              <div className="flex gap-2">
                {project.githubUrl && (
                  <button
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </button>
                )}
                {project.demoUrl && (
                  <button
                    onClick={() => window.open(project.demoUrl, '_blank')}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Demo
                  </button>
                )}
                {!isOwner && !isCollaborating && user.isPro && (
                  <button
                    onClick={() => handleJoinProject(project.id)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg transition-colors text-sm"
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects().length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search criteria or create a new project</p>
          {user.isPro && (
            <button
              onClick={handleCreateProject}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Create Your First Project
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
