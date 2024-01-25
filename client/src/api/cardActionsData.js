import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

/*
 * useFollowPerson updates db when a user is followed or unfollowed
 */
export const useFollowPerson = () => {
  const queryClient = useQueryClient();
  const { isPending, error, mutate, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const response = await apiService.post(`/follow`, data);
      return response.data;
    },
    onSuccess: {},
  });
  return { isPending, error, mutate, isSuccess };
};
