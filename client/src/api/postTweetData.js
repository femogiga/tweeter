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
      const response = await apiService.postWithImage('/createcomment', data);
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
        queryKeys: ['likescardstyle'],
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
        queryKeys: ['retweetscardstyle'],
      });
      //retweetByidOne
      queryClient.invalidateQueries({
        queryKeys: ['retweetByidOne'],
      });
    },
  });
  return { isPending, isSuccess, error, mutate };
};

export const useCreateSaveMutation = () => {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const response = await apiService.post('/saved', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKeys: ['savescardstyle'],
      });
    },
  });
  return { isPending, isSuccess, error, mutate };
};

export const useCreateCommentLikeMutation = () => {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const response = await apiService.post(
        '/commentlike',
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKeys: ['commentLikeCount'],
      });

      queryClient.invalidateQueries({
        queryKeys: ['commentlike'],
      });

    },
  });
  return { isPending, isSuccess, error, mutate };
};
//commentlike
