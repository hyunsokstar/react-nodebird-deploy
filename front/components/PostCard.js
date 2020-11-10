import React, { useState, useCallback } from "react";
import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import CommentForm from './CommentForm';
import { Card, Avatar, List, Comment, Popover, Button } from 'antd';
import PostImages from "./PostImages";
import PostCardContent from "../components/PostCardContent";
import { useSelector, useDispatch } from 'react-redux';
import FollowButton from "./FollowButton";
import RetweetButton from "./RetweetButton";
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';
const { Meta } = Card;


const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const { removePostLoading } = useSelector((state) => state.post);
    const { me } = useSelector((state) => state.user);
    const id = me && me.id;
    const liked = post.Likers.find((v) => v.id === id);


    
    const onLike = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
        });
    }, [id]);

    const onUnlike = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id,
        });
    }, [id]);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);
    const onRemovePost = useCallback(() => {
        //
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        });
    }, []);

    const onRetweet = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        });
    }, [id]);

    return (
        <>
            <Card
                style={{ width: "100%" }}
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    // <RetweetOutlined key="retweet" />,
                    // <RetweetOutlined key="retweet" onClick={onRetweet} />,
                    <RetweetButton key="retweet" post={post} />,
                    liked
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
                        : <HeartOutlined key="heart" onClick={onLike} />,
                    <MessageOutlined key="message" onClick={onToggleComment} />,
                    <Popover
                        key="ellipsis"
                        content={(
                            <Button.Group>
                                {id && post.User.id === id
                                    ? (
                                        <>
                                            <Button>수정</Button>
                                            <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                                        </>
                                    )
                                    : <Button>신고</Button>}
                            </Button.Group>
                        )}
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
                extra={<FollowButton post={post} />}
                title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
            >
                {/* <Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    description={<PostCardContent postData={post.content} />}
                /> */}
                {post.RetweetId && post.Retweet
                    ? (
                        <Card
                            cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
                        >
                            <Card.Meta
                                avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
                                title={post.Retweet.User.nickname}
                                description={<PostCardContent postData={post.Retweet.content} />}
                            />
                        </Card>
                    )
                    : (
                        <Card.Meta
                            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                            title={post.User.nickname}
                            description={<PostCardContent postData={post.content} />}
                        />
                    )}
            </Card>

            {commentFormOpened && (
                <>
                    {/* <CommentForm /> */}
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments ? post.Comments.length : 0} 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}

        </>
    );
};

export default PostCard;

