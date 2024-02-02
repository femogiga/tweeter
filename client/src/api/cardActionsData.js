import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
  useQueries,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';
import { useAllTweetDataWithComments } from './tweetWithCommentData';

/*
 * useFollowPerson updates db when a user is followed or unfollowed
 */
export const useFollowPerson = () => {
  const queryClient = useQueryClient();
  const { isPending, error, mutateAsync, isSuccess, onSuccess } = useMutation({
    mutationFn: async (data) => {
      const response = await apiService.post(`/follow`, data);
      return response.data;
    },
    onSuccess: (response) => response.data,
  });
  return { isPending, error, mutateAsync, isSuccess, onSuccess };
};

/*
 * The following retweet saved and likes are used to
 * update the state ,color of buttons on the front end
 */

//  const AllTweetWithCommentandCardStyle = () => {
//   const { data: allTweets } = useAllTweetDataWithComments();
//   const retweetQueries = useQueries(
//     allTweets?.map((tweet) => ({
//       queryKey: ['retweets', tweet.id],
//       queryFn: () =>
//         apiService
//           .get(`/actions/retweetsforStyle?tweetId=${tweet.id}`)
//           .then((res) => res.data),
//     })) || []
//   );

//   // Return the relevant data from the hook
//   return {
//     allTweets,
//     retweetQueries,
//   };
// };
//actions/savesforstyle
export const AllRetweetCardStyle = () => {
  const { isPending, data } = useQuery({
    queryKey: ['retweetscardstyle'],
    queryFn: () =>
      apiService.get('/actions/retweetsforStyle').then((res) => res.data),
  });
  return { isPending, data };
};

export const AllSavesForCardStyle = () => {
  const { isPending, data } = useQuery({
    queryKey: ['savescardstyle'],
    queryFn: () =>
      apiService.get('/actions/savesforstyle').then((res) => res.data),
  });
  return { isPending, data };
};

export const AllLikesForCardStyle = () => {
  const { isPending, data } = useQuery({
    queryKey: ['likescardstyle'],
    queryFn: () =>
      apiService.get('/actions/likesforstyle').then((res) => res.data),
  });
  return { isPending, data };
};

export const AllcommentLikesForCardStyle = () => {
  const { isPending, data } = useQuery({
    queryKey: ['commentlikescardstyle'],
    queryFn: () =>
      apiService.get('/comments/commentlikes').then((res) => res.data),
  });
  return { isPending, data };
};
