import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';
import { useNavigate } from 'react-router-dom';

export const useLoginMutation = () => {
  let responseData = null;
  const { isLoading, isSuccess, error, mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await apiService.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      responseData = data;
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('userData', JSON.stringify(data.user));
    },
  });
  return { isLoading, isSuccess, error, mutate, responseData };
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { isLoading, isSuccess, error, mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await apiService.authRegister('/register', data);

      return response.data;
    },
    onSuccess: () => {
      navigate('/login');
    },
  });

  return { isLoading, isSuccess, error, mutate };
};

export const useUpdateMutation = () => {
  const navigate = useNavigate();
  const { isLoading, isSuccess, error, mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await apiService.put('/auth/update', data);

      return response.data;
    },
    onSuccess: () => {
      navigate('/home');
    },
  });
  return { isLoading, isSuccess, error, mutate };
};
