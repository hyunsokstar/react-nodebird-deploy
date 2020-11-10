import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import Router from 'next/router';
import { Form, Input, notification } from "antd";
// import { useSelector } from "react-redux";
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
    const { me } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
        });
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
        });
    }, []);

    const followerList = [
        { nickname: "제로초1" },
        { nickname: "바보" },
        { nickname: "노드버드오피셜" },
    ];
    const followingList = [
        { nickname: "제로초2" },
        { nickname: "바보" },
        { nickname: "노드버드오피셜" },
    ];
    useEffect(() => {
        if (!(me && me.id)) {
            Router.push('/');
        }
    }, [me && me.id]);
    
    if (!me) {
        useEffect(() => {
            notification.open({
                message: '알림',
                description:
                    '로그인 하세요 !!',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        }, []);
        return null;
    }

    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={me.Followings} />
                <FollowList header="팔로워" data={me.Followers} />
            </AppLayout>
        </>
    );
};

export default Profile;

