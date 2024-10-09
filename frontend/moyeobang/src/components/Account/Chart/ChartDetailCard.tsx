import React from 'react';
import { css } from '@emotion/react';
import { colors } from '@/styles/colors';
import { colorList } from '@/util/chartCategoryList';
import { getCategoryImageAndColor } from '@/util/chartCategoryList';

const layoutStyle=css`
    padding-top:10px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    width:330px;
    height:70px;
    padding:5px;
`;

const imageContainerStyle= (colorName:string | undefined) => css`
    width:70px;
    height:70px;
    border-radius:50%;
    background-color: ${colorName};
    box-sizing:border-box;
    display:flex;
    align-items:center;
    justify-content:center;
    padding: 5px;

    #imageBackgroundStyle {
        background-color: ${colors.white};
        border-radius: 50%;
        width: 55px;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const imageStyle= (isMember? :boolean) => css`
    border-radius: 50%;
    width: ${isMember ? '100%' : '80%'};
    height: ${isMember ? '100%' : '80%'};
    box-sizing:border-box;
    object-fit:cover;
`;

const textStyle=css`
    width:100px;
    padding-left:10px;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:center;
    gap:10px;
`;

const titleStyle=css`
    font-family:'semibold';
    font-size:20px;
`;

const percentStyle=css`
    color:${colors.strongGray};
    font-family:'regular';
    font-size:15px;
`;

const moneyStyle=css`
    width:130px;
    font-family:'semibold';
    font-size:20px;
    display:flex;
    align-items:center;
    justify-content:flex-end;
`;

interface ChartImageProps {
    title: string;
    proportion: string;
    balance:Money;
    profileImage?:ProfileImage;
    colorIndex?:number;
}

export default function ChartDetailCard({profileImage, colorIndex, title, proportion, balance}:ChartImageProps) {

    const {image, color} = getCategoryImageAndColor(title);

    return (
        <div css={layoutStyle}>
            <div css={ profileImage ? imageContainerStyle(colorList[colorIndex??0]) : imageContainerStyle(color)}>
                <div id="imageBackgroundStyle">
                    {profileImage ? 
                    <img src={profileImage} alt={title} css={imageStyle(true)} /> : 
                    <img src={image} alt={title} css={imageStyle(false)} />}
                </div>
            </div>
            <div css={textStyle}>
                <div css={titleStyle}>
                    {title}
                </div>
                <div css={percentStyle}> 
                    {proportion==='NaN' ? '0.0' : proportion}%
                </div>
            </div>
            <div css={moneyStyle}>
                {balance.toLocaleString()}원
            </div>
        </div>
    )
}