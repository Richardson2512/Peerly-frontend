import React, { useState, useRef } from 'react';
import { Advertisement as AdType, UserAdInteraction } from '../types';
import { 
  X, 
  Heart, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface FlyerAdsProps {
  user: {
    id: string;
    skills: string[];
    interests: string[];
    college: string;
    course: string;
  };
  onInteraction: (interaction: UserAdInteraction) => void;
}

const FlyerAds: React.FC<FlyerAdsProps> = ({ user, onInteraction }) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  // Sample flyer advertisements (events, courses, jobs)
  const flyerAds: AdType[] = [
    {
      id: 'flyer-1',
      title: 'Tech Career Fair 2024',
      description: 'Connect with top tech companies including Google, Microsoft, and Amazon. Explore internship opportunities and network with industry professionals.',
      type: 'event',
      mediaUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop',
      mediaType: 'image',
      company: 'University Career Services',
      category: ['career', 'tech', 'networking'],
      targetAudience: ['computer science', 'engineering', 'business'],
      ctaText: 'Register Now',
      ctaUrl: '#',
      isActive: true,
      priority: 1,
      createdAt: new Date('2024-01-15'),
      expiresAt: new Date('2024-02-15')
    },
    {
      id: 'flyer-2',
      title: 'AI/ML Workshop Series',
      description: 'Learn cutting-edge machine learning techniques from industry experts. Hands-on projects and certification included.',
      type: 'course',
      mediaUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
      mediaType: 'image',
      company: 'Tech Academy',
      category: ['education', 'ai', 'ml'],
      targetAudience: ['computer science', 'data science', 'engineering'],
      ctaText: 'Learn More',
      ctaUrl: '#',
      isActive: true,
      priority: 2,
      createdAt: new Date('2024-01-10'),
      expiresAt: new Date('2024-03-10')
    },
    {
      id: 'flyer-3',
      title: 'Startup Pitch Competition',
      description: 'Pitch your innovative ideas to VCs and win up to $50,000 in funding. Perfect for aspiring entrepreneurs.',
      type: 'event',
      mediaUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop',
      mediaType: 'image',
      company: 'Innovation Hub',
      category: ['startup', 'entrepreneurship', 'competition'],
      targetAudience: ['business', 'engineering', 'design'],
      ctaText: 'Apply Now',
      ctaUrl: '#',
      isActive: true,
      priority: 3,
      createdAt: new Date('2024-01-12'),
      expiresAt: new Date('2024-02-28')
    }
  ];

  const currentAd = flyerAds[currentAdIndex];

  // Handle swipe interactions
  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    // Record interaction
    const interaction: UserAdInteraction = {
      id: `interaction-${Date.now()}`,
      userId: user.id,
      adId: currentAd.id,
      action: direction === 'left' ? 'swipe_left' : 'swipe_right',
      timestamp: new Date()
    };
    
    onInteraction(interaction);

    // Move to next ad after animation
    setTimeout(() => {
      setCurrentAdIndex((prev) => (prev + 1) % flyerAds.length);
      setSwipeDirection(null);
    }, 300);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaX = currentX - startX;
    const threshold = 100;

    if (Math.abs(deltaX) > threshold) {
      handleSwipe(deltaX > 0 ? 'right' : 'left');
    }
    
    setIsDragging(false);
    setCurrentX(0);
  };

  // Mouse event handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const deltaX = currentX - startX;
    const threshold = 100;

    if (Math.abs(deltaX) > threshold) {
      handleSwipe(deltaX > 0 ? 'right' : 'left');
    }
    
    setIsDragging(false);
    setCurrentX(0);
  };

  const getAdTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'course': return <Star className="h-4 w-4" />;
      case 'job': return <Users className="h-4 w-4" />;
      default: return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getAdTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-100 text-blue-800';
      case 'course': return 'bg-green-100 text-green-800';
      case 'job': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full">

      {/* Flyer Card */}
      <div 
        ref={adRef}
        className={`
          relative bg-white rounded-md shadow-lg overflow-hidden cursor-grab active:cursor-grabbing
          transition-transform duration-300 ease-out
          ${isDragging ? 'scale-105 shadow-2xl' : ''}
          ${swipeDirection === 'left' ? 'rotate-12 translate-x-[-100%] opacity-0' : ''}
          ${swipeDirection === 'right' ? '-rotate-12 translate-x-[100%] opacity-0' : ''}
        `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          transform: isDragging ? `translateX(${currentX - startX}px) rotate(${(currentX - startX) / 20}deg)` : undefined
        }}
      >
        {/* Media */}
        <div className="relative h-32 bg-gray-200">
          <img 
            src={currentAd.mediaUrl} 
            alt={currentAd.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getAdTypeColor(currentAd.type)}`}>
              {getAdTypeIcon(currentAd.type)}
              {currentAd.type.toUpperCase()}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
              {currentAdIndex + 1} of {flyerAds.length}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h4 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">{currentAd.title}</h4>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{currentAd.description}</p>
          
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <span className="font-medium">{currentAd.company}</span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1 mb-2">
            {currentAd.category.slice(0, 2).map((cat) => (
              <span key={cat} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {cat}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <button className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 text-white py-2 px-3 rounded-lg font-medium hover:from-purple-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-1 text-sm">
            {currentAd.ctaText}
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>

        {/* Swipe Indicators */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-red-500 text-white px-3 py-2 rounded-lg opacity-0 transition-opacity duration-200 ${swipeDirection === 'left' ? 'opacity-100' : ''}`}>
            <ThumbsDown className="h-5 w-5" />
          </div>
          <div className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-500 text-white px-3 py-2 rounded-lg opacity-0 transition-opacity duration-200 ${swipeDirection === 'right' ? 'opacity-100' : ''}`}>
            <ThumbsUp className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-3">
        <button
          onClick={() => setCurrentAdIndex((prev) => (prev - 1 + flyerAds.length) % flyerAds.length)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>
        
        <div className="flex gap-1">
          {flyerAds.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentAdIndex ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={() => setCurrentAdIndex((prev) => (prev + 1) % flyerAds.length)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Swipe Instructions */}
      <div className="mt-3 text-center">
        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-1">
            <ThumbsDown className="h-4 w-4 text-red-500" />
            <span className="text-xs text-gray-500">Not interested</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4 text-green-500" />
            <span className="text-xs text-gray-500">Interested</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyerAds;
