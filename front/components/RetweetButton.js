import React, { useEffect , useCallback } from 'react';
import { RetweetOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
// import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';
import { RETWEET_REQUEST } from '../reducers/post';
import { notification } from "antd";
import Router from 'next/router';

const RetweetButton = ({ post }) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { retweetError, retweetId } = useSelector((state) => state.post);
    const id = me && me.id;

    console.log("post : ", post);

    const onRetweet = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        });
    }, [id]);

    useEffect(() => {
        if ( retweetError) {
            // alert("리트윗 에러")
            console.log("리트윗 에러 : " , post.RetweetId);
            if (post.id == retweetId) {
                notification.open({
                    message: '알림 메세지',
                    description:
                        'retweetError : '+ retweetError,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            }
        }
    }, [retweetError]);

    return (
        <div>
            <RetweetOutlined key="retweet" onClick={onRetweet} />,
        </div>
    )
}

export default RetweetButton;
