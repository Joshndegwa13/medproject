import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import api from '../services/api';

export const useProfile = () => {
  const queryClient = useQueryClient();

  // Fetch profile data
  const { data: profile, isLoading, error } = useQuery(
    'profile',
    () => api.get('/profile'),
    {
      onError: (err) => {
        toast.error(err.response?.data?.message || 'Failed to fetch profile');
      }
    }
  );

  // Update profile mutation
  const updateProfileMutation = useMutation(
    (data) => {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key] instanceof File) {
          formData.append(key, data[key]);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });
      return api.put('/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profile');
        toast.success('Profile updated successfully');
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || 'Failed to update profile');
      }
    }
  );

  return {
    profile: profile?.data,
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isLoading
  };
};

export const useCompanyProfile = () => {
  const queryClient = useQueryClient();

  // Fetch company profile data
  const { data: profile, isLoading, error } = useQuery(
    'companyProfile',
    () => api.get('/employer/profile'),
    {
      onError: (err) => {
        toast.error(err.response?.data?.message || 'Failed to fetch company profile');
      }
    }
  );

  // Update company profile mutation
  const updateProfileMutation = useMutation(
    (data) => {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key] instanceof File) {
          formData.append(key, data[key]);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });
      return api.put('/employer/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('companyProfile');
        toast.success('Company profile updated successfully');
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || 'Failed to update company profile');
      }
    }
  );

  return {
    profile: profile?.data,
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isLoading
  };
};