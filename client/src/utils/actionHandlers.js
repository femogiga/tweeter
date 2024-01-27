import { useCreateLikeMutation } from '../api/postTweetData';

export const useActionHandlers = () => {
  const { mutate } = useCreateLikeMutation();
  const handleLikeClick = (e, id) => {
    e.preventDefault();
    const data = { id };
    const response = mutate(data);
  };
  return { handleLikeClick };
};



export default useActionHandlers;
