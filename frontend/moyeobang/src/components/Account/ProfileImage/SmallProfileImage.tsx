import { css } from '@emotion/react'
import React from 'react';
import { colors } from '@/styles/colors';

const profileContainerStyle = (cm : number) => css`
    flex-shrink: 0;
    display: flex;
    text-align:center;
    align-items:center;
    justify-content:center;
    width: ${cm}px;
    height: ${cm}px;
    padding: 3px;
    box-sizing: border-box;
    border-radius: 50%;
 `;

const profileStyle = css`
    font-family: 'semiBold';
    font-size: 24px;;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: ${colors.fourth};
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

interface SmallProfileImageProps {
    profileImage : ProfileImage;
    px? : number;
}

export default function SmallProfileImage({profileImage, px=40} : SmallProfileImageProps ) {

    return (
        <div 
        css={profileContainerStyle(px)}
        >
            <img 
            src={profileImage}
            css={profileStyle}
            alt="Profile"
            />
        </div>
    )
}     