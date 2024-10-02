import { css } from "@emotion/react";
import React from "react";
import type {HTMLAttributes, PropsWithChildren} from "react";
import {useRef, useState} from "react";
import Backdrop from "./Backdrop/Backdrop";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { colors } from "@/styles/colors";
import Btn from "@/components/common/btn/Btn"
import SettleCard from "@/components/Account/SettleByCustom/SettleCardByCustom";
import { CustomSettle } from "@/components/Account/SettleByCustom/SettleByCustomComponent";

const modalContainerStyle = (isExpanded: boolean) => css`
    background-color: ${colors.white};
    position: fixed;
    bottom:0;
    left:0;
    height: ${ isExpanded ? "100%" : "50%" };// 처음 화면의 절반.
    max-height: 770px;
    width: 100%;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    box-sizing: border-box;
    overflow: hidden; // 자식 요소가 넘칠떄 숨김?
    transition: transform 0.9s ease-in-out; // 애니메이션 들어올릴때
`;

const touchBoxLayoutStyle = css`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
`;

const touchBoxStyle = css`
    width: 150px;
    height: 5px;
    background-color: ${colors.lightBlack};
    border-radius: 50px;
    margin: 20px 0px;
`;

const textStyle = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 30px;
`;

const titleStyle = css`
    font-family: 'semibold';
    font-size: 24px;
`;

const amountStyle = css`
    font-family: 'semibold';
    font-size: 20px;
`;

const countStyle = css`
    font-family: 'medium';
    font-size: 20px;
`;

const listLayoutStyle = (isExpanded: boolean) => css`
    height: ${ isExpanded ? "540px" : "200px"};
    overflow-y:auto;
    margin: 10px 0;

`;

const fixedButtonStyle = css`
    position: fixed;
    padding-bottom: 30px;
    padding-top: 10px;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    background-color: ${colors.white};
`;

type FinalModalProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
    onClickOutside: VoidFunction;
    onClick: VoidFunction;
    confirmData: CustomSettle[];
    totalMoney: Money;
  }

export default function FinalModal({onClickOutside, onClick, confirmData, totalMoney} : FinalModalProps) {

    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, onClickOutside);

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    function handlePointerDown() {
        setIsExpanded(!isExpanded);
    }
    

    return (
        <Backdrop>
            <div ref={modalRef} css={modalContainerStyle(isExpanded)}>
                <div css={touchBoxLayoutStyle} onPointerDown={handlePointerDown}>
                <div css={touchBoxStyle}/>
                </div>
                <div css={textStyle}>
                    <div css={titleStyle}>최종확인</div>
                    <div css={amountStyle}>총 {totalMoney} 원</div>
                    <div css={countStyle}>인원 {confirmData.length} 명</div>
                </div>
                <div css={listLayoutStyle(isExpanded)}>
                { confirmData.map((user, index) => (
                    <SettleCard 
                    key={index}
                    memberId={user.participantInfo.memberId}
                    profileImage={user.participantInfo.profileImage}
                    memberName={user.participantInfo.memberName}
                    isChecked={true}
                    money={user.money}
                    />
                ))}
                </div>
                <div css={fixedButtonStyle}>
                    <Btn 
                    buttonStyle={{size:'big', style:'blue'}}
                    onClick={onClick}
                    >확인</Btn>
                </div>
            </div>
        </Backdrop>
    )

}