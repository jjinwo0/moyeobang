import { useRouter } from '@tanstack/react-router';
import XImg from '@/assets/icons/deleteButton.png'

import { css } from '@emotion/react';

const XButtonStyle = css`
    display:flex;
    justify-content:center;
    align-items:center;

    cursor:pointer;
    background-color:transparent;
    border:0

`;

const XButtonImgStyle = css`
    width: 28px;
    height:28px;
`

export default function XButton() {

    const {router} = useRouter();

    function handleXButton() {
        router.navigate('/')
    }


    return (
        <button css={XButtonStyle}>
            <img 
            css={XButtonImgStyle}
            src={XImg} 
            onClick={handleXButton}/>
        </button>

    )
}