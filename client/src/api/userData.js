import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';

export const useUserData = (id) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['userDataById'],
    queryFn:async () =>
      await fetch(`http://localhost:7000/users/${id}`).then((res) => res.json()),
  });
  return { isPending, error, data };
};

export const useAllUserData = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['userAllUserData'],
    queryFn: async () =>
      await fetch("http://localhost:7000/users/allusers").then((res) =>
        res.json()
      ),
  });
  return { isPending, error, data };
};
