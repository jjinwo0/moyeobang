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

const titleStyle = css`
    margin-top:10px;
    font-family: 'bold';
    font-size: 24px;
    color: ${colors.fifth};
    text-align: start;
    padding: 10px 0;
`;

const accountStyle = css`
    font-family: 'semibold';
    font-size: 20px;
    text-align: start;
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
    data : ConsumptionProportionByCategory[] | ConsumptionProportionByMember[];
    money : Money;
}

export default function ChartCard({title, data, money} : ChartCardProps) {


    return (
        <div css={cardLayoutStyle}>
            <div css={titleStyle} >{title}</div>
            <div css={accountStyle} >{money.toLocaleString()}원</div>
            <div css={chartContainerStyle}>
                <HorizonBarGraph data={data}/>
            </div>
        </div>
    )
}