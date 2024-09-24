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
    padding: 15px 0;
    border-top: solid 1px ${colors.lightGray};
`;

const nameStyle=css`
    width:120px;
    box-sizing:border-box;
    text-align:left;
    white-space: normal;       // 여러줄
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;     // 두줄
    line-clamp: 2;             // -webkit으로 설정
    text-overflow: ellipsis; 
    padding-left:20px;
`;

const amountStyle=css`
    width:100px;
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
            <div css={nameStyle}>{memberName}</div>
            <div css={amountStyle}>{money.toLocaleString()}원</div>
        </div>
    )
}