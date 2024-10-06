import React from "react";
import { css } from "@emotion/react";
import { colors } from "@/styles/colors";
import { useSuspenseQuery } from "@tanstack/react-query";
import moyeobang from "@/services/moyeobang";
import useCurrentTravelStore from "@/store/useCurrentTravelStore";
import useTravelDetailStore from "@/store/useTravelDetailStore";
import { useState } from "react";

const cardLayoutStyle = (travelImg:string) => css`
    width: 330px;
    height: 200px;
    margin-top: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${travelImg});
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-size: cover;
    position: relative;
    border-radius: 10px;
`;

const overlayStyle = css`
    position: absolute;
    box-sizing: border-box;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    z-index: 1;   
    border-radius: 10px; 
`;

const titleStyle = css`
    font-family: 'bold';
    font-size: 24px;
    color: ${colors.fifth};
`;

const accountNumberStyle = css`
    font-family: 'semibold';
    font-size: 15px;
    color: ${colors.strongGray};
`;

const locationLayoutStyle = css`
    display:flex;
    flex-direction:row;
    gap:5px;
`;

const locationStyle = css`
    font-family: 'semibold';
    font-size: 16px;
`;

const balanceStyle = css`
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;
    gap:10px;
    font-family: 'semibold';
    font-size: 20px; 
`;

const buttonStyle=css`
    width:60px;
    height:30px;
    border-radius:50px;
    font-family: 'regular';
    font-size: 16px; 
    border: solid 2px ${colors.gray};
    color:${colors.strongGray};
`;

interface PayCardProps {
    isHome:boolean;
}
export default function PayCard({isHome} : PayCardProps) {

    const [isHidden, setIsHidden] = useState<boolean>(false);
    const {travelName} = isHome ? useCurrentTravelStore() : useTravelDetailStore();
    const {startDate} = isHome ? useCurrentTravelStore() : useTravelDetailStore();
    const {endDate} = isHome ? useCurrentTravelStore() : useTravelDetailStore();
    const {travelPlaceList} = isHome ? useCurrentTravelStore() : useTravelDetailStore();
    const {accountId} = isHome ? useCurrentTravelStore() : useTravelDetailStore();
    const {travelImg} = isHome ? useCurrentTravelStore() : useTravelDetailStore();
    // const {accountNumber} = isHome ? useCurrentTravelStore() : useTravelDetailStore();
    
    // get 모임 통장 전체 잔액 
    const { data } = useSuspenseQuery({
        queryKey: ['accoutByGroup', accountId],
        queryFn: () => moyeobang.getAccountState(accountId),
    });

    const accountData = data.data.data;

    function handleClick() {
        setIsHidden(!isHidden);
    }

    return (

        <div css={cardLayoutStyle(travelImg)}>
            <div css={overlayStyle}>
                <div css={titleStyle}>{travelName}</div>
                <div css={accountNumberStyle}>{startDate}~{endDate}</div>
                {/* <div css={accountNumberStyle}>{accountNumber}</div> */}
                <div css={locationLayoutStyle}>{travelPlaceList.map((place, index) => {

                    if (index===travelPlaceList.length-1) {
                        return <div key={index} css={locationStyle}>{place} 여행</div>
                    } else {
                        return <div key={index} css={locationStyle}>{place},</div>
                    }
                }
                )}</div>
                <div css={balanceStyle}>
                    {isHidden ? '잔액 숨김': `${accountData.currentBalance.toLocaleString()}원`}
                    <button onClick={handleClick} css={buttonStyle}>{isHidden ? '보기' : '숨김'}</button>
                </div>
            </div>
        </div>
    )
}