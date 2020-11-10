import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';


const CommentForm = ({ post }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');
    const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);

    const onSubmitComment = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, userId: id, postId: post.id },
        });
        console.log("me.id : ", id);  // 내가 
        console.log("submit post.id : ", post.id); // 어떤글에 대해 
        console.log("submit commnetText  : ", commentText); // 어떤 글을 
    }, [commentText, id]);

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative', marginTop: "2px" }}>
                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                <Button
                    style={{ position: 'absolute', right: 0, bottom: -40 }}
                    type="primary"
                    htmlType="submit"
                    loading={addCommentLoading}
                >
                    삐약
                </Button>
            </Form.Item>
        </Form>
    );
};

CommentForm.propTypes = {
};

export default CommentForm;
