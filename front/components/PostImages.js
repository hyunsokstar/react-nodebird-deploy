import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';


const PostImages = ({ images }) => {
    if (images.length === 1) {
        return (
            <>
                <img role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick="" />
            </>
        );
    }
    if (images.length === 2) {
        return (
            <>
                <div>
                    <img role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} width="50%" onClick="" />
                    <img role="presentation" src={`http://localhost:3065/${images[1].src}`} alt={images[1].src} width="50%" onClick="" />
                </div>
            </>
        );
    }
    return (
        <>
            <div>
                <img role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} width="50%" onClick="" />
                <div
                    role="presentation"
                    style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
                    onClick=""
                >
                    <PlusOutlined />
                    <br />
                    {images.length - 1}
          개의 사진 더보기
        </div>
            </div>
        </>
    );
};
PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
    })).isRequired,
};


export default PostImages;


