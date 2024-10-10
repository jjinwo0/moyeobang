/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React, {useState} from 'react';
import {colors} from '@/styles/colors';
import CalculateBtn from './CalculateBtn';
import PublicDeposit from './PublicDeposit';
import PersonalDeposit from './PersonalDeposit';
import useTravelDetailStore from '@/store/useTravelDetailStore';

const messageStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; /* 화면 하단에 고정 */
  box-sizing: border-box;
  background-color: white;
  border: ${colors.third} solid 2px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  height: 174px;
  letter-spacing: -0.25px;
  margin-top: 6.8px;
  padding: 10px 8px;
  width: 100%;
  max-width: 390px;
  z-index: 2000; /* Navbar 위에 나타나도록 z-index 설정 */
  text-align: center;
  bottom: 125px; /* Navbar 위에 위치하도록 조정 */
  left: 50%;
  transform: translateX(-50%); //중간에 위치하기 위해 left, tranform 속석 사용

  &:after {
    border-color: transparent transparent white transparent;
    border-style: solid;
    border-width: 0px 8.5px 18px 8.5px; /* 삼각형 크기 */
    content: '';
    display: block;
    left: 50%; /* 가운데 정렬 */
    transform: translateX(-50%) rotate(180deg); /* 가운데 정렬 및 회전 */
    position: absolute;
    bottom: -17px;
    width: 0;
    z-index: 1;
  }

  &:before {
    border-color: transparent transparent ${colors.third} transparent;
    border-style: solid;
    border-width: 0 10px 19px 10px; /* 테두리 삼각형 크기 */
    content: '';
    display: block;
    left: 50%; /* 가운데 정렬 */
    transform: translateX(-50%) rotate(180deg); /* 가운데 정렬 및 회전 */
    position: absolute;
    bottom: -19px;
    width: 0;
    z-index: 0;
  }
`;
// const totalAmount: TotalAmount = 1000;
// const travelName: TravelName = '아기돼지오형제';

export default function CalculatePopup({onCalClick}:{onCalClick:()=>void}) {
  const {travelName} = useTravelDetailStore();
  const [showModal, setShowModal] = useState('calculateBtn');
  return (
    <>
      <div css={messageStyle}>
        {showModal === 'calculateBtn' && (
          <CalculateBtn setShowModal={setShowModal} />
        )}
        {showModal === 'publicDeposit' && (
          <PublicDeposit
            travelName={travelName}
            onCalClick={onCalClick}
          ></PublicDeposit>
        )}
        {showModal === 'personalDeposit' && (
          <PersonalDeposit travelName={travelName} onCalClick={onCalClick}></PersonalDeposit>
        )}
      </div>
    </>
  );
}
