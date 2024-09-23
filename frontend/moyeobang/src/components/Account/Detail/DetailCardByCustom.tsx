import React from "react";
import { css } from "@emotion/react";
import ProfileImage from "../ProfileImage/ProfileImage";

const layoutStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-family: 'medium';
    font-size: 20px;
    padding: 10px 0;
`;

const nameStyle=css`
    width:150px;
    text-align:right;
    white-space: nowrap;      
    overflow: hidden;        
    text-overflow: ellipsis;  
`;

const amountStyle=css`
    width:90px;
    text-align:right;
    white-space: nowrap;      
    overflow: hidden;        
    text-overflow: ellipsis;  
`;

export interface SettleCardByCustomProps {
    profileImage : ProfileImage;
    memberId: MemberId;
    memberName: MemberName;
    money: Money;
}

export default function DetailCardByCustom({
    // memberId,
    profileImage,
    memberName,
    money,
    }:SettleCardByCustomProps) {

    return (
        <div css={layoutStyle}>
            <ProfileImage profileImage={profileImage} px={75}/>
            <div ccs={nameStyle}>{memberName}</div>
            <div css={amountStyle}>{money}원</div>
        </div>
    )
}