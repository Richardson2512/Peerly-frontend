export interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  course: string;
  courseDuration: number; // in years
  courseLevel: 'diploma' | 'undergraduate' | 'postgraduate' | 'phd';
  year: string;
  graduationDate: Date;
  avatar?: string;
  coverPhoto?: string;
  bio?: string;
  isPro: boolean;
  proExpiryDate?: Date;
  connections: string[]; // user IDs for connections (mutual)
  connectionRequests: ConnectionRequest[];
  followers: string[]; // user IDs who follow this user
  following: string[]; // user IDs this user follows
  skills: string[];
  interests: string[];
  languages: Language[];
  awards: Award[];
  achievements: Achievement[];
  certifications: Certification[];
  internships: UserInternship[];
  companyRecommendations: CompanyRecommendation[];
  badges: Badge[];
  isAccountActive: boolean;
  profileViews: number;
  location?: string;
  phone?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}

export interface ConnectionRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: Date;
  message?: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  image?: string;
  video?: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'remote' | 'on-site' | 'hybrid';
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  postedDate: Date;
  applicationDeadline: Date;
  companyLogo?: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'connection' | 'internship' | 'news';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'academic' | 'events' | 'achievements' | 'general';
  publishedDate: Date;
  author: string;
  image?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
  attachmentUrl?: string;
}

export interface Conversation {
  id: string;
  participants: string[]; // user IDs
  lastMessage?: Message;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string; // e.g., "4 weeks"
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail: string;
  videoUrl: string;
  isFree: boolean;
  isProOnly: boolean;
  completionCertificate: boolean;
  enrolledStudents: number;
  rating: number;
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  isCompleted: boolean;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  issuedDate: Date;
  certificateUrl: string;
}

export interface ProSubscription {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  paymentMethod: string;
  amount: number; // in rupees
}

export interface Application {
  id: string;
  userId: string;
  internshipId: string;
  status: 'applied' | 'under_review' | 'interview_scheduled' | 'accepted' | 'rejected';
  appliedDate: Date;
  notes?: string;
  documents: string[]; // resume, cover letter URLs
}

export interface Webinar {
  id: string;
  title: string;
  description: string;
  speaker: string;
  speakerTitle: string;
  speakerCompany: string;
  date: Date;
  duration: string;
  maxAttendees: number;
  currentAttendees: number;
  isProOnly: boolean;
  meetingLink?: string;
  thumbnail: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'hackathon' | 'workshop' | 'conference' | 'competition';
  date: Date;
  location: string;
  isVirtual: boolean;
  maxParticipants: number;
  currentParticipants: number;
  isProOnly: boolean;
  isProPriority: boolean;
  registrationDeadline: Date;
  image: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  collaborators: string[]; // user IDs
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Alumni {
  id: string;
  name: string;
  email: string;
  college: string;
  course: string;
  graduationYear: number;
  currentCompany: string;
  currentPosition: string;
  experience: number; // years
  isVerified: boolean;
  bio: string;
  avatar?: string;
  skills: string[];
  isAvailableForMentorship: boolean;
}

export interface ContentModeration {
  id: string;
  postId: string;
  userId: string;
  content: string;
  flaggedReason: 'nudity' | 'sexual_content' | 'harassment' | 'spam' | 'other';
  status: 'pending' | 'reviewed' | 'approved' | 'removed';
  reviewedBy?: string;
  reviewedAt?: Date;
  actionTaken: 'none' | 'warning' | 'removal' | 'account_suspension';
}

// New interfaces for enhanced profile features
export interface Language {
  id: string;
  language: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'native';
}

export interface Award {
  id: string;
  title: string;
  description?: string;
  issuer: string;
  date: Date;
  category: 'academic' | 'professional' | 'competition' | 'hackathon' | 'other';
}

export interface Badge {
  id: string;
  title: string;
  event: string;
  rank: string;
  date: string;
  category: 'hackathon' | 'competition' | 'academic' | 'sports' | 'cultural' | 'other';
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  date: Date;
  category: 'academic' | 'project' | 'leadership' | 'volunteer' | 'other';
}

export interface UserInternship {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  skills: string[];
  isCurrent: boolean;
}

export interface CompanyRecommendation {
  id: string;
  companyName: string;
  recommenderName: string;
  recommenderTitle: string;
  recommendation: string;
  date: Date;
  rating: number; // 1-5 stars
}

export interface FollowRequest {
  id: string;
  followerId: string;
  followingId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  connectionRequests: boolean;
  newFollowers: boolean;
  postLikes: boolean;
  comments: boolean;
  messages: boolean;
  eventInvites: boolean;
  jobRecommendations: boolean;
  learningUpdates: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'connections' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  showConnections: boolean;
  showFollowers: boolean;
  allowMessagesFrom: 'everyone' | 'connections' | 'none';
  showOnlineStatus: boolean;
}

// Advertisement system interfaces
export interface Advertisement {
  id: string;
  title: string;
  description: string;
  type: 'event' | 'video' | 'flyer' | 'course' | 'job';
  mediaUrl: string;
  mediaType: 'image' | 'video';
  company: string;
  category: string[];
  targetAudience: string[];
  ctaText: string;
  ctaUrl: string;
  isActive: boolean;
  priority: number;
  createdAt: Date;
  expiresAt: Date;
}

export interface UserAdInteraction {
  id: string;
  userId: string;
  adId: string;
  action: 'swipe_left' | 'swipe_right' | 'view' | 'click';
  timestamp: Date;
}

export interface AdRecommendation {
  adId: string;
  score: number;
  reason: string;
}

export interface SearchResult {
  id: string;
  type: 'event' | 'college' | 'student' | 'hackathon' | 'company' | 'recruiter';
  title: string;
  description: string;
  location?: string;
  date?: string;
  image?: string;
  tags: string[];
  verified?: boolean;
  rating?: number;
  followers?: number;
  company?: string;
  position?: string;
  experience?: string;
  skills?: string[];
}

// Forum system interfaces
export interface ForumDiscussion {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  isPrivate: boolean;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  memberCount: number;
  postCount: number;
  lastActivity: Date;
  isActive: boolean;
}

export interface ForumPost {
  id: string;
  discussionId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  isPinned: boolean;
  isEdited: boolean;
  parentPostId?: string; // For replies
  replies: ForumPost[];
}

export interface ForumMembership {
  id: string;
  discussionId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
  status: 'active' | 'pending' | 'banned';
}

export interface ForumInvite {
  id: string;
  discussionId: string;
  inviterId: string;
  inviteeId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  expiresAt: Date;
  message?: string;
}

export interface ForumJoinRequest {
  id: string;
  discussionId: string;
  requesterId: string;
  requesterName: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}