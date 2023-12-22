import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';

export const useUserData = (id) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['userDataById'],
    queryFn: () =>
      fetch(`http://localhost:7000/users/${id}`).then((res) => res.json()),
  });
  return { isPending, error, data };
};
