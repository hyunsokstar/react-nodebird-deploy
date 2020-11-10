import React, { useMemo, useCallback, useEffect } from "react";
import { Form, Input, notification } from "antd";
import useInput from '../hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';


const NicknameEditForm = () => {
    const style = useMemo(
        () => ({
            marginBottom: "20px",
            border: "1px solid #d9d9d9",
            padding: "20px",
        }),
        []
    );
    const dispatch = useDispatch();
    const { me, changeNicknameDone, changeNicknameLoading } = useSelector((state) => state.user);
    const [nickname, onChangeNickname] = useInput(me?.nickname || '');

    const onSubmit = useCallback(() => {
        console.log("입력한 nickname : ", nickname);
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        });
    }, [nickname]);
    useEffect(() => {
        if (changeNicknameDone) {
            notification.open({
                message: '알림',
                description:
                    '닉네임 변경 성공 => ' + nickname,
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        }
    }, [changeNicknameDone]);

    return (
        <Form style={style}>
            <Input.Search
                addonBefore="닉네임"
                enterButton="수정"
                value={nickname}
                onChange={onChangeNickname}
                onSearch={onSubmit}
            />
        </Form>
    );
};

export default NicknameEditForm;

