import { SearchResult } from '../types';
import { db } from '../lib/supabase';

// Convert user profile to search result
const userToSearchResult = (user: any): SearchResult => ({
  id: user.id,
  type: 'student',
  title: user.name,
  description: user.bio || `${user.course} student at ${user.college}`,
  location: user.college,
  image: user.avatar_url,
  tags: [user.course, user.course_level, user.college, ...(user.skills || [])],
  verified: true,
  followers: 0, // Could be fetched from connections count
  skills: user.skills || []
});

export const searchService = {
  search: async (query: string, currentUserId: string): Promise<SearchResult[]> => {
    if (!query.trim()) return [];
    
    try {
      // Search for users in the database
      const users = await db.searchUsers(query, currentUserId, 20);
      
      // Convert users to search results
      const userResults = users.map(userToSearchResult);
      
      // Calculate relevance scores
      const lowercaseQuery = query.toLowerCase();
      const queryWords = lowercaseQuery.split(/\s+/).filter(word => word.length > 0);
      
      return userResults.map(item => {
        let relevanceScore = 0;
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        const tags = item.tags.map(tag => tag.toLowerCase());
        const location = item.location?.toLowerCase() || '';
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
        
        return { ...item, relevanceScore };
      })
      .filter(item => item.relevanceScore > 0)
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      .map(({ relevanceScore, ...item }) => item); // Remove relevanceScore from final result
    } catch (error) {
      console.error('Error searching:', error);
      return [];
    }
  },

  getByType: async (type: SearchResult['type'], currentUserId: string): Promise<SearchResult[]> => {
    // For now, only support student type
    if (type === 'student') {
      try {
        const users = await db.getRecommendedUsers(currentUserId, 20);
        return users.map(userToSearchResult);
      } catch (error) {
        console.error('Error fetching by type:', error);
        return [];
      }
    }
    return [];
  },

  getFeatured: async (currentUserId: string): Promise<SearchResult[]> => {
    try {
      // Get recommended users as featured
      const users = await db.getRecommendedUsers(currentUserId, 10);
      return users.map(userToSearchResult);
    } catch (error) {
      console.error('Error fetching featured:', error);
      return [];
    }
  }
};
