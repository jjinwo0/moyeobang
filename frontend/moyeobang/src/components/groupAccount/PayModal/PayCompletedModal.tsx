import { css } from "@emotion/react";
import bangImage from '@/assets/icons/bangBang.png';
import Btn from "@/components/common/btn/Btn";
import React from "react";

const layoutStyle = css`
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    z-index: 100;
`;

const textStyle = css`
    font-family: 'bold';
    font-size: 40px;
`;

const logoStyle = css`
    width: 250px;
    height:250px;
    padding: 60px 0;
    margin-bottom: 80px;
`;

const buttonLayoutStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;


export default function PayCompletedModal() {

    function handleClick() {
        
    }

    return (
        <div css={layoutStyle}>
            <div css={textStyle}>결제 완료!</div>
            <img 
            css={logoStyle}
            src={bangImage} 
            alt="bangbang" />
            <div css={buttonLayoutStyle}>
            <Btn 
            buttonStyle={{ size:'big', style:'blue'}}
            onClick={handleClick}
            >정산하기
            </Btn>
            <Btn 
            buttonStyle={{ size:'big', style:'gray'}}
            >닫기
            </Btn>
            </div>
        </div>
    )
}