import React from "react";
import { css } from "@emotion/react";
import ProfileImage from "../ProfileImage/ProfileImage";
import { colors } from "@/styles/colors";

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
    nickname: Nickname;
    amount: number;
}

export default function DetailCardByCustom({
    // memberId,
    profileImage,
    nickname,
    amount,
    }:SettleCardByCustomProps) {

    return (
        <div css={layoutStyle}>
            <ProfileImage profileImage={profileImage} px={75}/>
            <div ccs={nameStyle}>{nickname}</div>
            <div css={amountStyle}>{amount}원</div>
        </div>
    )
}