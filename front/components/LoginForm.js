import React, { useState, useCallback, useMemo , useEffect } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';

const FormWrapper = styled(Form)`
    padding: 10px;
`;


const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput("");
    const { logInLoading, logInError } = useSelector((state) => state.user);

    const onSubmitForm = useCallback(() => {
        console.log("email , password : ", email, password);
        dispatch({
            type: LOG_IN_REQUEST,
            data: { email, password },
        });
    }, [email, password]);

    useEffect(() => {
        if (logInError) {
            alert(logInError);
        }
    }, [logInError]);
    
    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    name="uer-password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>
            <div style={{ marginTop: "10px" }}>
                <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                <Link href="/signup">
                    <a>
                        <Button>회원 가입</Button>
                    </a>
                </Link>
            </div>
        </FormWrapper>
    );
};


export default LoginForm;
