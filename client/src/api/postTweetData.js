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
  }
;
