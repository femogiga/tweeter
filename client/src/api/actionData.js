import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
  useQueries,
} from '@tanstack/react-query';
import apiService from '../utils/apiService';
import { useParams } from 'react-router-dom';

export const useRetweetCountbyId = (tweetId) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['retweetCountById'],
    queryFn: () =>
      apiService.get(`/actions/retweet/${tweetId}`).then((res) => res.data),
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

export const useCommentLikeCountbyId = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['commentLikeCount'],
    queryFn: () =>
      apiService
        .get(`/actions/commentlike/`)
        .then((res) => res.data),
  });
  return { isPending, error, data };
};

export const useWhoToFollow = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['whoToFollow'],
    queryFn: () =>
      apiService.get('/actions/whotofollow').then((res) => res.data),
  });
  return { isPending, error, data };
};

export const useGetTweetBytags = (tags) => {
  //const { tags } = useParams()
  //const searchTerm = tags.slice(1, tags.length)
  //const searchTerm = tags
  //console.log('searchterm',tags)

  const { isPending, error, data } = useQuery({
    queryKey: ['tweetByTag'],
    queryFn: () =>
      apiService.get(`/actions/tweets?tags=${tags}`).then((res) => res.data),
    enabled: !!tags,
  });

  return { isPending, error, data };
};

export const useGetFollowByUserIdForButtonStatus = (personId) => {
  const queryClient = new QueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ['buttonstatus'],
    queryFn: () =>
      apiService
        .get(`/actions/buttonstatus?personId=${personId}`)
        .then((res) => res.data),
  });
  queryClient.invalidateQueries({ queryKey: ['buttonstatus'] });
  return { isPending, error, data };
};


export const useGetFollowBForModal = (personId) => {
  const queryClient = new QueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ['modalFollower'],
    queryFn: () =>
      apiService
        .get(`/actions/followermodal?personId=${personId}`)
        .then((res) => res.data),
  });
  queryClient.invalidateQueries({ queryKey: ['modalFollower'] });
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
