import React from "react"
import backgroundImage from '@/assets/images/skyBackground.jpg'
import { css } from "@emotion/react"
import { colors } from "@/styles/colors"

const cardLayoutStyle = css`
    width: 330px;
    height: 200px;
    background-image: url(${backgroundImage});
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-size: cover;
    position: relative;
    border-radius: 10px;
`

const overlayStyle = css`
    position: absolute;
    box-sizing: border-box;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    z-index: 1;    
`;

const titleStyle = css`
    font-family: 'bold';
    font-size: 24px;
    color: ${colors.fifth};
    text-align: center;

`;

const accountStyle = css`
    font-family: 'medium';
    font-size: 16px;
    color: ${colors.strongGray};
    text-align: center;

`;

const nameStyle = css`
    font-family: 'semibold';
    font-size: 20px; 
    text-align: center;
`;

const balanceStyle = css`
    font-family: 'semibold';
    font-size: 24px; 
    text-align: center;
`;

interface AccountCardProps {
    travelName:TravelName
    travelAccountNumber:TravelAccountNumber;
    memberName?:ParticipantName
    currentBalance:CurrentBalance;   
}

export default function AccountCard({travelName, travelAccountNumber, memberName, currentBalance} :AccountCardProps ) {

    return (

        <div css={cardLayoutStyle}>
            <div css={overlayStyle}>
                    <div css={titleStyle} >{travelName}</div>
                    <div css={accountStyle} >{travelAccountNumber}</div>
                    { memberName ? <div css={nameStyle}>{memberName}</div> : undefined}
                    <div css={balanceStyle} >{currentBalance.toLocaleString()}원</div>
            </div>
        </div>
    )
}