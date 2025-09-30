import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Image as ImageIcon, Video, Send, MoreHorizontal, Flag, AlertTriangle, Shield, Volume2, VolumeX } from 'lucide-react';
import { User, Post, ContentModeration } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface FeedProps {
  user: User;
}

const Feed: React.FC<FeedProps> = ({ user }) => {
  const [globalMute, setGlobalMute] = useState(true); // Start muted by default
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const [visibleVideos, setVisibleVideos] = useState<Set<string>>(new Set());

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Sarah Chen',
      userAvatar: undefined,
      content: "Just finished my first week at Google as a software engineering intern! The experience has been incredible so far. Working on real projects that impact millions of users is both exciting and challenging. Can't wait to share more updates! 🚀",
      timestamp: new Date('2024-01-15T10:30:00'),
      likes: 42,
      comments: [
        {
          id: '1',
          userId: '3',
          userName: 'Mike Johnson',
          content: 'Congratulations Sarah! That sounds amazing!',
          timestamp: new Date('2024-01-15T11:00:00')
        }
      ]
    },
    {
      id: '2',
      userId: '3',
      userName: 'Alex Rodriguez',
      userAvatar: undefined,
      content: "Participating in our university's hackathon this weekend! Our team is building an AI-powered study buddy app. Excited to see what we can create in 48 hours. Anyone else participating in hackathons this season?",
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      timestamp: new Date('2024-01-14T16:45:00'),
      likes: 28,
      comments: []
    },
    {
      id: '3',
      userId: '4',
      userName: 'Emily Davis',
      userAvatar: undefined,
      content: "Pro tip for fellow computer science students: Don't just focus on coding! Soft skills like communication and teamwork are equally important in the tech industry. Just landed my dream internship at Microsoft, and I know my presentation skills made a huge difference in the interview process.",
      timestamp: new Date('2024-01-13T14:20:00'),
      likes: 67,
      comments: [
        {
          id: '2',
          userId: '5',
          userName: 'David Wilson',
          content: 'This is so true! Thanks for sharing your experience.',
          timestamp: new Date('2024-01-13T15:00:00')
        }
      ]
    },
    {
      id: '4',
      userId: 'test-user-123',
      userName: 'John Student',
      userAvatar: undefined,
      content: 'Welcome to Peerly! This is a test post to show you how the platform works. You can create posts, connect with other students, and explore all the amazing features we have to offer! 🎓✨',
      timestamp: new Date('2024-01-16T09:00:00'),
      likes: 15,
      comments: []
    },
    {
      id: '5',
      userId: 'pro-user-456',
      userName: 'Sarah Chen',
      userAvatar: undefined,
      content: 'Just finished my first week at Google as a software engineering intern! The experience has been incredible so far. Working on real projects that impact millions of users is both exciting and challenging. Can\'t wait to share more updates! 🚀',
      timestamp: new Date('2024-01-15T10:30:00'),
      likes: 42,
      comments: [
        {
          id: '3',
          userId: 'test-user-123',
          userName: 'John Student',
          content: 'Congratulations Sarah! That sounds amazing!',
          timestamp: new Date('2024-01-15T11:00:00')
        }
      ]
    },
    {
      id: '6',
      userId: '6',
      userName: 'Priya Sharma',
      userAvatar: undefined,
      content: "🏆 WE WON! Our team just took first place at the TechCrunch Hackathon 2024! Built a real-time mental health support app using React Native and AI. The judges were blown away by our innovation and user experience design. Feeling incredibly proud of my amazing teammates! 💪 #HackathonWinner #MentalHealthTech",
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2940&auto=format&fit=crop',
      timestamp: new Date('2024-01-12T20:30:00'),
      likes: 89,
      comments: [
        {
          id: '4',
          userId: '7',
          userName: 'Ryan Kim',
          content: 'Amazing work Priya! The app concept is brilliant!',
          timestamp: new Date('2024-01-12T21:00:00')
        },
        {
          id: '5',
          userId: '8',
          userName: 'Lisa Wang',
          content: 'Congratulations! So proud of you all! 🎉',
          timestamp: new Date('2024-01-12T21:15:00')
        }
      ]
    },
    {
      id: '7',
      userId: '7',
      userName: 'Ryan Kim',
      userAvatar: undefined,
      content: "Just wrapped up an incredible networking event at the Computer Science Career Fair! Met so many amazing people from top tech companies. Special shoutout to the Meta recruiter who gave me great advice about preparing for technical interviews. The key takeaway: practice system design problems and always ask thoughtful questions! 🤝 #Networking #CareerAdvice",
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      timestamp: new Date('2024-01-11T18:45:00'),
      likes: 56,
      comments: [
        {
          id: '6',
          userId: '9',
          userName: 'Marcus Johnson',
          content: 'Great advice! System design is definitely crucial.',
          timestamp: new Date('2024-01-11T19:00:00')
        }
      ]
    },
    {
      id: '8',
      userId: '8',
      userName: 'Lisa Wang',
      userAvatar: undefined,
      content: "🎓 Internship Achievement Unlocked! Successfully completed my summer internship at Tesla and got a return offer for a full-time position! Working on autonomous vehicle software was a dream come true. The experience taught me so much about computer vision, machine learning, and working in a fast-paced environment. Grateful for the mentorship and amazing team! 🚗⚡",
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2940&auto=format&fit=crop',
      timestamp: new Date('2024-01-10T15:20:00'),
      likes: 124,
      comments: [
        {
          id: '7',
          userId: '10',
          userName: 'Alex Chen',
          content: 'Tesla! That\'s incredible Lisa! Congratulations!',
          timestamp: new Date('2024-01-10T16:00:00')
        },
        {
          id: '8',
          userId: '11',
          userName: 'Sofia Martinez',
          content: 'So inspiring! Can you share more about the interview process?',
          timestamp: new Date('2024-01-10T16:30:00')
        }
      ]
    },
    {
      id: '9',
      userId: '9',
      userName: 'Marcus Johnson',
      userAvatar: undefined,
      content: "📸 Just had an amazing time at the AI & Machine Learning Conference 2024! The keynote speech by Dr. Andrew Ng was absolutely mind-blowing. Learned about the latest advances in transformer architectures and got to network with fellow ML enthusiasts. The future of AI is incredibly exciting! 🤖✨",
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2940&auto=format&fit=crop',
      timestamp: new Date('2024-01-09T22:15:00'),
      likes: 73,
      comments: [
        {
          id: '9',
          userId: '12',
          userName: 'Emma Thompson',
          content: 'I was there too! The panel discussion was incredible!',
          timestamp: new Date('2024-01-09T23:00:00')
        }
      ]
    },
    {
      id: '10',
      userId: '10',
      userName: 'Alex Chen',
      userAvatar: undefined,
      content: "🎬 Hackathon Video Recap! Check out our team's 48-hour journey building a blockchain-based voting system at the Blockchain Innovation Hackathon. From ideation to deployment, it was an incredible learning experience. The video shows our development process, challenges we faced, and how we overcame them. Link in comments! 🔗 #Blockchain #Hackathon #Teamwork",
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      timestamp: new Date('2024-01-08T14:30:00'),
      likes: 91,
      comments: [
        {
          id: '10',
          userId: '13',
          userName: 'David Park',
          content: 'Amazing video! The blockchain integration was really innovative!',
          timestamp: new Date('2024-01-08T15:00:00')
        }
      ]
    },
    {
      id: '11',
      userId: '11',
      userName: 'Sofia Martinez',
      userAvatar: undefined,
      content: "🌟 Startup Pitch Success! Just pitched our edtech startup 'LearnCode' at the university entrepreneurship competition and secured $10,000 in seed funding! Our platform helps students learn coding through gamification. The judges loved our user research and business model. Time to build the MVP! 💰🚀 #StartupLife #EdTech #Entrepreneurship",
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2940&auto=format&fit=crop',
      timestamp: new Date('2024-01-07T19:45:00'),
      likes: 108,
      comments: [
        {
          id: '11',
          userId: '14',
          userName: 'Kevin Lee',
          content: 'Congratulations Sofia! The pitch was incredible!',
          timestamp: new Date('2024-01-07T20:00:00')
        },
        {
          id: '12',
          userId: '15',
          userName: 'Nina Patel',
          content: 'So proud of you! Can\'t wait to see what you build!',
          timestamp: new Date('2024-01-07T20:15:00')
        }
      ]
    },
    {
      id: '12',
      userId: '12',
      userName: 'Emma Thompson',
      userAvatar: undefined,
      content: "🎯 Career Milestone Achieved! Just accepted my offer as a Product Manager Intern at Amazon! After months of networking, building side projects, and perfecting my resume, all the hard work paid off. The interview process was intense but incredibly rewarding. Excited to start this new chapter! 📦 #Amazon #ProductManagement #CareerGrowth",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2940&auto=format&fit=crop',
      timestamp: new Date('2024-01-06T12:00:00'),
      likes: 156,
      comments: [
        {
          id: '13',
          userId: '16',
          userName: 'Jake Wilson',
          content: 'Amazon! That\'s amazing Emma! Well deserved!',
          timestamp: new Date('2024-01-06T12:30:00')
        },
        {
          id: '14',
          userId: '17',
          userName: 'Rachel Green',
          content: 'Congratulations! Product management at Amazon is a dream role!',
          timestamp: new Date('2024-01-06T13:00:00')
        }
      ]
    },
    {
      id: '13',
      userId: '13',
      userName: 'David Park',
      userAvatar: undefined,
      content: "🤝 Networking Event Highlights! Attended the Tech Leaders Meetup yesterday and had incredible conversations with senior engineers from Google, Microsoft, and Netflix. The panel on 'Building Scalable Systems' was eye-opening. Got some amazing career advice and even scored a referral for a summer internship! Always remember: networking is about building genuine relationships! 💼",
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2940&auto=format&fit=crop',
      timestamp: new Date('2024-01-05T21:30:00'),
      likes: 67,
      comments: [
        {
          id: '15',
          userId: '18',
          userName: 'Michelle Zhang',
          content: 'Great networking tips! The referral is amazing!',
          timestamp: new Date('2024-01-05T22:00:00')
        }
      ]
    },
    {
      id: '14',
      userId: '14',
      userName: 'Kevin Lee',
      userAvatar: undefined,
      content: "🏆 Hackathon Victory! Our team 'CodeCrafters' just won the National Collegiate Hackathon with our AI-powered code review tool! 72 hours of pure coding, debugging, and innovation. The tool helps developers catch bugs before they reach production using machine learning. The $25,000 prize money will help us launch our startup! 💻🤖 #HackathonWinner #AI #Startup",
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      timestamp: new Date('2024-01-04T17:15:00'),
      likes: 142,
      comments: [
        {
          id: '16',
          userId: '19',
          userName: 'Tyler Brown',
          content: 'Incredible achievement! The AI integration was brilliant!',
          timestamp: new Date('2024-01-04T18:00:00')
        },
        {
          id: '17',
          userId: '20',
          userName: 'Grace Liu',
          content: 'Congratulations Kevin! Your team\'s innovation is inspiring!',
          timestamp: new Date('2024-01-04T18:30:00')
        }
      ]
    },
    {
      id: '15',
      userId: '15',
      userName: 'Nina Patel',
      userAvatar: undefined,
      content: "📚 Study Abroad Experience! Just returned from an incredible semester in Singapore studying at NUS! The exposure to different cultures, academic approaches, and global tech scene was life-changing. Made friends from 20+ countries and worked on international projects. If you have the opportunity to study abroad, take it! It\'s an investment in your future! 🌏✈️ #StudyAbroad #GlobalExperience",
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2940&auto=format&fit=crop',
      timestamp: new Date('2024-01-03T11:20:00'),
      likes: 84,
      comments: [
        {
          id: '18',
          userId: '21',
          userName: 'Oliver Davis',
          content: 'Singapore sounds amazing! What was your favorite part?',
          timestamp: new Date('2024-01-03T12:00:00')
        }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showContentWarning, setShowContentWarning] = useState(false);
  const [flaggedPosts, setFlaggedPosts] = useState<Set<string>>(new Set());

  // Video management functions
  const toggleGlobalMute = () => {
    const newMuteState = !globalMute;
    setGlobalMute(newMuteState);
    
    // Update all videos in the feed
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.muted = newMuteState;
      }
    });
  };

  // Intersection Observer for auto-play on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute('data-video-id');
          if (videoId) {
            if (entry.isIntersecting) {
              // Video is visible, play it
              setVisibleVideos(prev => new Set([...prev, videoId]));
              const video = videoRefs.current[videoId];
              if (video) {
                video.play().catch(console.error);
              }
            } else {
              // Video is not visible, pause it
              setVisibleVideos(prev => {
                const newSet = new Set(prev);
                newSet.delete(videoId);
                return newSet;
              });
              const video = videoRefs.current[videoId];
              if (video) {
                video.pause();
              }
            }
          }
        });
      },
      {
        threshold: 0.5, // Video must be 50% visible to play
        rootMargin: '0px 0px -10% 0px' // Start playing slightly before fully visible
      }
    );

    // Observe all video elements
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => observer.disconnect();
  }, [posts]);

  // Update video mute state when global mute changes
  useEffect(() => {
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.muted = globalMute;
      }
    });
  }, [globalMute]);

  // Content moderation keywords
  const inappropriateKeywords = [
    'nude', 'naked', 'sex', 'sexual', 'porn', 'pornography', 'xxx', 'adult', 'explicit',
    'harassment', 'hate', 'racist', 'discrimination', 'abuse', 'violence', 'threat'
  ];

  const checkContent = (content: string): boolean => {
    const lowerContent = content.toLowerCase();
    return inappropriateKeywords.some(keyword => lowerContent.includes(keyword));
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;

    // Check for inappropriate content
    if (checkContent(newPost)) {
      setShowContentWarning(true);
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: []
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleFlagPost = (postId: string) => {
    setFlaggedPosts(new Set([...flaggedPosts, postId]));
    
    // In real implementation, this would trigger content moderation review
    const post = posts.find(p => p.id === postId);
    if (post) {
      const moderation: ContentModeration = {
        id: Date.now().toString(),
        postId,
        userId: user.id,
        content: post.content,
        flaggedReason: 'other',
        status: 'pending',
        actionTaken: 'none'
      };
      
      console.log('Content flagged for review:', moderation);
      alert('Content has been flagged for review. Our moderation team will review it shortly.');
    }
  };

  const handleReportContent = (postId: string, reason: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      const moderation: ContentModeration = {
        id: Date.now().toString(),
        postId,
        userId: user.id,
        content: post.content,
        flaggedReason: reason as any,
        status: 'pending',
        actionTaken: 'none'
      };
      
      console.log('Content reported:', moderation);
      alert('Thank you for reporting. Our moderation team will review this content.');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 scrollbar-hide">
      {/* Content Warning Modal */}
      {showContentWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Content Warning</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Your post contains content that may be inappropriate for our platform. Please review our community guidelines and ensure your content is appropriate for all students.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowContentWarning(false);
                  setNewPost('');
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Cancel Post
              </button>
              <button
                onClick={() => {
                  setShowContentWarning(false);
                  // Force post despite warning (for demo purposes)
                  const post: Post = {
                    id: Date.now().toString(),
                    userId: user.id,
                    userName: user.name,
                    content: newPost,
                    timestamp: new Date(),
                    likes: 0,
                    comments: []
                  };
                  setPosts([post, ...posts]);
                  setNewPost('');
                }}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Post Anyway
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Content Moderation Notice */}
      <div className="bg-black border border-gray-800 rounded-xl p-4">
        <div className="flex items-center">
          <Shield className="h-6 w-6 text-white mr-3" />
          <div>
            <h4 className="font-semibold text-white">Safe Learning Environment</h4>
            <p className="text-sm text-gray-300">
              We automatically monitor content for inappropriate material. Help us maintain a positive community by reporting any violations.
            </p>
          </div>
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
            {getInitials(user.name)}
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind? Share your experiences, achievements, or thoughts..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              rows={3}
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Photo
                </button>
                <button className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                  <Video className="h-5 w-5 mr-2" />
                  Video
                </button>
              </div>
              <button
                onClick={handleSubmitPost}
                disabled={!newPost.trim()}
                className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border">
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(post.userName)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.userName}</h3>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  {/* Flag dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="py-1">
                      <button
                        onClick={() => handleFlagPost(post.id)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Flag className="h-4 w-4 mr-2 text-red-500" />
                        Report Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-4">
              <p className="text-gray-800 leading-relaxed">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="px-6 pb-4">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full rounded-lg object-cover max-h-96"
                />
              </div>
            )}

            {/* Post Video */}
            {post.video && (
              <div className="px-6 pb-4">
                <div className="relative w-full rounded-lg overflow-hidden bg-black">
                  <video
                    ref={(el) => {
                      videoRefs.current[post.id] = el;
                    }}
                    data-video-id={post.id}
                    src={post.video}
                    className="w-full h-auto max-h-96 object-cover"
                    loop
                    muted={globalMute}
                    playsInline
                    preload="metadata"
                    onLoadedData={() => {
                      // Set up intersection observer for this video
                      const video = videoRefs.current[post.id];
                      if (video) {
                        const observer = new IntersectionObserver(
                          (entries) => {
                            entries.forEach((entry) => {
                              if (entry.isIntersecting) {
                                video.play().catch(console.error);
                              } else {
                                video.pause();
                              }
                            });
                          },
                          {
                            threshold: 0.5,
                            rootMargin: '0px 0px -10% 0px'
                          }
                        );
                        observer.observe(video);
                      }
                    }}
                  />
                  
                  {/* Mute Button */}
                  <button
                    onClick={toggleGlobalMute}
                    className="absolute bottom-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
                  >
                    {globalMute ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Post Actions */}
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{post.comments.length}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-emerald-500 transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments */}
            {post.comments.length > 0 && (
              <div className="px-6 pb-4 space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {getInitials(comment.userName)}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="font-semibold text-sm text-gray-900">{comment.userName}</p>
                        <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;