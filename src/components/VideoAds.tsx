import React, { useState, useRef } from 'react';
import { Advertisement as AdType, UserAdInteraction } from '../types';
import { 
  Play, 
  Pause,
  ExternalLink, 
  Calendar, 
  MapPin, 
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  VolumeX
} from 'lucide-react';

interface VideoAdsProps {
  user: {
    id: string;
    skills: string[];
    interests: string[];
    college: string;
    course: string;
  };
  onInteraction: (interaction: UserAdInteraction) => void;
}

const VideoAds: React.FC<VideoAdsProps> = ({ user, onInteraction }) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  // Sample video advertisements
  const videoAds: AdType[] = [
    {
      id: 'video-1',
      title: 'Summer Internship Program',
      description: 'Join our 12-week paid internship program. Work on real projects with mentorship from senior developers.',
      type: 'job',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      mediaType: 'video',
      company: 'TechCorp Solutions',
      category: ['internship', 'software development', 'mentorship'],
      targetAudience: ['computer science', 'software engineering'],
      ctaText: 'Apply Today',
      ctaUrl: 'https://techcorp.com/careers',
      isActive: true,
      priority: 1,
      createdAt: new Date('2024-01-08'),
      expiresAt: new Date('2024-02-20')
    },
    {
      id: 'video-2',
      title: 'Cybersecurity Bootcamp',
      description: 'Master cybersecurity skills with hands-on labs and real-world scenarios. Industry-recognized certification.',
      type: 'course',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      mediaType: 'video',
      company: 'CyberSec Academy',
      category: ['cybersecurity', 'training', 'certification'],
      targetAudience: ['computer science', 'cybersecurity', 'engineering'],
      ctaText: 'Enroll Now',
      ctaUrl: 'https://cybersec-academy.com/bootcamp',
      isActive: true,
      priority: 2,
      createdAt: new Date('2024-01-05'),
      expiresAt: new Date('2024-04-05')
    },
    {
      id: 'video-3',
      title: 'Data Science Masterclass',
      description: 'Learn advanced data science techniques from industry experts. Real-world projects and portfolio building.',
      type: 'course',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      mediaType: 'video',
      company: 'DataPro Institute',
      category: ['data science', 'machine learning', 'analytics'],
      targetAudience: ['computer science', 'statistics', 'engineering'],
      ctaText: 'Start Learning',
      ctaUrl: 'https://datapro-institute.com/masterclass',
      isActive: true,
      priority: 3,
      createdAt: new Date('2024-01-03'),
      expiresAt: new Date('2024-03-03')
    },
    {
      id: 'video-4',
      title: 'AI Research Fellowship',
      description: 'Join our cutting-edge AI research program. Work on breakthrough projects in machine learning and neural networks.',
      type: 'job',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      mediaType: 'video',
      company: 'AI Innovation Lab',
      category: ['research', 'artificial intelligence', 'fellowship'],
      targetAudience: ['computer science', 'machine learning', 'research'],
      ctaText: 'Apply Now',
      ctaUrl: 'https://ai-innovation-lab.com/fellowship',
      isActive: true,
      priority: 4,
      createdAt: new Date('2024-01-10'),
      expiresAt: new Date('2024-03-10')
    },
    {
      id: 'video-5',
      title: 'Cloud Computing Workshop',
      description: 'Master cloud technologies with AWS, Azure, and GCP. Hands-on labs and real-world project experience.',
      type: 'course',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      mediaType: 'video',
      company: 'Cloud Masters Academy',
      category: ['cloud computing', 'aws', 'azure', 'workshop'],
      targetAudience: ['computer science', 'software engineering', 'devops'],
      ctaText: 'Register Today',
      ctaUrl: 'https://cloudmasters.com/workshop',
      isActive: true,
      priority: 5,
      createdAt: new Date('2024-01-12'),
      expiresAt: new Date('2024-04-12')
    },
    {
      id: 'video-6',
      title: 'Blockchain Development Bootcamp',
      description: 'Learn blockchain technology, smart contracts, and DeFi protocols. Build your own decentralized applications.',
      type: 'course',
      mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      mediaType: 'video',
      company: 'Blockchain University',
      category: ['blockchain', 'smart contracts', 'defi', 'web3'],
      targetAudience: ['computer science', 'cryptocurrency', 'development'],
      ctaText: 'Enroll Now',
      ctaUrl: 'https://blockchain-university.com/bootcamp',
      isActive: true,
      priority: 6,
      createdAt: new Date('2024-01-15'),
      expiresAt: new Date('2024-05-15')
    }
  ];

  const currentAd = videoAds[currentAdIndex];

  // Handle swipe interactions
  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setIsPlaying(false); // Pause video when swiping
    
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
      setCurrentAdIndex((prev) => (prev + 1) % videoAds.length);
      setSwipeDirection(null);
      setIsPlaying(false); // Ensure new video starts paused
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

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
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

      {/* Video Ad Card */}
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
        {/* Video Media - Clickable and Auto-playing */}
        <div 
          className="relative h-64 bg-gray-200 cursor-pointer"
          onClick={() => window.open(currentAd.ctaUrl, '_blank')}
        >
          <video
            src={currentAd.mediaUrl}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          
          {/* Ad Type Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getAdTypeColor(currentAd.type)}`}>
              {getAdTypeIcon(currentAd.type)}
              {currentAd.type.toUpperCase()}
            </span>
          </div>

          {/* Progress Indicator */}
          <div className="absolute top-3 right-3">
            <span className="bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
              {currentAdIndex + 1} of {videoAds.length}
            </span>
          </div>

          {/* Click to visit overlay */}
          <div className="absolute bottom-3 right-3">
            <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
              Click to visit
            </span>
          </div>
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
          onClick={() => {
            setCurrentAdIndex((prev) => (prev - 1 + videoAds.length) % videoAds.length);
            setIsPlaying(false);
          }}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>
        
        <div className="flex gap-1">
          {videoAds.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentAdIndex ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={() => {
            setCurrentAdIndex((prev) => (prev + 1) % videoAds.length);
            setIsPlaying(false);
          }}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Swipe Instructions */}
      <div className="mt-3 text-center mb-0">
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

export default VideoAds;
