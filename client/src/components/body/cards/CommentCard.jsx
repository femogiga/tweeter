import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import FullDate from './FullDate';
import Fullname from './Fullname';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useUserData } from '../../../api/userData';
import { useCommentLikeCountbyId } from '../../../api/actionData';
import HandleCommentsLike from '../../../utils/commentHandler';
import useActionHandlers from '../../../utils/actionHandlers';

const CommentCard = ({
  reply,
  dateOfReply,
  commentUser,
  replyImageUrl,
  id,
  comment,
  commentId,
  commentLikeCount,
  onHandleCommentLikeClick,
}) => {
  console.log('CommentId=====>', commentId);
  console.log('comment', comment);
  // const { isPending, error, data: userDataById } = useUserData(commentAuthorid);
  console.log('commentUser', commentUser);
  //const { firstName, lastName, photo } = commentUser;
  //console.log('commentUser===>', commentUser);
  //const { isPending: iscommentLikeCountPending, data: commentLikeCount } =
  //useCommentLikeCountbyId(id);
  // console.log('commentLike===>', commentLikeCount);
  // console.log('id', commentAuthorid);
  // console.log('userData', userDataById);
  // const { firstName, lastName, photo } = userDataById;
  //const fullName = firstName + ' ' + lastName;
  const { handleCommentLikeClick } = useActionHandlers();
  const likeCount =
    commentLikeCount?.count == null ? 0 : commentLikeCount?.count;
  let commentIdFromCount = commentLikeCount?.commentId;
  return (
    <div className=' comment-card flow-1'>
      <div className='flex'>
        <Avatar photo={commentUser?.photo} id={commentUser?.id} />
        <div
          style={{
            padding: '.4rem 5rem .4rem .4rem',
            backgroundColor: '#FAFAFA',
            borderRadius: '8px',
            color: '#4F4F4F',
          }}>
          <div className='flex align-items--center'>
            <Fullname
              fullName={commentUser?.firstName + ' ' + commentUser?.lastName}
            />
            <FullDate dateOfReply={dateOfReply} />
          </div>
          <p>
            {reply ||
              'I have seen awe-inspiring things that i thought would never be able to explain to another person'}
          </p>
        </div>
      </div>
      <div className='reply-image'>
        <img src={replyImageUrl} />
      </div>
      <ul className='like flex' style={{ paddingInline: '2rem' }}>
        <li>
          <Link
            className='actions__list__items flex align-items--center'
            onClick={onHandleCommentLikeClick}>
            <FavoriteBorderIcon />
            Like
          </Link>
        </li>
        <li>
          <Link className='actions__list__items flex align-items--center'>
            {likeCount + ' likes' || '0 Like'}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CommentCard;
