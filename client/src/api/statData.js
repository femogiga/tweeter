import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const useStatByAuthorId = (id) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['statByid'],
    queryFn: () => apiService.get(`/stats/${id}`).then((res) => res.data),
  });
  return { isPending, error, data };
};
