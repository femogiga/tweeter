import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';



export const useTopExploreData = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['topExploreData'],
    queryFn: () => apiService.get(`/explore/toptweets`).then((res) => res.data),
  });
  return { isPending, error, data };
};
