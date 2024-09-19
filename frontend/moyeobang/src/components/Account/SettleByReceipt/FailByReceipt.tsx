import React from "react";
import receiptImage from'@/assets/icons/receipt.png';
import Btn from "@/components/common/btn/Btn";
import { useNavigate } from "@tanstack/react-router";
import { css } from "@emotion/react";
import { colors } from "@/styles/colors";

const layoutStyle=css`
    position: absolute;
    inset: 0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    z-index:9999;
    background-color:${colors.white};

    img {
        padding-top:50px;
        padding-bottom: 70px;
        width:200px;
        height:400px;
        }
`;

const titleStyle=css`
    font-family:'semibold';
    font-size:24px;
    padding: 20px 0;
`;

const textStyle=css`
    font-family:'regular';
    font-size:20px;
    color:${colors.gray};
`;

const buttonLayoutStyle=css`
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:30px;
`;

export default function FailByReceipt() {

    const navigate = useNavigate({from:'/account/settle'});

    function handleRestart() {
        navigate({to:'/account/settle'})
    }

    function handleClose() {
        navigate({to:'/account'})
    }
    return(
        <div css={layoutStyle}>
            <div css={titleStyle}>영수증 인식에 실패했습니다.</div>
            <div css={textStyle}>영수증을 다시 촬영하거나</div>
            <div css={textStyle}>구매 내역을 직접 등록해주세요.</div>

            <img src={receiptImage} alt="" />

            <div css={buttonLayoutStyle}>
                <Btn buttonStyle={{style:'blue', size:'big'}} onClick={handleRestart}>다시 촬영하기</Btn>
                <Btn buttonStyle={{style:'gray', size:'big'}} onClick={handleClose}>닫기</Btn>
            </div>
        
        </div>
    )
}