import Avatar from './Avatar';
import FullDate from './FullDate';
import Fullname from './Fullname';
import Actions from './Actions';
import Comment from './Comment';
import Stats from './Stats';
import TweetImage from './TweetImage';
import CommentCard from './CommentCard';
import { useAllUserData, useUserData } from '../../../api/userData';
import { useEffect, useState } from 'react';
import {
  useCommentLikeCountbyId,
  useRetweetCountbyId,
} from './../../../api/actionData';
import {
  useAllComments,
  useAllCommentsByTweetId,
} from '../../../api/commentData';
import { useCreateLikeMutation } from '../../../api/postTweetData';
import useActionHandlers from '../../../utils/actionHandlers';
import HandleCommentsLike from '../../../utils/commentHandler';
const Card = ({
  content,
  imageUrl,
  comments,
  createdAt,
  user,
  author,
  id,
  authorid,
  retweetCount,
  savedCount,
  onHandleLike,
  onHandleRetweet,
  onHandleSave,
  retweetState,
  savedState,
  likeState,
}) => {
  const { isPending: isAllUsersPending, data: allUsers } = useAllUserData();
  const{handleCommentLikeClick} = useActionHandlers()
  //console.log('tweetid =====>', id);
  // const handleLikeClick = (e) => {
  //   const data = {id}
  //   e.preventDefault()
  //   const response = mutate(data)
  // }
  //console.log('saved===>', savedState);
  //const{handleRetweet}= useActionHandlers()
  //console.log('retweetState', retweetState);
  const [commentVisible, setCommentVisible] = useState(false); //handle comment Visible set the state
  const handleCommentVisibility = (e) => {
    e.preventDefault();
    setCommentVisible((commentVisible) => !commentVisible);
  };
  const fullName = author?.firstName + ' ' + author?.lastName;
  const commentCount = comments?.length;
  const {data:commentLikeData} = useCommentLikeCountbyId()
  console.log('commentLike===>',commentLikeData)
  return (
    <article className='card shadow flow-2'>
      <div className='flow-1'>
        {/* <Retweeted /> */}
        <div className='card__person flex align-items--center flow-1'>
          <Avatar photo={author?.photo} id={author?.id} />
          <div className=''>
            <Fullname fullName={fullName} />
            <FullDate createdAt={createdAt} />
          </div>
        </div>
        <div className='tweets' style={{ color: '#4F4F4F' }}>
          <p className='flow-1'>
            {content ||
              'Travelling - it leaves you speechless,then turns you into a storyteller'}
          </p>

          {imageUrl && <TweetImage imageUrl={imageUrl} />}
          <Stats
            retweetCount={retweetCount}
            commentCount={commentCount}
            savedCount={savedCount}
          />
          <Actions
            onCommentVisible={handleCommentVisibility}
            onHandleLike={onHandleLike}
            onHandleRetweet={onHandleRetweet}
            onHandleSave={onHandleSave}
            retweetState={retweetState}
            savedState={savedState}
            likeState={likeState}
          />
          <Comment id={id} />
        </div>
      </div>
      <div className='comment-card-cont'>
        {comments &&
          comments?.map((comment) => {
            return (
              commentVisible && (
                <CommentCard
                  key={comment?.id}
                  {...comment}
                  commentUser={
                    allUsers &&
                    allUsers.find(
                      (user) => user?.id === comment?.commentAuthorid
                    )
                  }
                  commentId={comment?.id}
                  commentLikeCount={commentLikeData?.find(item => item?.commentId === comment?.id)}
                  onHandleCommentLikeClick={(e, commentId) => handleCommentLikeClick(e, comment?.id)}
                />
              )
            );
          })}

        {/* <CommentCard /> */}
        {/* <CommentCard /> */}
      </div>
    </article>
  );
};

export default Card;
