# Peerly Frontend

A comprehensive student networking platform built with React, TypeScript, and Supabase. Peerly connects college students for networking, learning, and career opportunities.

![Peerly Logo](https://img.shields.io/badge/Peerly-Student%20Network-purple?style=for-the-badge&logo=graduation-cap)

## 🚀 Live Demo

The complete Peerly platform is now live and ready for students to use!

## ✨ Features

### 🔐 Authentication & User Management
- **College Email Validation**: Only allows .edu, .ac.in domains
- **Comprehensive Profiles**: Course info, graduation tracking, skills, interests
- **Account Expiration**: Automatic locking after graduation
- **Secure Authentication**: Supabase Auth integration

### 🤝 Social Networking
- **LinkedIn-style Connections**: Send/receive connection requests
- **Direct Messaging**: Chat with connected users
- **Social Feed**: Posts with images, videos, likes, comments
- **Content Moderation**: AI-powered inappropriate content detection

### 💼 Career Features
- **Internship Board**: Browse and apply for internships
- **Application Tracking**: Track application status (Pro feature)
- **Advanced Filters**: Company, salary, location filters (Pro feature)
- **Resume Builder**: Create professional resumes (Coming soon)

### 📚 Learning Platform
- **Free Courses**: Open source learning content
- **Premium Courses**: Pro-only advanced courses
- **Certificates**: Digital certificates upon completion
- **Progress Tracking**: Monitor learning progress

### 👑 Peerly Pro (₹99/month)
- **Alumni Connect**: Access to verified alumni for mentorship
- **Priority Recruiter Access**: Early notifications from top recruiters
- **Advanced Job Filters**: Enhanced search and recommendations
- **Exclusive Webinars**: Premium career development sessions
- **Profile Boost**: Highlighted profiles for increased visibility
- **Project Workspace**: Collaborative project development
- **Event Priority**: Early access to hackathons and events
- **Application Tracker**: Manage all job applications

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Richardson2512/Peerly-frontend.git
   cd Peerly-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🗄️ Database Setup

The backend database schema is available in the `backend/` folder. To set up your Supabase database:

1. Create a new Supabase project
2. Run the SQL schema from `backend/database/schema.sql`
3. Add sample data using `backend/scripts/seed-data.sql`

## 📱 Features Overview

### 🏠 Dashboard
- Clean, modern interface with sidebar navigation
- User profile display with Pro status
- Quick access to all platform features

### 📝 Social Feed
- Create posts with text, images, and videos
- Like and comment on posts
- Content moderation with inappropriate content detection
- Real-time updates

### 💬 Messaging
- Direct messaging between connected users
- Real-time chat functionality
- Message history and read status

### 🔗 Network
- Browse and connect with other students
- Send connection requests with custom messages
- Manage connection requests (accept/reject)
- View mutual connections

### 💼 Internships
- Browse internships from top companies
- Apply for positions with document uploads
- Track application status (Pro feature)
- Advanced filtering options (Pro feature)

### 📚 Learning
- Browse free and premium courses
- Enroll in courses and track progress
- Earn certificates upon completion
- Access Pro-only advanced courses

### 👑 Pro Features
- Complete subscription management
- Alumni network access
- Exclusive webinars and events
- Project collaboration workspace
- Advanced job search filters

## 🎨 Design System

- **Colors**: Purple and emerald gradient theme
- **Typography**: Clean, readable fonts
- **Components**: Reusable, accessible components
- **Responsive**: Mobile-first design
- **Icons**: Consistent Lucide React icons

## 🔒 Security Features

- **College Email Validation**: Only educational domains allowed
- **Content Moderation**: Automatic inappropriate content detection
- **Row Level Security**: Database-level access control
- **Account Expiration**: Automatic account locking after graduation
- **Pro Feature Gating**: Secure access to premium features

## 📊 Performance

- **Fast Loading**: Optimized bundle size with Vite
- **Real-time Updates**: Supabase real-time subscriptions
- **Caching**: Efficient data caching strategies
- **Lazy Loading**: Component-based code splitting

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on every push

### Vercel
1. Import project to Vercel
2. Add environment variables
3. Deploy with zero configuration

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 📈 Analytics & Monitoring

- **User Engagement**: Track user activity and interactions
- **Course Completion**: Monitor learning progress
- **Pro Conversions**: Track subscription conversions
- **Content Moderation**: Monitor flagged content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the amazing backend infrastructure
- **React** team for the excellent framework
- **Tailwind CSS** for the utility-first styling
- **Vite** for the fast build tool
- **Lucide** for the beautiful icons

## 📞 Support

For support, email support@peerly.com or create an issue in this repository.

## 🔗 Links

- **Frontend Repository**: [Peerly-frontend](https://github.com/Richardson2512/Peerly-frontend.git)
- **Backend Repository**: [Separate repository for backend code]
- **Live Demo**: [Coming soon]
- **Documentation**: [Coming soon]

---

**Built with ❤️ for students, by students**

*Connect. Learn. Grow with Peerly.*
