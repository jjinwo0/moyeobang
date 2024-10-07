import React, { useRef } from "react";
import { css } from "@emotion/react";
import { colors } from "@/styles/colors";
import useTravelDetailStore from "@/store/useTravelDetailStore";
import informationImage from '@/assets/icons/information.png';
import { useState } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const cardLayoutStyle = (travelImg:string | null) =>  css`
    width: 330px;
    height: 200px;
    background-image: url(${travelImg});
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-size: cover;
    position: relative;
    border-radius: 10px;
`

const overlayStyle = (isMember:boolean) => css`
    position: absolute;
    box-sizing: border-box;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    gap: ${isMember ? '15px' : '18px'};
    padding: 10px 20px 20px 20px;
    border-radius: 10px;
    z-index: 1;    
`;

const titleStyle = css`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    font-family: 'bold';
    font-size: 24px;
    color: ${colors.fifth};
`;

const accountStyle = css`
    font-family: 'medium';
    font-size: 16px;
    color: ${colors.strongGray};
    text-align: center;

`;

const nameStyle = css`
    font-family: 'semibold';
    font-size: 20px; 
    text-align: center;
`;

const balanceStyle = css`
    display:flex;
    flex-direction:row;
    width:100%;
    justify-content:center;
    font-family: 'semibold';
    font-size: 24px; 
    text-align: center;
    img {
        padding:0 5px;
        cursor:pointer;
    }
`;

const informationStyle=css`
    width:25px;
`;

const hoverContainerStyle=(isMember:boolean, leftPosition:number) =>css`
    z-index:2;
    width:180px;
    height:30px;
    border-radius:15px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    font-family: 'semibold';
    font-size: 16px; 
    padding: 15px 0;
    display:flex;
    flex-direction:column;
    gap:5px;
    position:absolute;
    top: ${isMember ? '75px': '60px'}; 
    left: ${leftPosition}%; 
    transform: translateX(-20%);
`;

const triangleStyle=css`
    position: absolute;
    top: 100%; 
    left: 50%; 
    margin-left: -8px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent; 
    border-top: 8px solid ${colors.white};
`;

interface AccountCardProps {
    memberName?:ParticipantName;
    currentBalance:CurrentBalance;   
    totalBalance:TotalAmount; // 누적입금금액
}

export default function AccountCard({memberName, currentBalance, totalBalance} :AccountCardProps ) {

    const {travelName} = useTravelDetailStore();
    const {accountNumber} = useTravelDetailStore();
    const {travelImg} = useTravelDetailStore();
    const [isHover, setIsHover] = useState<boolean>(false);

    const imgRef = useRef<HTMLImageElement>(null);
    useOnClickOutside(imgRef, handleOutside)

    function handleOutside() {
        if (isHover) {
            setIsHover(!isHover)
        }
    }

    function handleClick() {
        setIsHover(!isHover);
    }

    const leftPosition = 37+(currentBalance.toString().length * 2.4); 
    
    return (

        <div css={cardLayoutStyle(travelImg)}>
            <div css={memberName ? overlayStyle(true) : overlayStyle(false)}>
                    <div css={titleStyle} >{travelName}</div>
                    { memberName ? <div css={nameStyle}>{memberName}</div> : undefined}
                    <div css={accountStyle} >{accountNumber}</div>
                    <div css={balanceStyle} >
                        {currentBalance.toLocaleString()}원
                        {isHover &&
                        <div css={memberName ? hoverContainerStyle(true, leftPosition) : hoverContainerStyle(false, leftPosition)}>
                            <div>누적 입금 금액</div>
                            <div>{totalBalance.toLocaleString()}원</div>
                            <div css={triangleStyle}></div>
                        </div>
                        }
                        <img src={informationImage} onClick={handleClick} css={informationStyle} ref={imgRef} alt="" />
                    </div>
            </div>
        </div>
    )
}