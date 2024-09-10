import { Link } from "@tanstack/react-router";
import QRImage from "@/assets/icons/qr.webp";
import bellImage from '@/assets/icons/bell.webp';
import { headerStyle, twoIconsHeaderStyle } from "./HeaderStyle";
import React from "react";
import { css } from "@emotion/react";

const twoButtons = css`
    
`;

const QRImageStyle = css`
width: 40px;
height:40px;
`;

const AlramImageStyle = css`
    width: 40px;
    height: 40px;
`;


export default function HeaderWithAlarmAndQR() {

    return (
        <nav 
        css={[
            headerStyle,
            twoIconsHeaderStyle
        ]}
    >
        <ul>
            <Link to='/'>
                <img 
                src={QRImage} 
                css={QRImageStyle}
                alt="" />
            </Link>
            <Link to='/'>
                <img 
                src={bellImage} 
                css={AlramImageStyle}
                alt="" />
            </Link>
        </ul>
        </nav>
        
    )
}