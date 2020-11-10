import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Input, Menu, Row, Col } from "antd";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import { useSelector } from "react-redux";

// const dummy = {
//     nickname: "제로초",
//     Post: [],
//     Followings: [],
//     Followers: [],
//     isLoggedIn: false,
// };

const SearchInput = styled(Input.Search)`
    viertical-align: middle;
`;

const AppLayout = ({ children }) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    // console.log("isLoggedIn : ", isLoggedIn);
    const { me } = useSelector((state) => state.user);

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/">노드버드</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile">프로필</Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput
                        enterButton
                        style={{ verticalAlign: "middle" }}
                    />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup">회원 가입</Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {/* 왼쪽 메뉴 */}
                    {me ? (
                        // <UserProfile setIsLoggedIn={setIsLoggedIn} />
                        <UserProfile />
                    ) : (
                            // <LoginForm setIsLoggedIn={setIsLoggedIn} />
                            <LoginForm />
                        )}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a
                        href="https://www.zerocho.com"
                        target="_blank"
                        rel="noreferrer noopenner"
                    >
                        Made by ZeroCho
                    </a>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;