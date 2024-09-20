import React from "react";
import SmallProfileImage from "../ProfileImage/SmallProfileImage";
import { css } from "@emotion/react";
import { colors } from "@/styles/colors";

const itemContainerStyle=css`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items: center;
    padding: 10px 0;
    border-top: solid 1.5px ${colors.lightGray};
    font-size: 16px;
    width:100%;
`;

const titleBoxStyle=css`
    width:155px;
    white-space: nowrap;      // 한 줄로 표시
    overflow: hidden;         // 넘치는 텍스트 숨김
    text-overflow: ellipsis;  // ... 처리
`;

const quantityBoxStyle=css`
    width:30px;
    text-align:center;
    white-space: nowrap;      
    overflow: hidden;        
    text-overflow: ellipsis;  
    margin: 0 5px;
`;

const amountBoxStyle=css`
    width:135px;
    text-align:right;
    white-space: nowrap;      
    overflow: hidden;        
    text-overflow: ellipsis; 
`;

const profileListStyle = css`
    display:flex;
    flex-direction:row;
    gap:10px;
    width:100%;
    overflow-x:auto;
    padding-top:5px;
    padding-bottom: 10px;
`;

export default function DetailCardByReceipt({orderItemTitle, orderItemPrice, orderItemQuantity, participants}:SettledItemInfo) {

    return (
        <div>
            <div css={itemContainerStyle}>
                <div css={titleBoxStyle}>{orderItemTitle}</div>
                <div css={quantityBoxStyle}>{orderItemQuantity}개</div>
                <div css={amountBoxStyle}>{orderItemPrice}</div>
            </div>
            <div css={profileListStyle}>
                {participants.map((participant, index) => (
                    <SmallProfileImage
                    key={index} 
                    profileImage={participant.profileImage} 
                    px={70} 
                    />
                ))}
            </div>
        </div>
    )
}