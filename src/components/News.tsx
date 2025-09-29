import React, { useState } from 'react';
import { Calendar, User as UserIcon, Tag, ExternalLink, Clock } from 'lucide-react';
import { User, NewsItem } from '../types';
import { formatDistanceToNow, format } from 'date-fns';

interface NewsProps {
  user: User;
}

const News: React.FC<NewsProps> = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newsItems] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Stanford Launches New AI Ethics Research Initiative',
      summary: 'University announces $10M investment in artificial intelligence ethics research, focusing on responsible AI development and implementation across industries.',
      content: 'Stanford University today announced the launch of a groundbreaking $10 million AI Ethics Research Initiative...',
      category: 'academic',
      publishedDate: new Date('2024-01-15T09:00:00'),
      author: 'Stanford News Team',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Annual Tech Career Fair Registration Now Open',
      summary: 'Don\'t miss the biggest tech career fair of the year! Over 150 companies including Google, Microsoft, and Apple will be participating.',
      content: 'Registration for the Annual Tech Career Fair is now open to all students...',
      category: 'events',
      publishedDate: new Date('2024-01-14T16:30:00'),
      author: 'Career Services',
      image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Student Team Wins International Robotics Competition',
      summary: 'Stanford robotics team takes first place at the World University Robotics Championship, showcasing innovative autonomous navigation system.',
      content: 'A team of Stanford engineering students has achieved first place at the prestigious World University Robotics Championship...',
      category: 'achievements',
      publishedDate: new Date('2024-01-13T14:20:00'),
      author: 'Engineering Department',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      title: 'New Scholarship Program for Underrepresented Students in STEM',
      summary: 'University announces new $5M scholarship program aimed at supporting underrepresented students pursuing degrees in STEM fields.',
      content: 'In a major step toward increasing diversity in STEM fields, the university has announced...',
      category: 'academic',
      publishedDate: new Date('2024-01-12T11:45:00'),
      author: 'Admissions Office',
      image: 'https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '5',
      title: 'Campus Sustainability Initiative Reaches Major Milestone',
      summary: 'University achieves 50% reduction in carbon emissions ahead of 2025 target, leading the way in sustainable campus operations.',
      content: 'The university\'s comprehensive sustainability initiative has reached a significant milestone...',
      category: 'general',
      publishedDate: new Date('2024-01-11T13:15:00'),
      author: 'Sustainability Office'
    },
    {
      id: '6',
      title: 'International Exchange Program Expands to 20 New Universities',
      summary: 'Students now have access to exchange opportunities at 20 additional partner universities across Europe, Asia, and South America.',
      content: 'The International Programs Office is excited to announce the expansion of our student exchange program...',
      category: 'academic',
      publishedDate: new Date('2024-01-10T10:30:00'),
      author: 'International Programs'
    }
  ]);

  const categories = [
    { value: 'all', label: 'All News', count: newsItems.length },
    { value: 'academic', label: 'Academic', count: newsItems.filter(n => n.category === 'academic').length },
    { value: 'events', label: 'Events', count: newsItems.filter(n => n.category === 'events').length },
    { value: 'achievements', label: 'Achievements', count: newsItems.filter(n => n.category === 'achievements').length },
    { value: 'general', label: 'General', count: newsItems.filter(n => n.category === 'general').length }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-purple-100 text-purple-800';
      case 'events': return 'bg-emerald-100 text-emerald-800';
      case 'achievements': return 'bg-orange-100 text-orange-800';
      case 'general': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">College News</h1>
        <p className="text-gray-600">Stay updated with the latest news and announcements from your university</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-4">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-r from-purple-100 to-emerald-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{category.label}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    selectedCategory === category.value
                      ? 'bg-purple-200 text-purple-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="space-y-6">
            {filteredNews.map((news) => (
              <article key={news.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                {news.image && (
                  <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(news.category)}`}>
                      <Tag className="h-3 w-3 inline mr-1" />
                      {news.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDistanceToNow(news.publishedDate, { addSuffix: true })}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                    {news.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {news.summary}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-600">
                        <UserIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm">{news.author}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{format(news.publishedDate, 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                    
                    <button className="flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Read more
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No news found</h3>
              <p className="text-gray-600">No articles in this category yet. Check back later for updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;