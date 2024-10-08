import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"
import { colors } from "@/styles/colors";
import { useSwipeable } from "react-swipeable";
import AccountCard from "../AccountCard/AccountCard";
import ChartCard from "../Chart/ChartCard";
import { isAccountBalanceByGroup } from "@/util/typeGaurd";
import { SwipeEventData } from "react-swipeable";

const sliderStyle= (activeCardIndex : number) => css`
    transform: translateX(-${activeCardIndex * 1}px);
    position: relative;
`;

const dotsContainerStyle=css`
  width:100%;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  gap:5px;
  position:absolute;
  bottom:10px;
  z-index:9999;
`;

const dotStyle= (isActive:boolean) => css`
  width: ${isActive ? '12px' : '10px'};
  height: ${isActive ? '12px' : '10px'};
  background-color: ${isActive ? colors.third : colors.gray};
  border-radius:50%;
  bottom:0;
`;

interface CardSliderProps {
    onChange : (page : number) => void;
    dots : number[];
    account : AccountBalanceByGroup | AccountBalanceBymemberId;
    consumptionProportionByCategory : ConsumptionProportionByCategory[];
    consumptionProportionByMember? : ConsumptionProportionByMember[];
};

// 1: 결제 후 현재 잔액 카드, 2 :카테고리 막대그래프 카드, 3 : 회원별 막대그래프 카드
export default function CardSlider({dots, account, consumptionProportionByCategory, consumptionProportionByMember, onChange}:CardSliderProps) {

    const [activeCardIndex, setActiveCardIndex] = useState(0);

    // 상단의 프로필 선택 변하면 카드 처음으로 돌아오기
    useEffect(()=> {
        setActiveCardIndex(0);
    }, [account])

    // 
    useEffect(()=>{
        onChange(activeCardIndex)
    }, [activeCardIndex])

    function handleSwipe(eventData:SwipeEventData) {
        if (eventData.dir==='Left') {
            // 왼쪽 스와이프 => 다음 카드로 이동
            setActiveCardIndex((preIndex) => Math.min(preIndex+1, dots.length-1));

        } else if (eventData.dir === 'Right') {
            // 오른쪽 스와이프 => 이전 카드로 ㅜ이동
            setActiveCardIndex((prevIndex) => Math.max(prevIndex-1, 0))
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleSwipe,
        onSwipedRight:handleSwipe,
        preventScrollOnSwipe : true,
        trackMouse:true // 마우스 드래그로도 스와이프 감지
    })

    return (
        <div {...swipeHandlers} css={sliderStyle(activeCardIndex)}>
            <>
              {activeCardIndex === 0 && (
                <AccountCard
                  currentBalance={isAccountBalanceByGroup(account) ? account.currentBalance : account.personalCurrentBalance}
                  totalBalance={isAccountBalanceByGroup(account) ? account.totalAmount : account.personalTotalAmount}
                  memberName={isAccountBalanceByGroup(account) ? undefined : account.simpleUserProfile.memberName}
                />
              )}
              {activeCardIndex === 1 &&
              <ChartCard 
                title={isAccountBalanceByGroup(account) ? '전체 소비 금액' : `${account.simpleUserProfile.memberName} 소비 금액`} 
                money={isAccountBalanceByGroup(account) ? Number(account.totalSpent) : account.personalTotalSpent} 
                data={consumptionProportionByCategory} 
              />}
              {activeCardIndex === 2 && isAccountBalanceByGroup(account) && consumptionProportionByMember &&
              <ChartCard 
                title={'전체 소비 금액'}
                money={Number(account.totalSpent)}
                data={consumptionProportionByMember}
                />}
            </>
          <div css={dotsContainerStyle}>
            {dots.map((_, index) => (
              <div key={index} css={dotStyle(index === activeCardIndex)}></div>
            ))}
          </div>
        </div>
      );
}