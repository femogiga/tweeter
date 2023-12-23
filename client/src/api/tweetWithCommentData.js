import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';

export const useTweetDataByAuthorIdWithComments = (authorid) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['allTweetByAuthorIdWithComments'],
    queryFn: () =>
      fetch(`http://localhost:7000/users/${authorid}/tweets/comments`).then(
        (res) => res.json()
      ),
  });
  return { isPending, error, data };
};

export const useTweetDataByAuthorIdWithMedia = (authorid) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['allTweetByAuthorIdWithMedia'],
    queryFn: () =>
      fetch(`http://localhost:7000/users/${authorid}/tweets/media`).then(
        (res) => res.json()
      ),
  });
  return { isPending, error, data };
};
