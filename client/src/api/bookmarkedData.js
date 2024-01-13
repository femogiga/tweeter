import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const useTopBookmarkDataById = (id) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['topBookmarkDataById'],
    queryFn: () =>
      apiService.get(`/bookmarks/${id}/top`).then((res) => res.data),
  });
  return { isPending, error, data };
};

export const useLatestBookmarkDataById = (id) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['latestBookmarkDataById'],
    queryFn: () =>
      apiService.get(`/bookmarks/${id}/latest`).then((res) => res.data),
  });
  return { isPending, error, data };
};

export const useMediaBookmarkDataById = (id) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['mediaBookmarkDataById'],
    queryFn: () =>
      apiService.get(`/bookmarks/${id}/media`).then((res) => res.data),
  });
  return { isPending, error, data };
};

export const useLikeBookmarkDataById = (id) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['likeBookmarkDataById'],
    queryFn: () =>
      apiService.get(`/bookmarks/${id}/likes`).then((res) => res.data),
  });
  return { isPending, error, data };
};
