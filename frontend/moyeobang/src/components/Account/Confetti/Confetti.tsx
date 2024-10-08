import React from "react";
import JSConfetti from 'js-confetti';
import { colors } from "@/styles/colors";
import closeImage from '@/assets/icons/closeButton.png';
import { css } from "@emotion/react";
import bangbang from '@/assets/icons/bangBang.png'

// confettiColors : 색종이 색상 설정.
// confettiRadius : 색종이 조각 반지름 길이 설정.
// confettiNumber : 색종이 조각 개수 설정.
// emojis : 이모티콘으로 색종이 조각 사용.
// emojiSize : 이모티콘 사이즈 설정.

interface ConfettiProps {
    remainMoney:Money;
    onClose:VoidFunction;
};

const layoutStyle=css`
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:3;
`;

const containerStyle=css`
    background-color:${colors.white};
    width:250px;
    height:250px;
    border-radius:15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3); 
    transform: scale(1);
    transition: transform 0.2s ease-in-out; 
    
    &:hover {
        transform: scale(1.05); 
    }
`;

const xLayoutStyle=css`
    text-align:right;
    padding: 15px;
    img {
        width:15px;
        height:15px;
    }
`;

const textContainerStyle=css`
    padding-top:15px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:18px;
    font-family:'semibold';
`;

const bangbangStyle=css`
    position: fixed;
    top:68%;
    left:50%;
    z-index:9998;
    transform:translate(-50%, -50%);
    width:${110}px;
    height:${110}px;

    animation: bounce 0.7s infinite ease-in-out;

    @keyframes bounce {
    0%, 100% {
        transform: translate(-50%, -50%) translateY(0);
    }
    50% {
        transform: translate(-50%, -50%) translateY(-20px); 
    }
}
    
`;

export default function Confetti({remainMoney, onClose} : ConfettiProps) {

    const jsConfetti = new JSConfetti();

    jsConfetti.addConfetti({
        emojis: ["🎁", "💙", "🎉", "💖", "⛅","💙","💙",],
        emojiSize:60,
        confettiNumber:50,
    })

    return (
        <div css={layoutStyle}>
            <div css={containerStyle}>
                <div css={xLayoutStyle}><img src={closeImage} onClick={onClose} alt="" /></div>
                <div css={textContainerStyle}>
                    모여방이 {remainMoney}원을 쏠게요!
                    <img src={bangbang} alt="" css={bangbangStyle} />
                </div>
            </div>
        </div>
    )
}