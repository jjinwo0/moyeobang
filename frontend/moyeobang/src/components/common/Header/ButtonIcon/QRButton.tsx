import QRImg from '@/assets/icons/qr.webp';
import { useRouter } from '@tanstack/react-router';
import { css } from '@emotion/react';


const QRButtonStyle = css`
    display:flex;
    justify-content:center;
    align-items:center;

    cursor:pointer;
    background-color:transparent;
    border:0

`;

const QRImgStyle = css`
    width: 40px;
    height:40px;
`

export default function QRButton() {

    const router = useRouter();

    function handleButton() {
        router.navigate('/')
    }


    return (
        <button css={QRButtonStyle}>
            <img 
            css={QRImgStyle}
            src={QRImg} 
            onClick={handleButton}/>
        </button>

    )
}