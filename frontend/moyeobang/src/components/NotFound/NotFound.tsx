import React from "react";
import { css } from "@emotion/react";
import { Link } from "@tanstack/react-router";
import sadBangBang from '@/assets/icons/sadBangbang.png';
import { colors } from "@/styles/colors";

const layoutStyle=css`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding-top:200px;
    gap:30px;
    z-index:99999;
    font-family:'semibold';
    font-size:20px;
    background-color:${colors.white};
`;

const imgContainerStyle=css`
    
    img {
        width:170px;
        height:170px;
    }
`;

const linkStyle=css`
    width:320px;
    height:60px;
    border-radius:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:${colors.fourth};
    text-decoration:none;
    color:${colors.white};
    margin-top:20px;
    font-size:24px;
`;

interface NotFoundProps {
    errorMessage:string;
    description:string;
}

export default function NotFound({errorMessage, description} : NotFoundProps) {


    return (
        <div css={layoutStyle}>
            <div css={imgContainerStyle}>
                <img src={sadBangBang} alt="sadBangBang" />
            </div>
            <div>
                {errorMessage}
            </div>
            <div>
                {description}
            </div>
            <Link to={'/'} css={linkStyle}>메인으로 돌아가기</Link>
        </div>
    )
}