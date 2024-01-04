import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const useRetweetDataByAuthorId = (id) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['retweetByidOne'],
    queryFn: () =>
      apiService
        .get(`/users/${id}/retweets`)
        .then((res) => res.data),
  });
  return { isPending, error, data };
};
