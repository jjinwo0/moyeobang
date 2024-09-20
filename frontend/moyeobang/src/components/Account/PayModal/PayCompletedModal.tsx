import { css } from "@emotion/react";
import bangImage from '@/assets/icons/bangBang.png';
import Btn from "@/components/common/btn/Btn";
import React from "react";
import { colors } from "@/styles/colors";
import { useNavigate } from "@tanstack/react-router";

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

interface PayCompletedModalProps {
    onClose: VoidFunction;
    onClick: VoidFunction;
}

// ! api 연결 후 transactionId 임시 제거하기
export default function PayCompletedModal({onClose, onClick} : PayCompletedModalProps) {

    const navigate = useNavigate();

    function handleMain() {
        navigate({to : '/account'});
        onClose();
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
                onClick={onClick}
                >정산하기
                </Btn>
                <Btn 
                buttonStyle={{ size:'big', style:'gray'}}
                onClick={handleMain}
                >닫기
                </Btn>
            </div>
        </div>
    )
}