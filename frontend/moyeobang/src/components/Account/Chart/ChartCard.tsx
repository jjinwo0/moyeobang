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
    flex-grow: 1;
    display: flex;
    align-items: center;
`;

export default function ChartCard() {


    return (
        <div css={cardLayoutStyle}>
            <div css={titleStyle} >{'전체 소비 내역'}</div>
            <div css={accountStyle} >{'21,5000원'}</div>
            <div css={chartContainerStyle}>
                <HorizonBarGraph />
            </div>
        </div>
    )
}