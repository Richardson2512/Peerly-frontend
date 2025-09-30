import { Advertisement, UserAdInteraction, AdRecommendation } from '../types';

class RecommendationService {
  private interactions: UserAdInteraction[] = [];

  // Track user interactions with ads
  trackInteraction(interaction: UserAdInteraction) {
    this.interactions.push(interaction);
    console.log('Tracking interaction:', interaction);
    
    // Here you would typically send this to your backend
    // For now, we'll store it locally and log it
    this.updateUserPreferences(interaction);
  }

  // Update user preferences based on interactions
  private updateUserPreferences(interaction: UserAdInteraction) {
    const userId = interaction.userId;
    const userInteractions = this.interactions.filter(i => i.userId === userId);
    
    // Analyze user preferences
    const preferences = this.analyzePreferences(userInteractions);
    console.log('Updated user preferences:', preferences);
  }

  // Analyze user preferences from interactions
  private analyzePreferences(interactions: UserAdInteraction[]) {
    const preferences = {
      likedCategories: new Map<string, number>(),
      dislikedCategories: new Map<string, number>(),
      likedCompanies: new Map<string, number>(),
      dislikedCompanies: new Map<string, number>(),
      preferredAdTypes: new Map<string, number>(),
      totalInteractions: interactions.length
    };

    interactions.forEach(interaction => {
      // This would typically fetch ad details from backend
      // For demo purposes, we'll simulate the analysis
      if (interaction.action === 'swipe_right') {
        // User liked this ad
        preferences.likedCategories.set('tech', (preferences.likedCategories.get('tech') || 0) + 1);
        preferences.preferredAdTypes.set('event', (preferences.preferredAdTypes.get('event') || 0) + 1);
      } else if (interaction.action === 'swipe_left') {
        // User disliked this ad
        preferences.dislikedCategories.set('finance', (preferences.dislikedCategories.get('finance') || 0) + 1);
      }
    });

    return preferences;
  }

  // Get personalized ad recommendations
  getRecommendations(userId: string, availableAds: Advertisement[]): AdRecommendation[] {
    const userInteractions = this.interactions.filter(i => i.userId === userId);
    const preferences = this.analyzePreferences(userInteractions);
    
    return availableAds.map(ad => {
      let score = 0;
      let reason = '';

      // Score based on user preferences
      if (preferences.likedCategories.has(ad.category[0])) {
        score += 20;
        reason += `Matches your interest in ${ad.category[0]}. `;
      }

      if (preferences.preferredAdTypes.has(ad.type)) {
        score += 15;
        reason += `You like ${ad.type} ads. `;
      }

      // Boost score for new companies (diversity)
      if (!preferences.likedCompanies.has(ad.company)) {
        score += 5;
        reason += 'New company for you to explore. ';
      }

      // Random factor for discovery
      score += Math.random() * 10;

      return {
        adId: ad.id,
        score: Math.min(score, 100), // Cap at 100
        reason: reason || 'Recommended for you'
      };
    }).sort((a, b) => b.score - a.score);
  }

  // Get user interaction analytics
  getUserAnalytics(userId: string) {
    const userInteractions = this.interactions.filter(i => i.userId === userId);
    
    return {
      totalAdsSeen: userInteractions.length,
      likedAds: userInteractions.filter(i => i.action === 'swipe_right').length,
      dislikedAds: userInteractions.filter(i => i.action === 'swipe_left').length,
      clickThroughRate: userInteractions.filter(i => i.action === 'click').length / userInteractions.length,
      mostLikedCategory: this.getMostLikedCategory(userInteractions),
      interactionHistory: userInteractions.slice(-10) // Last 10 interactions
    };
  }

  private getMostLikedCategory(interactions: UserAdInteraction[]): string {
    // This would typically analyze the actual ad categories
    // For demo purposes, return a mock category
    return 'Technology';
  }

  // Clear all interactions (for testing)
  clearInteractions() {
    this.interactions = [];
  }
}

export const recommendationService = new RecommendationService();
