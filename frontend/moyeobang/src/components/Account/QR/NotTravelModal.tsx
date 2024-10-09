import React from "react";
import Backdrop from "../FinalModal/Backdrop/Backdrop";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useRef } from "react";
import { css } from "@emotion/react";
import xImage from '@/assets/icons/closeButton.png'
import BangBang from '@/assets/icons/sadBangbang.png'

interface NotTravelModalProps {
    onClickOutside:VoidFunction
};

const divStyle=css`
    box-sizing:border-box;
    width:250px;
    height:250px;
    background-color:white;
    border-radius:15px;
    padding: 0 20px;
    font-family:'semibold';
    font-size:24px;
    text-align:center;
`;

const xButtonLayoutStyle=css`
    display:flex;
    justify-content:right;
    padding:10px 0 ;
    img {
        width:15px;
        heigth:15px;
    }
`;

const bangbangStyle=css`
    width:100px;
    height:100px;
    padding:20px;
`;


export default function NotTravelModal({onClickOutside}:NotTravelModalProps) {

    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, onClickOutside);
    
    return (
        <Backdrop>
            <div ref={modalRef} css={divStyle}>
                <div css={xButtonLayoutStyle}><img src={xImage} alt="" onClick={onClickOutside}/></div>
                <div>현재 진행 중인 </div>
                <div>여행이 없습니다.</div>
                <img src={BangBang} alt="" css={bangbangStyle}/>
            </div>
        </Backdrop>
    )
}