import { css } from '@emotion/react'
import React from 'react';
import { colors } from '@/styles/colors';

export interface ProfileImageProps {
    memberId? : MemberId;
    profileImage? : ProfileImage;
    isSelected? : boolean;
    onClick?: () => void;
    px?: number;
}

export default function ProfileImage({
        // memberId,
        profileImage,
        isSelected,
        onClick,
        px=80
        } : ProfileImageProps ) {

    const profileContainerStyle = (px:number) => css`
    flex-shrink: 0;
    display: flex;
    text-align:center;
    align-items:center;
    justify-content:center;
    width: ${px}px;
    height: ${px}px;
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
    object-fit: cover;         
    object-position: center;
    `; 


    return (
        <div 
        css={profileContainerStyle(px)}
        onClick={onClick}
        >
            <img 
            src={profileImage}
            css={profileStyle}
            alt="Profile"
            />
        </div>
    )
}     