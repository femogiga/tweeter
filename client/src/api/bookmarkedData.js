import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const useTweetBookmarkDataById = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['tweetBookmarkData'],
    queryFn: () =>
      apiService.get(`/bookmarks/tweets`).then((res) => res.data),
  });
  return { isPending, error, data };
};

export const useLatestBookmarkDataById = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['latestBookmarkDataById'],
    queryFn: () =>
      apiService.get(`/bookmarks/latest`).then((res) => res.data),
  });
  return { isPending, error, data };
};

export const useMediaBookmarkData = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['mediaBookmarkDataById'],
    queryFn: () =>
      apiService.get(`/bookmarks/media`).then((res) => res.data),
  });
  return { isPending, error, data };
};

export const useLikeBookmarkDataById = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['likeBookmarkDataById'],
    queryFn: () =>
      apiService.get('/bookmarks/likes').then((res) => res.data),
  });
  return { isPending, error, data };
};
