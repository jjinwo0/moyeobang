import AlramImg from '@/assets/icons/bell.webp';
import { useRouter } from '@tanstack/react-router';
import { css } from '@emotion/react';


const AlramButtonStyle = css`
    display:flex;
    justify-content:center;
    align-items:center;

    cursor:pointer;
    background-color:transparent;
    border:0

`;

const AlramImgStyle = css`
    width: 35px;
    height:35px;
`

export default function AlramButton() {

    const router = useRouter();

    function handleButton() {
        router.navigate('/')
    }


    return (
        <button css={AlramButtonStyle}>
            <img 
            css={AlramImgStyle}
            src={AlramImg} 
            onClick={handleButton}/>
        </button>

    )
}