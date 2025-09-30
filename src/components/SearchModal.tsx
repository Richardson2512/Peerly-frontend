import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Calendar, Users, Building, Code, GraduationCap, Star, CheckCircle } from 'lucide-react';
import { SearchResult } from '../types';
import { searchService } from '../services/searchService';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'event', label: 'Events', icon: Calendar },
    { id: 'college', label: 'Colleges', icon: GraduationCap },
    { id: 'student', label: 'Students', icon: Users },
    { id: 'hackathon', label: 'Hackathons', icon: Code },
    { id: 'company', label: 'Companies', icon: Building },
    { id: 'recruiter', label: 'Recruiters', icon: Users }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      const filteredResults = selectedCategory === 'all' 
        ? searchService.search(query)
        : searchService.search(query).filter(result => result.type === selectedCategory);
      
      setTimeout(() => {
        setResults(filteredResults);
        setIsLoading(false);
      }, 300);
    } else {
      setResults([]);
    }
  }, [query, selectedCategory]);

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'event': return Calendar;
      case 'college': return GraduationCap;
      case 'student': return Users;
      case 'hackathon': return Code;
      case 'company': return Building;
      case 'recruiter': return Users;
      default: return Search;
    }
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'event': return 'bg-blue-100 text-blue-600';
      case 'college': return 'bg-green-100 text-green-600';
      case 'student': return 'bg-purple-100 text-purple-600';
      case 'hackathon': return 'bg-orange-100 text-orange-600';
      case 'company': return 'bg-indigo-100 text-indigo-600';
      case 'recruiter': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-start justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Search Peerly</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Search Input */}
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for events, colleges, students, hackathons, companies, recruiters..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Category Filters */}
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <span className="ml-3 text-gray-600">Searching...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {results.map((result) => {
                  const TypeIcon = getTypeIcon(result.type);
                  return (
                    <div key={result.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start space-x-4">
                        {/* Avatar/Image */}
                        <div className="flex-shrink-0">
                          {result.image ? (
                            <img
                              src={result.image}
                              alt={result.title}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(result.type)}`}>
                              <TypeIcon className="h-6 w-6" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-lg font-semibold text-gray-900 truncate">
                              {result.title}
                            </h4>
                            {result.verified && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                              {result.type}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {result.description}
                          </p>

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {result.location && (
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{result.location}</span>
                              </div>
                            )}
                            {result.date && (
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(result.date)}</span>
                              </div>
                            )}
                            {result.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span>{result.rating}</span>
                              </div>
                            )}
                            {result.followers && (
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{result.followers.toLocaleString()} followers</span>
                              </div>
                            )}
                          </div>

                          {/* Tags */}
                          <div className="mt-2 flex flex-wrap gap-1">
                            {result.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {result.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{result.tags.length - 3} more
                              </span>
                            )}
                          </div>

                          {/* Skills (for students and recruiters) */}
                          {result.skills && result.skills.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs text-gray-500 mb-1">Skills:</div>
                              <div className="flex flex-wrap gap-1">
                                {result.skills.slice(0, 4).map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {result.skills.length > 4 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    +{result.skills.length - 4} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : query.trim() ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try searching with different keywords or check your spelling.
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start searching</h3>
                <p className="text-gray-600">
                  Search for events, colleges, students, hackathons, companies, or recruiters.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                {results.length > 0 ? `${results.length} result${results.length === 1 ? '' : 's'} found` : 'Enter a search term to get started'}
              </span>
              <div className="flex items-center space-x-4">
                <span>Press Esc to close</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
