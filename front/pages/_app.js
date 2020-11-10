import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configureStore";
// import withReduxSaga from 'next-redux-saga';


const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf8" />
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType,
};

// export default wrapper.withRedux(withReduxSaga(NodeBird));
export default wrapper.withRedux(NodeBird);
