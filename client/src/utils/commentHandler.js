import { useCommentLikeCountbyId } from "../api/actionData";

function HandleCommentsLike() {
    const { data } = useCommentLikeCountbyId();
    let commentLikeData = data
    return { commentLikeData };
}


export default HandleCommentsLike;
