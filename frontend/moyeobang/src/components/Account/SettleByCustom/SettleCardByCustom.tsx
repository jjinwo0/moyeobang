import React from "react";
import blankCheck from '@/assets/icons/blueBlankCheck.png';
import check from '@/assets/icons/blueCheck.png';
import type {ChangeEvent} from 'react';
import { useState } from "react";
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
    padding: 10px 30px;
`;

const checkStyle = css`
    img {
        width: 25px;
        height: 25px;
    }
`;
const inputStyle = (isDecided: boolean | undefined) =>  css`
    width: 80px;
    border:none;
    outline:none;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 0 0 2px transparent;
    transition: box-shadow 0.3s ease-in-out;
    text-align: right;
    font-family: 'medium';
    font-size: 20px;
    margin-right: 5px;
    color: ${ isDecided ? colors.fourth : colors.black};

    &:focus {
        box-shadow: 0 0 0 2px ${colors.fourth}
    }

    &:disabled {
        /* background-color: transparent;  */
        color: ${colors.gray};
        cursor: not-allowed; 
    }
`;

export interface SettleCardByCustomProps {
    profileImage : ProfileImage;
    memberId: MemberId;
    memberName: MemberName;
    money: number;
    isChecked:boolean;
    isDecided?:boolean;
    onUpdate?: (updateUser : {memberId: MemberId; money:number, isChecked:boolean}) => void;
}

export default function SettleCardByCustom({
    memberId,
    profileImage,
    memberName,
    money,
    isChecked,
    isDecided,
    onUpdate,
    }:SettleCardByCustomProps) {

    function handleChange(event: ChangeEvent<HTMLInputElement>) {

        const newValue = event.target.value

        if (newValue === "" && onUpdate) {
            onUpdate({ memberId, money:0, isChecked: isChecked});
        } else {
            const numericValue = parseFloat(newValue); // 숫자로변환
            // 숫자이면
            if (!isNaN(numericValue) && onUpdate) {
                onUpdate({ memberId, money:numericValue, isChecked: isChecked});
            }
        }
    }

    function handleCheck() {
        const newCheck = !isChecked
        const updatedAmount = newCheck ? money : 0;
        if ( onUpdate ) {
            onUpdate({ memberId, money: updatedAmount, isChecked: newCheck });
        }

    }

    return (
        <div css={layoutStyle}>
            <div
            css={checkStyle}
            onClick={ !isDecided ? handleCheck : undefined}
            >
            { isChecked ? 
            <img src={check} alt="full" /> :
            <img src={blankCheck} alt="blank" />
            }
            </div>
            <ProfileImage profileImage={profileImage} isSelected={isChecked}/>
            <div>{memberName}</div>
            <div>
                <div>
                    <input 
                    css={inputStyle(isDecided)}
                    type="text" 
                    value={money}
                    onChange={handleChange}
                    disabled={!isChecked}
                    readOnly={isDecided}
                    />
                    <span>원</span>
                </div> 
            </div>
        </div>
    )
}