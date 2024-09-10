import { useRouter } from '@tanstack/react-router';
import backImg from '@/assets/icons/backButton.png'

import { css } from '@emotion/react';
import React from 'react';

const backButtonStyle = css`
    display:flex;
    justify-content:center;
    align-items:center;

    cursor:pointer;
    background-color:transparent;
    border:0

`;

const backButtonImgStyle = css`
    width: 28px;
    height:28px;
`

export default function BackButton() {

    const router = useRouter();

    function handleBackButton() {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.navigate({ to: '/' });
        }
    }


    return (
        <button css={backButtonStyle} onClick={handleBackButton}>
            <img 
            css={backButtonImgStyle}
            src={backImg} 
            />
        </button>

    )
}