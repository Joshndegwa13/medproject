import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import JobSeekerNavbar from './components/JobSeekerNavbar';
import EmployerNavbar from './components/EmployerNavbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FindJobs from './pages/FindJobs';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import PostJob from './pages/employer/PostJob';
import CandidateManagement from './pages/employer/CandidateManagement';
import PricingPlans from './pages/employer/PricingPlans';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import InitialSignUp from './pages/auth/InitialSignUp';
import CompleteProfile from './pages/auth/CompleteProfile';
import Profile from './pages/Profile';
import CompanyProfile from './pages/employer/CompanyProfile';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth();
  const location = useLocation();

  const renderNavbar = () => {
    // Show default navbar for auth pages and landing page
    if (['/login', '/signup', '/signup/employer', '/signup/job-seeker'].includes(location.pathname) || 
        location.pathname === '/') {
      return <Navbar />;
    }

    // Show specific navbars based on user type and authentication
    if (user) {
      if (user.userType === 'employer') {
        return <EmployerNavbar />;
      }
      if (user.userType === 'job_seeker') {
        return <JobSeekerNavbar />;
      }
    }

    // Default to main navbar
    return <Navbar />;
  };

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      {renderNavbar()}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Categories />
            <Testimonials />
          </>
        } />
        <Route path="/find-jobs" element={<FindJobs />} />
        
        {/* Auth Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/employer" element={<InitialSignUp userType="employer" />} />
        <Route path="/signup/job-seeker" element={<InitialSignUp userType="job_seeker" />} />
        
        {/* Protected Employer Routes */}
        <Route path="/employer" element={
          <PrivateRoute userType="employer">
            <EmployerDashboard />
          </PrivateRoute>
        } />
        <Route path="/employer/post-job" element={
          <PrivateRoute userType="employer">
            <PostJob />
          </PrivateRoute>
        } />
        <Route path="/employer/candidates" element={
          <PrivateRoute userType="employer">
            <CandidateManagement />
          </PrivateRoute>
        } />
        <Route path="/employer/pricing" element={
          <PrivateRoute userType="employer">
            <PricingPlans />
          </PrivateRoute>
        } />
        <Route path="/employer/profile" element={
          <PrivateRoute userType="employer">
            <CompanyProfile />
          </PrivateRoute>
        } />
        <Route path="/employer/complete-profile" element={
          <PrivateRoute userType="employer">
            <CompleteProfile />
          </PrivateRoute>
        } />

        {/* Protected Job Seeker Routes */}
        <Route path="/profile" element={
          <PrivateRoute userType="job_seeker">
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/jobseeker/complete-profile" element={
          <PrivateRoute userType="job_seeker">
            <CompleteProfile />
          </PrivateRoute>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;