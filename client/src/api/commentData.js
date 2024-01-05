import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const useAllComments = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['allComments'],
    queryFn: () => apiService.get('/comments').then((res) => res.data),
  });
  return { isPending, error, data };
};

export const useAllCommentsByTweetId = (tweetId) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['allCommentsByTweetId'],
    queryFn: () =>
      apiService.get(`/comments/${tweetId}`).then((res) => res.data),
  });
  return { isPending, error, data };
};
