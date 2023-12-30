import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const useUserData = (id) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['userDataById'],
    queryFn:async () =>
      await apiService.get(`/users/${id}`).then((res) => res.json()),
  });
  return { isPending, error, data };
};

export const useAllUserData = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['userAllUserData'],
    queryFn: async () =>
      await apiService.get("/users/allusers").then((res) =>
        res.json()
      ),
  });
  return { isPending, error, data };
};
