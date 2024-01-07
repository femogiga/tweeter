import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const useRetweetCountbyId = (tweetId) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['retweetCountById'],
    queryFn: () => apiService.get(`/actions/retweet/${tweetId}`).then((res) => res.data),
  });
  return { isPending, error, data };
};


export const useLikeCountbyId = (tweetId) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['likeCountById'],
    queryFn: () =>
      apiService.get(`/actions/like/${tweetId}`).then((res) => res.data),
  });
  return { isPending, error, data };
};


export const useCommentLikeCountbyId = (commentId) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['commentLikeCountById'],
    queryFn: () =>
      apiService.get(`/actions/commentlike/${commentId}`).then((res) => res.data),
  });
  return { isPending, error, data };
};
