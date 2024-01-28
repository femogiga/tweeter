import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const useTweetDataByAuthorIdWithComments = (authorid) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['allTweetByAuthorIdWithComments'],
    queryFn: () =>
      apiService
        .get(`/users/${authorid}/tweets/comments`)
        .then((res) => res.data),
  });
  return { isPending, error, data };
};

export const useTweetDataByAuthorIdWithMedia = (authorid) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['allTweetByAuthorIdWithMedia'],
    queryFn: () =>
      apiService.get(`/users/${authorid}/tweets/media`).then((res) => res.data),
  });
  return { isPending, error, data };
};


export const useAllTweetDataWithComments = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['allTweetWithComments'],
    queryFn: () =>
      apiService
        .get(`/users/allusers/alltweets`)
        .then((res) => res.data),
  });
  return { isPending, error, data };
};
