import React from 'react';
import activity from '@/assets/icons/amusementPark.webp';
import cafe from '@/assets/icons/coffeIcon.png';
import hotel from '@/assets/icons/hotel.webp';
import exception from '@/assets/icons/cloud.webp';
import { css } from '@emotion/react';
import { colors } from '@/styles/colors';

const chartCategory = [
    {id:1, image:activity},
    {id:2, image:cafe},
    {id:3, image:hotel},
    {id:4, image:exception}
]

const layoutStyle=css`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    width:330px;
    height:70px;
`;

const imageContainerStyle= (colorName:string) => css`
    width:70px;
    height:70px;
    border-radius:50%;
    background-color: ${colorName};
    box-sizing:border-box;
    display:flex;
    align-items:center;
    justify-content:center;
    padding: 5px;
`;

const imageStyle= (imagePx : number) => css`
    border-radius: 50%;
    width: ${imagePx}px;
    height: ${imagePx}px;
    background-color: ${colors.white};
    box-sizing:border-box;
    object-fit:cover;
`;

const textStyle=css`
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
    font-family:'semibold';
    font-size:20px;
    display:flex;
    align-items:center;
    justify-content:flex-end;
`;

interface ChartImageProps {
    imageId : number;
    imagePx : number;
    colorId: number;
    title: string;
    percent: number;
    money:Money;
}

export default function CategoryCard({imageId, imagePx, colorId, title, percent, money}:ChartImageProps) {

    const getColor = (colorId: number) => {
        if (colorId === 1) return colors.fourth;
        if (colorId === 2) return colors.third;
        if (colorId === 3) return colors.customGreenBlue;
        return colors.gray;
    };

    const colorName = getColor(colorId)


    return (
        <div css={layoutStyle}>
            <div css={imageContainerStyle(colorName)}>
                <div>
                    <img src={chartCategory[imageId-1].image} alt={title} css={imageStyle(imagePx)} />
                </div>
            </div>
            <div css={textStyle}>
                <div css={titleStyle}>
                    {title}
                </div>
                <div css={percentStyle}> 
                    {percent}%
                </div>
            </div>
            <div css={moneyStyle}>
                {money}원
            </div>
        </div>
    )
}