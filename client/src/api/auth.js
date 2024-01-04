import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const useLoginMutation = () => {
    let responseData = null
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
  return { isLoading, isSuccess, error, mutate,responseData };
};

export const useRegisterMutation = () => {
  const { isLoading, isSuccess, error, mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await apiService.authpost('/auth/register', data);

      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
    },
  });

  return { isLoading, isSuccess, error, mutate };
};
