import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const useTrend = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['trendData'],
    queryFn: () =>
      apiService
        .get('/actions/trends')
        .then((res) => res.data),
  });

  return { isPending, error, data };
};
