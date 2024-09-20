import React from "react";
import { css } from "@emotion/react";
import { colors } from "@/styles/colors";
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';

export interface TransactionDetailDefaultCardProps {
    paymentName:PaymentName;
    money:Money;
    createdAt:CreatedAt;
    // acceptedNumber:AcceptedNumber; // 승인번호
    adress:Adress;
}

const placeStyle = css`
    font-family: 'semibold';
    font-size:24px;
    color: ${colors.fifth};
`;

const layoutStyle = css`
    padding-top:20px;
    display:flex;
    flex-direction:column;
    gap:20px;
    border-top: solid 3px ${colors.lightGray};
`;

const boxStyle = css`
    display: flex;
    flex-direction: row;
    justify-content:space-between;
`;

const labelStyle = css`
    font-family:'semibold';
    font-size: 20px;
`;

const textStyle = css`
    font-family:'regular';
    font-size: 16px;
`;

export default function TransactionDetailDefaultCard({
    paymentName,
    money,
    createdAt,
    adress
    } : TransactionDetailDefaultCardProps) {

    return (
        <>
            <div css={placeStyle} >{paymentName}</div>
            <div css={layoutStyle}>
                <div css={boxStyle}>
                    <div css={labelStyle} >금액</div>
                    <div css={textStyle}>{money}원</div>
                </div>
                {/* <div css={boxStyle}>
                    <div css={labelStyle}>승인번호</div>
                    <div css={textStyle}>{acceptedNumber}</div>
                </div> */}
                <div css={boxStyle}>
                    <div css={labelStyle}>일시</div>
                    <div css={textStyle}>{format(createdAt,'yyyy-MM-dd HH:mm', {locale: ko})}</div>
                </div>
                <div css={boxStyle}>
                    <div css={labelStyle}>주소</div>
                    <div css={textStyle}>{adress
                        }</div>
                </div>
            </div>
        
       </>
    )
}