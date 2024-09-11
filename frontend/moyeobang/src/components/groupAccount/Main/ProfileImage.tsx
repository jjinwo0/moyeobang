import { css } from '@emotion/react'
import React from 'react';
import { colors } from '@/styles/colors';

export interface ProfileImageProps {
    memberId? : MemberId
    profileImage? : ProfileImage
    isSelected : boolean
    onClick : (memberId : MemberId | null) => void
}

export default function ProfileImage({
        memberId,
        profileImage,
        isSelected,
        onClick 
        } : ProfileImageProps ) {

    const profileContainerStyle = css`
    flex-shrink: 0;
    display: flex;
    text-align:center;
    align-items:center;
    justify-content:center;
    width: 85px;
    height: 85px;
    padding: 3px;
    box-sizing: border-box;
    border-radius: 50%;
    background-color : ${isSelected ? colors.fourth : colors.white };
     `;

    const profileStyle = css`
    font-family: 'semiBold';
    font-size: 24px;;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: blue;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid white;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    `; 

    function handleClick() {
        if (memberId) {
            onClick(memberId)
        }

    }

    return (
        <div 
        css={profileContainerStyle}
        onClick={handleClick}
        >
            <img 
            src={profileImage}
            css={profileStyle}
            alt="Profile"
            />
        </div>
    )
}     