import { useCreateLikeMutation, useCreateRetweetMutation, useCreateSaveMutation } from '../api/postTweetData';

export const useActionHandlers = () => {
    const { mutate } = useCreateLikeMutation();
    const { mutate: mutateRetweet } = useCreateRetweetMutation()
    const { mutate:mutateSaved } = useCreateSaveMutation()
  const handleLikeClick = (e, id) => {
    e.preventDefault();
    const data = { id };
    const response = mutate(data);
  };


 const handleRetweetClick = (e, id) => {
    e.preventDefault();
    const data = { tweetId:id };
    const response = mutateRetweet(data);
    };

    const handleSaveClick = (e, id) => {
      e.preventDefault();
      const data = { tweetId:id };
      const response = mutateSaved(data);
    };


  return { handleRetweetClick, handleLikeClick, handleSaveClick };
};



export default useActionHandlers;
