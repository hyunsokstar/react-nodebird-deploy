import React, { useCallback } from 'react';
import { Comment, Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { REMOVE_COMMENT_REQUEST } from '../reducers/post';
import { useSelector, useDispatch } from 'react-redux';


const CommentRow = ({ postId, comment }) => {
    const dispatch = useDispatch();
    const deleteComment = useCallback(() => {
        console.log("댓글삭제 버튼 클릭");
        console.log("postId : ", postId);
        console.log("commentId : ", comment.id);
        dispatch({
            type: REMOVE_COMMENT_REQUEST,
            data: {
                postId: postId,
                commentId: comment.id
            }
        });
    })

    return (
        <Comment
            author={comment.User.nickname}
            avatar={< Avatar > {comment.User.nickname[0]}</Avatar >}
            content={comment.content}
            actions={[<DeleteOutlined onClick={deleteComment} />]}
        />
    )
}

export default CommentRow;
