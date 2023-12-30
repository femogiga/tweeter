import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';


export const useTweetData = () => {
    const { isPending, error, data } = useQuery({
      queryKey: ['allTweet'],
      queryFn: () => apiService.get(`/tweets`).then(res=> res.data),
    });
    return {isPending,error,data};
}

export const useTweetDataByAuthorId = (authorid) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['allTweetByAuthorId'],
    queryFn: () =>
      apiService.get(`/users/${authorid}/tweets`).then((res) => res.data),
  });
  return { isPending, error, data };
};
