import { css } from '@emotion/react'
import React from 'react';
import { colors } from '@/styles/colors';

const profileContainerStyle = css`
    flex-shrink: 0;
    display: flex;
    text-align:center;
    align-items:center;
    justify-content:center;
    width: 40px;
    height: 40px;
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
`; 

export default function SmallProfileImage({
        profileImage
        } : {profileIamge : ProfileImage} ) {

    return (
        <div 
        css={profileContainerStyle}
        >
            <img 
            src={profileImage}
            css={profileStyle}
            alt="Profile"
            />
        </div>
    )
}     