import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Tour from './pages/Tour';
import DatingAdvice from './pages/DatingAdvice';
import SuccessStories from './pages/SuccessStories';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProfilePage from './pages/ProfilePage';
import ProfileDashboard from './pages/ProfileDashboard';
import Timeline from './pages/Timeline';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Helper component for the root path
const Home = () => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/timeline" replace /> : <Hero />;
};

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/advice" element={<DatingAdvice />} />
          <Route path="/stories" element={<SuccessStories />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/profile-setup"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ProfileDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/timeline"
            element={
              <ProtectedRoute>
                <Timeline />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
