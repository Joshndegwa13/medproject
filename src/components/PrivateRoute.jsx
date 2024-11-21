import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, userType }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Restrict access based on user type
  if (userType && user.userType !== userType) {
    if (user.userType === 'job_seeker') {
      return <Navigate to="/find-jobs" replace />;
    }
    return <Navigate to="/employer" replace />;
  }

  // Redirect to profile completion if needed
  if (!user.profileComplete && 
      !location.pathname.includes('complete-profile')) {
    return <Navigate 
      to={`/${user.userType === 'employer' ? 'employer' : 'jobseeker'}/complete-profile`} 
      replace 
    />;
  }

  return children;
};

export default PrivateRoute;