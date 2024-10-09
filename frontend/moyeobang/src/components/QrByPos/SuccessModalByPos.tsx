import React, { useRef } from "react"
import Backdrop from "../Account/FinalModal/Backdrop/Backdrop"
import useOnClickOutside from "@/hooks/useOnClickOutside"
import { css } from "@emotion/react";
import { colors } from "@/styles/colors";

interface SuccessModalByPosProps {
    onClickOutside:VoidFunction;
}

const containerStyle=css`
    background-color:${colors.white};
    width:250px;
    height:250px;
    border-radius:15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3); 
    transform: scale(1);
    transition: transform 0.2s ease-in-out; 
    display:flex;
    justify-content:center;
    align-items:center;
    font-family:'semibold';
    font-size:24px;
`;

export default function SuccessModalByPos({onClickOutside}:SuccessModalByPosProps) {

    const containerRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(containerRef, onClickOutside)

    return (
        <Backdrop>
            <div ref={containerRef} css={containerStyle}>
                결제 성공!
            </div>
        </Backdrop>
    )
}