import { Link } from "@tanstack/react-router";
import QRImage from "@/assets/icons/qr.webp";
import bellImage from '@/assets/icons/bell.webp';
import { headerStyle, twoIconsHeaderStyle } from "./HeaderStyle";
import React from "react";
import { css } from "@emotion/react";


const QRImageStyle = css`
width: 40px;
height:40px;
`;

const AlramImageStyle = css`
    width: 40px;
    height: 40px;
`;

interface HeaderWithAlarmAndQRProps {
    onQRClick: () => void;
    onAlarmClick: () => void;
}

export default function HeaderWithAlarmAndQR({
    onQRClick,
    onAlarmClick
    } : HeaderWithAlarmAndQRProps) {

    return (
        <nav 
        css={[
            headerStyle,
            twoIconsHeaderStyle
        ]}
    >
        <ul>
            <img 
            src={QRImage} 
            css={QRImageStyle}
            onClick={onQRClick}
            alt="" />

            <img 
            src={bellImage} 
            css={AlramImageStyle}
            onClick={onAlarmClick}
            alt="" />
        </ul>
        </nav>
        
    )
}