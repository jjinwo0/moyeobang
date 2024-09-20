import { useRouter, useNavigate } from '@tanstack/react-router';
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
    const navigate = useNavigate();

    const {history} = useRouter();

    function handleBackButton() {
        if (window.history.length > 1) {
            history.back();
        } else {
            navigate({ to: '/' });
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