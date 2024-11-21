import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCircleIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useJobApplications } from '../hooks/useJobApplications';
import { useAuth } from '../contexts/AuthContext';

const JobSeekerNavbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const { getUserApplications } = useJobApplications();
  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    if (showApplicationsModal) {
      fetchApplications();
    }
  }, [showApplicationsModal]);

  const fetchApplications = async () => {
    try {
      const apps = await getUserApplications();
      setApplications(apps);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Medrin Jobs
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/find-jobs" className="text-primary-600 hover:text-primary-700 font-medium">
              Find Jobs
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowApplicationsModal(true)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View Applications
            </motion.button>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 text-gray-700"
              >
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <UserCircleIcon className="h-6 w-6 text-primary-600" />
                </div>
                <span>{user?.firstname || 'User'}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </motion.button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showApplicationsModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
              onClick={() => setShowApplicationsModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl z-50 p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Jobs Applied
              </h2>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {applications.map((application) => (
                  <motion.div
                    key={application.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900">
                      {application.jobTitle}
                    </h3>
                    <p className="text-gray-600">{application.companyName}</p>
                    <p className="text-sm text-primary-600 mt-2">
                      Status: {application.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      Applied: {application.createdAt?.toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
                {applications.length === 0 && (
                  <p className="text-center text-gray-600 py-4">
                    No applications yet
                  </p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowApplicationsModal(false)}
                className="mt-6 w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Close
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default JobSeekerNavbar;