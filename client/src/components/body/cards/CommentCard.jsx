import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import FullDate from './FullDate';
import Fullname from './Fullname';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useUserData } from '../../../api/userData';
import { useCommentLikeCountbyId } from '../../../api/actionData';

const CommentCard = ({
  reply,
  dateOfReply,
  commentUser,
  replyImageUrl,
  id,
  comment,
  commentId
}) => {

  console.log('comment',comment)
  // const { isPending, error, data: userDataById } = useUserData(commentAuthorid);
  const { firstName, lastName, photo } = commentUser;
  //console.log('commentUser===>', commentUser);
  const { isPending: iscommentLikeCountPending, data: commentLikeCount } =
    useCommentLikeCountbyId(commentId);
  console.log('commentId===>', commentLikeCount);
  // console.log('id', commentAuthorid);
  // console.log('userData', userDataById);
  // const { firstName, lastName, photo } = userDataById;
  const fullName = firstName + ' ' + lastName;
  return (
    <div className=' comment-card flow-1'>
      <div className='flex'>
        <Avatar photo={photo} id={commentUser?.id} />
        <div
          style={{
            padding: '.4rem 5rem .4rem .4rem',
            backgroundColor: '#FAFAFA',
            borderRadius: '8px',
            color: '#4F4F4F',
          }}>
          <div className='flex align-items--center'>
            <Fullname fullName={fullName} />
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
          <Link className='actions__list__items flex align-items--center'>
            <FavoriteBorderIcon />
            Like
          </Link>
        </li>
        <li>
          <Link className='actions__list__items flex align-items--center'>
            {iscommentLikeCountPending ? 'loading':commentLikeCount[0]?.count + ' Likes' || '12k' + ' Likes'}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CommentCard;
