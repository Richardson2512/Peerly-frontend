import { SearchResult } from '../types';

// Hardcoded search data
const searchData: SearchResult[] = [
  // Events
  {
    id: 'event-1',
    type: 'event',
    title: 'Tech Career Fair 2024',
    description: 'Connect with top tech companies and discover internship opportunities',
    location: 'IIT Delhi, New Delhi',
    date: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    tags: ['career', 'tech', 'networking', 'internships'],
    verified: true,
    rating: 4.8
  },
  {
    id: 'event-2',
    type: 'event',
    title: 'Startup Pitch Competition',
    description: 'Present your innovative ideas to investors and industry experts',
    location: 'IIM Bangalore, Bangalore',
    date: '2024-03-22',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
    tags: ['startup', 'pitch', 'entrepreneurship', 'funding'],
    verified: true,
    rating: 4.6
  },
  {
    id: 'event-3',
    type: 'event',
    title: 'AI & Machine Learning Workshop',
    description: 'Hands-on workshop on cutting-edge AI technologies',
    location: 'NIT Trichy, Trichy',
    date: '2024-03-28',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
    tags: ['AI', 'ML', 'workshop', 'technology'],
    verified: true,
    rating: 4.9
  },
  {
    id: 'event-4',
    type: 'event',
    title: 'Finance & Investment Summit',
    description: 'Learn about investment strategies and financial planning',
    location: 'IIM Ahmedabad, Ahmedabad',
    date: '2024-04-05',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    tags: ['finance', 'investment', 'banking', 'economics'],
    verified: true,
    rating: 4.7
  },
  {
    id: 'event-5',
    type: 'event',
    title: 'Design Thinking Workshop',
    description: 'Master the art of design thinking and user experience',
    location: 'NID Ahmedabad, Ahmedabad',
    date: '2024-04-12',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    tags: ['design', 'UX', 'creativity', 'innovation'],
    verified: true,
    rating: 4.5
  },

  // Colleges
  {
    id: 'college-1',
    type: 'college',
    title: 'Indian Institute of Technology Delhi',
    description: 'Premier engineering institute offering world-class education in technology. Also known as IIT Delhi.',
    location: 'New Delhi, India',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
    tags: ['engineering', 'technology', 'IIT', 'IIT Delhi', 'premier', 'Delhi'],
    verified: true,
    rating: 4.9,
    followers: 125000
  },
  {
    id: 'college-2',
    type: 'college',
    title: 'Indian Institute of Management Bangalore',
    description: 'Top business school known for excellence in management education',
    location: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
    tags: ['management', 'MBA', 'business', 'IIM'],
    verified: true,
    rating: 4.8,
    followers: 98000
  },
  {
    id: 'college-3',
    type: 'college',
    title: 'National Institute of Technology Trichy',
    description: 'Leading technical institute with strong industry connections',
    location: 'Trichy, India',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
    tags: ['engineering', 'NIT', 'technical', 'industry'],
    verified: true,
    rating: 4.7,
    followers: 75000
  },
  {
    id: 'college-4',
    type: 'college',
    title: 'Delhi University',
    description: 'One of India\'s largest and most prestigious universities',
    location: 'New Delhi, India',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    tags: ['university', 'arts', 'science', 'commerce'],
    verified: true,
    rating: 4.6,
    followers: 200000
  },
  {
    id: 'college-5',
    type: 'college',
    title: 'BITS Pilani',
    description: 'Private technical university known for innovation and research',
    location: 'Pilani, India',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
    tags: ['private', 'engineering', 'innovation', 'research'],
    verified: true,
    rating: 4.8,
    followers: 85000
  },

  // Students
  {
    id: 'student-1',
    type: 'student',
    title: 'Priya Sharma',
    description: 'Computer Science student at IIT Delhi, passionate about AI and machine learning',
    location: 'New Delhi, India',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    tags: ['AI', 'ML', 'computer science', 'research'],
    verified: true,
    followers: 2500,
    skills: ['Python', 'TensorFlow', 'React', 'Node.js']
  },
  {
    id: 'student-2',
    type: 'student',
    title: 'Arjun Patel',
    description: 'MBA student at IIM Bangalore, specializing in finance and entrepreneurship',
    location: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    tags: ['MBA', 'finance', 'entrepreneurship', 'leadership'],
    verified: true,
    followers: 3200,
    skills: ['Financial Modeling', 'Strategy', 'Leadership', 'Analytics']
  },
  {
    id: 'student-3',
    type: 'student',
    title: 'Sneha Reddy',
    description: 'Mechanical Engineering student at NIT Trichy, interested in robotics and automation',
    location: 'Trichy, India',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    tags: ['robotics', 'automation', 'mechanical', 'innovation'],
    verified: true,
    followers: 1800,
    skills: ['CAD', 'SolidWorks', 'Arduino', 'Python']
  },
  {
    id: 'student-4',
    type: 'student',
    title: 'Rahul Kumar',
    description: 'Data Science student at Delhi University, expert in big data and analytics',
    location: 'New Delhi, India',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    tags: ['data science', 'analytics', 'big data', 'statistics'],
    verified: true,
    followers: 4100,
    skills: ['R', 'Python', 'SQL', 'Tableau']
  },
  {
    id: 'student-5',
    type: 'student',
    title: 'Ananya Singh',
    description: 'Design student at NID Ahmedabad, specializing in UX/UI design and branding',
    location: 'Ahmedabad, India',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    tags: ['design', 'UX', 'UI', 'branding'],
    verified: true,
    followers: 2900,
    skills: ['Figma', 'Adobe Creative Suite', 'Sketch', 'Prototyping']
  },

  // Hackathons
  {
    id: 'hackathon-1',
    type: 'hackathon',
    title: 'CodeFest 2024',
    description: '48-hour coding competition with prizes worth ₹5 Lakhs',
    location: 'IIT Bombay, Mumbai',
    date: '2024-03-20',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
    tags: ['coding', 'competition', 'prizes', 'innovation'],
    verified: true,
    rating: 4.8
  },
  {
    id: 'hackathon-2',
    type: 'hackathon',
    title: 'FinTech Innovation Challenge',
    description: 'Build innovative solutions for the financial technology sector',
    location: 'IIM Calcutta, Kolkata',
    date: '2024-03-25',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    tags: ['fintech', 'innovation', 'banking', 'startup'],
    verified: true,
    rating: 4.7
  },
  {
    id: 'hackathon-3',
    type: 'hackathon',
    title: 'AI for Social Good',
    description: 'Develop AI solutions to address social challenges',
    location: 'NIT Warangal, Warangal',
    date: '2024-04-01',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
    tags: ['AI', 'social impact', 'machine learning', 'sustainability'],
    verified: true,
    rating: 4.9
  },
  {
    id: 'hackathon-4',
    type: 'hackathon',
    title: 'Blockchain Buildathon',
    description: 'Create decentralized applications using blockchain technology',
    location: 'BITS Pilani, Goa',
    date: '2024-04-08',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
    tags: ['blockchain', 'cryptocurrency', 'DeFi', 'Web3'],
    verified: true,
    rating: 4.6
  },
  {
    id: 'hackathon-5',
    type: 'hackathon',
    title: 'HealthTech Innovation',
    description: 'Build solutions to improve healthcare accessibility and efficiency',
    location: 'AIIMS Delhi, New Delhi',
    date: '2024-04-15',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
    tags: ['healthcare', 'technology', 'innovation', 'medical'],
    verified: true,
    rating: 4.8
  },

  // Companies
  {
    id: 'company-1',
    type: 'company',
    title: 'Google India',
    description: 'Leading technology company offering internships and full-time positions',
    location: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
    tags: ['tech', 'internships', 'software', 'innovation'],
    verified: true,
    rating: 4.9,
    followers: 500000
  },
  {
    id: 'company-2',
    type: 'company',
    title: 'Microsoft India',
    description: 'Global technology company with opportunities in cloud computing and AI',
    location: 'Hyderabad, India',
    image: 'https://images.unsplash.com/photo-1633417533259-7b0b0b0b0b0b?w=400',
    tags: ['cloud', 'AI', 'software', 'enterprise'],
    verified: true,
    rating: 4.8,
    followers: 450000
  },
  {
    id: 'company-3',
    type: 'company',
    title: 'TCS (Tata Consultancy Services)',
    description: 'Leading IT services and consulting company with global presence',
    location: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
    tags: ['IT services', 'consulting', 'enterprise', 'global'],
    verified: true,
    rating: 4.6,
    followers: 300000
  },
  {
    id: 'company-4',
    type: 'company',
    title: 'Flipkart',
    description: 'India\'s leading e-commerce platform with exciting career opportunities',
    location: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    tags: ['e-commerce', 'startup', 'retail', 'technology'],
    verified: true,
    rating: 4.7,
    followers: 200000
  },
  {
    id: 'company-5',
    type: 'company',
    title: 'Infosys',
    description: 'Global leader in next-generation digital services and consulting',
    location: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
    tags: ['digital services', 'consulting', 'technology', 'innovation'],
    verified: true,
    rating: 4.5,
    followers: 250000
  },

  // Recruiters
  {
    id: 'recruiter-1',
    type: 'recruiter',
    title: 'Sarah Johnson',
    description: 'Senior Talent Acquisition Manager at Google India',
    company: 'Google India',
    position: 'Senior Talent Acquisition Manager',
    experience: '8 years',
    location: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    tags: ['tech recruitment', 'Google', 'talent acquisition', 'hiring'],
    verified: true,
    followers: 15000,
    skills: ['Technical Recruitment', 'Campus Hiring', 'Leadership', 'HR']
  },
  {
    id: 'recruiter-2',
    type: 'recruiter',
    title: 'Rajesh Kumar',
    description: 'Campus Relations Manager at Microsoft India',
    company: 'Microsoft India',
    position: 'Campus Relations Manager',
    experience: '6 years',
    location: 'Hyderabad, India',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    tags: ['campus relations', 'Microsoft', 'recruitment', 'university'],
    verified: true,
    followers: 12000,
    skills: ['Campus Relations', 'University Partnerships', 'Recruitment', 'Networking']
  },
  {
    id: 'recruiter-3',
    type: 'recruiter',
    title: 'Priya Mehta',
    description: 'Head of Talent Acquisition at Flipkart',
    company: 'Flipkart',
    position: 'Head of Talent Acquisition',
    experience: '10 years',
    location: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    tags: ['talent acquisition', 'Flipkart', 'leadership', 'hiring'],
    verified: true,
    followers: 18000,
    skills: ['Strategic Hiring', 'Leadership', 'Talent Management', 'HR Strategy']
  },
  {
    id: 'recruiter-4',
    type: 'recruiter',
    title: 'Amit Singh',
    description: 'Technical Recruiter at Amazon India',
    company: 'Amazon India',
    position: 'Technical Recruiter',
    experience: '5 years',
    location: 'Bangalore, India',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    tags: ['technical recruitment', 'Amazon', 'engineering', 'hiring'],
    verified: true,
    followers: 14000,
    skills: ['Technical Recruitment', 'Engineering Hiring', 'Sourcing', 'Interviewing']
  },
  {
    id: 'recruiter-5',
    type: 'recruiter',
    title: 'Neha Sharma',
    description: 'Campus Recruitment Lead at TCS',
    company: 'TCS',
    position: 'Campus Recruitment Lead',
    experience: '7 years',
    location: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    tags: ['campus recruitment', 'TCS', 'mass hiring', 'university'],
    verified: true,
    followers: 16000,
    skills: ['Campus Recruitment', 'Mass Hiring', 'University Relations', 'HR Operations']
  }
];

export const searchService = {
  search: (query: string): SearchResult[] => {
    if (!query.trim()) return [];
    
    const lowercaseQuery = query.toLowerCase();
    const queryWords = lowercaseQuery.split(/\s+/).filter(word => word.length > 0);
    
    return searchData.map(item => {
      let relevanceScore = 0;
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();
      const tags = item.tags.map(tag => tag.toLowerCase());
      const location = item.location?.toLowerCase() || '';
      const company = item.company?.toLowerCase() || '';
      const skills = item.skills?.map(skill => skill.toLowerCase()) || [];
      
      // Exact title match (highest priority)
      if (title === lowercaseQuery) {
        relevanceScore += 1000;
      }
      // Title starts with query
      else if (title.startsWith(lowercaseQuery)) {
        relevanceScore += 800;
      }
      // Title contains query
      else if (title.includes(lowercaseQuery)) {
        relevanceScore += 600;
      }
      
      // Word-by-word matching in title
      queryWords.forEach(word => {
        if (title.includes(word)) {
          relevanceScore += 200;
        }
      });
      
      // Abbreviation matching (high priority)
      if (lowercaseQuery.includes('iit') && title.includes('indian institute of technology')) {
        relevanceScore += 500;
      }
      if (lowercaseQuery.includes('iim') && title.includes('indian institute of management')) {
        relevanceScore += 500;
      }
      if (lowercaseQuery.includes('nit') && title.includes('national institute of technology')) {
        relevanceScore += 500;
      }
      if (lowercaseQuery.includes('bits') && title.includes('birla institute of technology')) {
        relevanceScore += 500;
      }
      
      // Description matches
      if (description.includes(lowercaseQuery)) {
        relevanceScore += 100;
      }
      queryWords.forEach(word => {
        if (description.includes(word)) {
          relevanceScore += 50;
        }
      });
      
      // Tag matches
      tags.forEach(tag => {
        if (tag === lowercaseQuery) {
          relevanceScore += 150;
        } else if (tag.includes(lowercaseQuery)) {
          relevanceScore += 100;
        }
        queryWords.forEach(word => {
          if (tag.includes(word)) {
            relevanceScore += 30;
          }
        });
      });
      
      // Location matches
      if (location.includes(lowercaseQuery)) {
        relevanceScore += 80;
      }
      queryWords.forEach(word => {
        if (location.includes(word)) {
          relevanceScore += 40;
        }
      });
      
      // Company matches
      if (company.includes(lowercaseQuery)) {
        relevanceScore += 80;
      }
      queryWords.forEach(word => {
        if (company.includes(word)) {
          relevanceScore += 40;
        }
      });
      
      // Skills matches
      skills.forEach(skill => {
        if (skill === lowercaseQuery) {
          relevanceScore += 60;
        } else if (skill.includes(lowercaseQuery)) {
          relevanceScore += 40;
        }
        queryWords.forEach(word => {
          if (skill.includes(word)) {
            relevanceScore += 20;
          }
        });
      });
      
      // Boost verified items
      if (item.verified) {
        relevanceScore += 50;
      }
      
      // Boost high-rated items
      if (item.rating && item.rating >= 4.5) {
        relevanceScore += 30;
      }
      
      return { ...item, relevanceScore };
    })
    .filter(item => item.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .map(({ relevanceScore, ...item }) => item); // Remove relevanceScore from final result
  },

  getByType: (type: SearchResult['type']): SearchResult[] => {
    return searchData.filter(item => item.type === type);
  },

  getFeatured: (): SearchResult[] => {
    return searchData.filter(item => item.verified && item.rating && item.rating >= 4.7);
  }
};
