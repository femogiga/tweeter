import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';


export const useTweetData = () => {
    const { isPending, error, data } = useQuery({
      queryKey: ['allTweet'],
      queryFn: () => fetch(`http://localhost:7000/tweets`).then(res=> res.json()),
    });
    return {isPending,error,data};
}

export const useTweetDataByAuthorId = (authorid) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['allTweetByAuthorId'],
    queryFn: () =>
      fetch(`http://localhost:7000/users/${authorid}/tweets`).then((res) => res.json()),
  });
  return { isPending, error, data };
};
