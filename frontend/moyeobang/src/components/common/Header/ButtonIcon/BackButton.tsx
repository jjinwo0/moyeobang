import { useRouter } from '@tanstack/react-router';
import backImg from '@/assets/icons/backButton.png'

import { css } from '@emotion/react';

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

    const {router} = useRouter();

    function handleBackButton() {
        router.back()
    }


    return (
        <button css={backButtonStyle}>
            <img 
            css={backButtonImgStyle}
            src={backImg} 
            onClick={handleBackButton}/>
        </button>

    )
}