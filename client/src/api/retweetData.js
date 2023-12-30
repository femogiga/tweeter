import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';

export const useRetweetDataByAuthorId = (id) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['retweetByid'],
    queryFn: () =>
      fetch(`http://localhost:7000/users/${id}/retweets`).then((res) =>
        res.json()
      ),
  });
  return { isPending, error, data };
};
