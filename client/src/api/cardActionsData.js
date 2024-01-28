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

export const AllRetweetCardStyle = () => {
  const { isPending, data } = useQuery({
    queryKey: ['retweets'],
    queryFn: () =>
      apiService.get('/actions/retweetsforStyle').then((res) => res.data),
  });
  return {isPending,data}
};
