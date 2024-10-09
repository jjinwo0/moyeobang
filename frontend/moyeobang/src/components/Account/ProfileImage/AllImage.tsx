
import { css } from '@emotion/react'
import React from 'react';
import { colors } from "@/styles/colors";
import { ProfileImageProps } from './ProfileImage';

export default function AllImage({
    isSelected,
    onClick 
    } : ProfileImageProps ) {

const profileContainerStyle = (isSelected : boolean | undefined) => css`
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
    background-color: ${colors.white};
    color: ${isSelected ? colors.fourth : colors.gray };
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid ${colors.gray};
    box-sizing: border-box;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
`; 

    return (
        <div 
        css={profileContainerStyle(isSelected)}
        onClick={onClick}
        >
            <div 
            css={profileStyle}
            >
                전체
            </div>
        </div>
    )
}       