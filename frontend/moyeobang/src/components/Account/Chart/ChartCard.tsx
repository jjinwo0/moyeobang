import React from "react";
import { css } from "@emotion/react"
import { colors } from "@/styles/colors"
import HorizonBarGraph from "./HorizonBarGraph";

const cardLayoutStyle = css`
    width: 330px;
    height: 200px;
    background-color:white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display:flex;
    flex-direction:column;
    border-radius: 10px;
    padding: 0 20px;
    box-sizing:border-box;
    gap:10px;
`

const titleStyle = (isMember:boolean) => css`
    padding: ${isMember ? undefined: '15px 0 10px 0'};
    font-family: 'bold';
    font-size: 24px;
    color: ${colors.fifth};
    text-align: start;
`;

const accountStyle = css`
    font-family: 'semibold';
    font-size: 20px;
    text-align: start;
`;

const nameStyle=css`
    font-size:16px;
    font-family:'semibold';
    padding-top: 10px;
`;

const chartContainerStyle=css`
    width:100%;
    height:100px;
    display: flex;
    align-items: center;
    justify-content:center;
    margin-bottom:25px;
`;

interface ChartCardProps {
    title:string;
    memberName?:MemberName;
    data : ConsumptionProportionByCategory[] | ConsumptionProportionByMember[];
    money : Money;
}

export default function ChartCard({title, memberName, data, money} : ChartCardProps) {


    return (
        <div css={cardLayoutStyle}>
            {memberName ? <div css={nameStyle}>{memberName}의</div>: undefined}
            <div css={memberName ? titleStyle(true) : titleStyle(false)} >{title}</div>
            <div css={accountStyle} >{money.toLocaleString()}원</div>
            <div css={chartContainerStyle}>
                <HorizonBarGraph data={data} isEmpty={money===0}/>
            </div>
        </div>
    )
}