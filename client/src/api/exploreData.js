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

export const useLatestExploreData = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['LatestExploreData'],
    queryFn: () =>
      apiService.get(`/explore/latesttweets`).then((res) => res.data),
  });
  return { isPending, error, data };
};

export const useTopPeopleData = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['topPeopleData'],
    queryFn: () => apiService.get(`/explore/toppeople`).then((res) => res.data),
  });

  return { isPending, error, data };

};


export const useTopMediaData = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['topMediaData'],
    queryFn: () => apiService.get(`/explore/topmedia`).then((res) => res.data),
  });

  return { isPending, error, data };
}
