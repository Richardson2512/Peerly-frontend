import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProPage from './components/ProPage';
import { User } from './types';
import { supabase, db } from './lib/supabase';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First check localStorage for hardcoded user data
    const checkLocalStorage = () => {
      try {
        const savedUser = localStorage.getItem('studentUser');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          // Convert date strings back to Date objects
          const user: User = {
            ...userData,
            graduationDate: new Date(userData.graduationDate),
            proExpiryDate: userData.proExpiryDate ? new Date(userData.proExpiryDate) : undefined,
            awards: userData.awards?.map((award: any) => ({
              ...award,
              date: new Date(award.date)
            })) || [],
            achievements: userData.achievements?.map((achievement: any) => ({
              ...achievement,
              date: new Date(achievement.date)
            })) || [],
            certifications: userData.certifications?.map((cert: any) => ({
              ...cert,
              issuedDate: new Date(cert.issuedDate)
            })) || [],
            internships: userData.internships?.map((internship: any) => ({
              ...internship,
              startDate: new Date(internship.startDate),
              endDate: new Date(internship.endDate)
            })) || [],
            companyRecommendations: userData.companyRecommendations?.map((rec: any) => ({
              ...rec,
              date: new Date(rec.date)
            })) || []
          };

          // Check if account is still active
          if (user.isAccountActive && user.graduationDate >= new Date()) {
            setUser(user);
            setLoading(false);
            return true;
          } else {
            // Account expired, clear localStorage
            localStorage.removeItem('studentUser');
          }
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('studentUser');
      }
      return false;
    };

    // Check localStorage first
    if (checkLocalStorage()) {
      return;
    }

    // If no localStorage data, check Supabase session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Get user profile from database
          const userProfile = await db.getUserById(session.user.id);
          
          // Convert to User type for the app
          const user: User = {
            id: userProfile.id,
            name: userProfile.name,
            email: userProfile.email,
            college: userProfile.college,
            course: userProfile.course,
            courseDuration: userProfile.course_duration,
            courseLevel: userProfile.course_level,
            year: userProfile.year,
            graduationDate: new Date(userProfile.graduation_date),
            avatar: userProfile.avatar_url,
            bio: userProfile.bio,
            isPro: userProfile.is_pro,
            proExpiryDate: userProfile.pro_expiry_date ? new Date(userProfile.pro_expiry_date) : undefined,
            connections: [], // Will be loaded separately
            connectionRequests: [], // Will be loaded separately
            skills: userProfile.skills,
            interests: userProfile.interests,
            isAccountActive: userProfile.is_account_active
          };

          // Check if account is still active
          if (user.isAccountActive && user.graduationDate >= new Date()) {
            setUser(user);
            localStorage.setItem('studentUser', JSON.stringify(user));
          } else {
            // Account expired, sign out
            await supabase.auth.signOut();
            localStorage.removeItem('studentUser');
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        localStorage.removeItem('studentUser');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('studentUser', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      // Clear localStorage first
      localStorage.removeItem('studentUser');
      setUser(null);
      
      // Then sign out from Supabase if there's a session
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      // Even if Supabase logout fails, clear local state
      localStorage.removeItem('studentUser');
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-emerald-50 flex items-center justify-center">
        <div className="text-lg text-purple-600">Loading...</div>
      </div>
    );
  }

      return (
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route
                path="/"
                element={
                  user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <LandingPage />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/dashboard/*"
                element={
                  user ? (
                    <Dashboard user={user} onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/pro"
                element={<ProPage />}
              />
            </Routes>
          </div>
        </Router>
      );
}

export default App;