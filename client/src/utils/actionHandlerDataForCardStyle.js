import {
  AllRetweetCardStyle,
  AllSavesForCardStyle,
  AllLikesForCardStyle,
  AllcommentLikesForCardStyle,
} from '../api/cardActionsData';

const actionhandlerCardStyle = () => {
  const { isPending: isRetweetDataPending, data: retweetData } =
    AllRetweetCardStyle();

  const { isPending: isSavedDataPending, data: savesData } =
    AllSavesForCardStyle();

  const { isPending: isLikesDataPending, data: likesData } =
    AllLikesForCardStyle();

  const { isPending: isCommentLikePending, data: commentLikeStyleData } =
    AllcommentLikesForCardStyle();

  return { retweetData, savesData, likesData, commentLikeStyleData };
};

export default actionhandlerCardStyle;
