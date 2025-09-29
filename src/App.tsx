import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { User } from './types';
import { supabase, db } from './lib/supabase';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing Supabase session
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
          } else {
            // Account expired, sign out
            await supabase.auth.signOut();
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
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('studentUser');
    } catch (error) {
      console.error('Logout error:', error);
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50">
        <Routes>
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
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;