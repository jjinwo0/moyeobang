import React from "react";
import Btn from "@/components/common/btn/Btn";
import { css } from "@emotion/react";
import { colors } from "@/styles/colors";
import sadBangBang from '@/assets/icons/sadBangbang.png'

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
        width:250px;
        height:250px;
        }
`;

const titleStyle=css`
    font-family:'semibold';
    font-size:24px;
    padding: 20px 0;
    span {
        font-family:'english';
        font-size:28px;
        padding: 0 3px;
    }
`;

const textStyle=css`
    font-family:'regular';
    font-size:20px;
    color:${colors.gray};
    span {
        font-family:'english';
        font-size:22px;
        padding: 0 3px;
    }
`;

const buttonLayoutStyle=css`
    position:fixed;
    bottom:30px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:30px;
`;

interface FailByQrScanProps {
    onClose: VoidFunction;
    onRestart:VoidFunction
    errorName:string;
}
export default function FailModalByQrScan({onClose, onRestart, errorName}:FailByQrScanProps) {

    function handleRestart() {
        onRestart()
    }

    function handleClose() {
        onClose()
    }

    return(
        <div css={layoutStyle}>
            {errorName==='noBalance' ? 
            <>
            <div css={titleStyle}>계좌에 잔액이 부족해요</div>
            <div css={textStyle}>공금을 입금해주세요</div>
            </>
            : 
            <>
            <div css={titleStyle}><span>QR</span>스캔에 실패했어요</div>
            <div css={textStyle}><span>QR</span>을 다시 촬영해주세요</div>
            </>
            }

            <img src={sadBangBang} alt="" />

            <div css={buttonLayoutStyle}>
                { errorName!=='noBalance' && <Btn buttonStyle={{style:'blue', size:'big'}} onClick={handleRestart}>다시 촬영하기</Btn>}
                <Btn buttonStyle={{style:'gray', size:'big'}} onClick={handleClose}>닫기</Btn>
            </div>
        
        </div>
    )
}


