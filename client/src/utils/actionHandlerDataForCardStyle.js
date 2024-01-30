import {
  AllRetweetCardStyle,
  AllSavesForCardStyle,
  AllLikesForCardStyle,
} from '../api/cardActionsData';

const actionhandlerCardStyle = () => {
  const { isPending: isRetweetDataPending, data: retweetData } =
    AllRetweetCardStyle();

  const { isPending: isSavedDataPending, data: savesData } =
    AllSavesForCardStyle();

  const { isPending: isLikesDataPending, data: likesData } =
    AllLikesForCardStyle();

  return { retweetData, savesData, likesData };
};

export default  actionhandlerCardStyle ;
