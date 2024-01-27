import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';

export const useCreateTweetMutation = () => {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, isSuccess } = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const response = await apiService.postWithImage('/users/tweets', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKeys: ['allTweetWithComments'] });
      queryClient.invalidateQueries({
        queryKeys: ['allTweetData'],
      });
    },
  });
  return { isPending, isSuccess, error, mutate };
};

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const response = await apiService.postWithImage('/users/comment', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKeys: ['allTweetWithComments'],
      });
      queryClient.invalidateQueries({
        queryKeys: ['allTweetData'],
      });
    },
  });
  return { isPending, isSuccess, error, mutate };
};

export const useCreateLikeMutation = () => {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const response = await apiService.post('/like', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKeys: ['getlike'],
      });
    },
  });
  return { isPending, isSuccess, error, mutate };
};

export const useCreateRetweetMutation = () => {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const response = await apiService.post('/retweets', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKeys: ['getRetweet'],
      });
    },
  });
  return { isPending, isSuccess, error, mutate };
};
