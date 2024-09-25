import { css } from "@emotion/react";
import bangImage from '@/assets/icons/bangBang.png';
import Btn from "@/components/common/btn/Btn";
import React from "react";
import { colors } from "@/styles/colors";
import { Link } from "@tanstack/react-router";

const layoutStyle = css`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    background-color: ${colors.white};
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
    position: fixed;
    bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;

const linkStyle = css`
    text-decoration: none;
`;

interface PayCompletedModalProps {
    transactionId:TransactionId;
    onClose: VoidFunction;
}

// ! api 연결 후 transactionId 임시 제거하기
export default function PayCompletedModal({transactionId, onClose} : PayCompletedModalProps) {

    return (
        <div css={layoutStyle}>
            <div css={textStyle}>결제 완료!</div>
            <img 
            css={logoStyle}
            src={bangImage} 
            alt="bangbang" />
            <div css={buttonLayoutStyle}>
                <Link to={`/account/${transactionId.toString()}/settle`} css={linkStyle}>        
                    <Btn buttonStyle={{ size:'big', style:'blue'}}>
                        정산하기
                    </Btn>
                </Link>
                <Btn buttonStyle={{ size:'big', style:'gray'}} onClick={onClose}>
                    닫기
                </Btn>
            </div>
        </div>
    )
}