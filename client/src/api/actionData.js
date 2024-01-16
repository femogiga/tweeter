import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';
import { useParams } from 'react-router-dom';

export const useRetweetCountbyId = (tweetId) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['retweetCountById'],
    queryFn: () => apiService.get(`/actions/retweet/${tweetId}`).then((res) => res.data),
  });
  return { isPending, error, data };
};


export const useLikeCountbyId = (tweetId) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['likeCountById'],
    queryFn: () =>
      apiService.get(`/actions/like/${tweetId}`).then((res) => res.data),
  });
  return { isPending, error, data };
};


export const useCommentLikeCountbyId = (commentId) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['commentLikeCountById'],
    queryFn: () =>
      apiService.get(`/actions/commentlike/${commentId}`).then((res) => res.data),
  });
  return { isPending, error, data };
};

export const useWhoToFollow = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['whoToFollow'],
    queryFn: () =>
      apiService
        .get("/actions/whotofollow")
        .then((res) => res.data),
  });
  return { isPending, error, data };
};


export const useGetTweetBytags = () => {
  const { tags } = useParams()
  //const searchTerm = tags.slice(1, tags.length)
  const searchTerm = tags
  console.log('searchterm',searchTerm)

  const { isPending, error, data } = useQuery({
    queryKey: ['tweetByTag'],
    queryFn: () =>
      apiService.get(`/actions/tweets/${searchTerm}`).then((res) => res.data),
  });
  return { isPending, error, data };
};





// export const useCard = () => {
//   const { isPending, error, data } = useQuery({
//     queryKey: ['useCard'],
//     queryFn: () =>
//       apiService
//         .get(`/actions/trials`)
//         .then((res) => res.data),
//   });
//   return { isPending, error, data };
// };
