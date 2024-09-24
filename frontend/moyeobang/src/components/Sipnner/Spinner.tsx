import React from 'react'
import bangbang from '@/assets/icons/bangBang.png'
import { css } from '@emotion/react';

const spinnerStyle=css`

    position: fixed;
    top:50%;
    left:50%;
    z-index:9999;
    transform:translate(-50%, -50%);
    width:150px;
    height:150px;

    /* 애니메이션 추가 */
    animation: bounce 0.7s infinite ease-in-out;

    @keyframes bounce {
    0%, 100% {
        transform: translate(-50%, -50%) translateY(0); /* 원래 위치 */
    }
    50% {
        transform: translate(-50%, -50%) translateY(-20px); /* 위로 20px 올라감 */
    }
}

`;


export default function Spinner() {

    return (
        <img src={bangbang} alt="" css={spinnerStyle} />
    )
}