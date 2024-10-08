import { useNavigate } from "@tanstack/react-router";
import QRImage from "@/assets/icons/qr.webp";
import bellImage from '@/assets/icons/bell.webp';
import { headerStyle, twoIconsHeaderStyle } from "./HeaderStyle";
import React from "react";
import { css } from "@emotion/react";
import BackButton from "./ButtonIcon/BackButton";

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
    isBack?:boolean
}

export default function HeaderWithAlarmAndQR({
    onQRClick,
    onAlarmClick,
    isBack=false,
    } : HeaderWithAlarmAndQRProps) {

      const navigate = useNavigate();

      function handleHome() {
        navigate({to:'/'})
      }

        return (
            <nav css={[headerStyle, isBack ? undefined : twoIconsHeaderStyle]}>
              {isBack ? 
              <BackButton onClick={handleHome}/>
               : null}
              <ul>
                <img 
                  src={QRImage} 
                  css={QRImageStyle} 
                  onClick={onQRClick} 
                  alt="" 
                />
                <img 
                  src={bellImage} 
                  css={AlramImageStyle} 
                  onClick={onAlarmClick} 
                  alt="" 
                />
              </ul>
            </nav>
          );
    }