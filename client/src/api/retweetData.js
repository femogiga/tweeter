import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';

export const useTweetDataByAuthorId = (id) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['allTweetByAuthorId'],
    queryFn: () =>
      fetch(`http://localhost:7000/users/${id}/Retweets`).then((res) =>
        res.json()
      ),
  });
  return { isPending, error, data };
};
