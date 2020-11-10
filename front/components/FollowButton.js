import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';


const FollowButton = ({ post }) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    // const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
    const isFollowing = me?.Followings.find((v) => v.id === post.UserId);
    // console.log("isFollowing : ", isFollowing);

    const onClickButton = useCallback(() => {
        if (isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            });
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            });
        }
    }, [isFollowing]);

    return (
        <Button onClick={onClickButton}>
            {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
    )
}

export default FollowButton;
