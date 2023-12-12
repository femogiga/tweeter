// handle login modal open
import { useSelector, useDispatch } from 'react-redux';
import { setLoginModalState } from '../features/headerSlice';

export const useHeaderFunctions = () => {
  const dispatch = useDispatch();
  //  const loginModalVisilibility = useSelector(
  //    (state) => state.header.loginModalVisibility
  //  );
  const handleLoginModalOpen = () => {
    dispatch(setLoginModalState(true));

  };

  const handleLoginModalClose = () => {
    dispatch(setLoginModalState(false));
  };
  return [handleLoginModalOpen, handleLoginModalClose];
};
