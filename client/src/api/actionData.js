import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const getRetweetCountbyId = (tweetId) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['retweetCountById'],
    queryFn: () => apiService.get(`/actions/retweet/${tweetId}`).then((res) => res.data),
  });
  return { isPending, error, data };
};
