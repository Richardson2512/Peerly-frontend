export interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  course: string;
  courseDuration: number; // in years
  courseLevel: 'undergraduate' | 'postgraduate' | 'phd';
  year: string;
  graduationDate: Date;
  avatar?: string;
  bio?: string;
  isPro: boolean;
  proExpiryDate?: Date;
  connections: string[]; // user IDs
  connectionRequests: ConnectionRequest[];
  skills: string[];
  interests: string[];
  isAccountActive: boolean;
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