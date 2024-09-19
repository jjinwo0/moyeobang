import React from 'react';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import {DraggableProvidedDragHandleProps} from 'react-beautiful-dnd';
import blueCheck from '@/assets/icons/blueCheck.png';
import hamburgerBtn from '@/assets/icons/hamburgerButton.png';
import doubleDown from '@/assets/icons/doubleDown.png';

const scheduleCardLayout = css`
  height: 140px;
  width: 390px;
  display: flex;
  align-items: center;
`;

const checkBoxStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 60px;
  margin: 5px;
  background-color: ${colors.white};
  position: relative;
  z-index: 5;
`;

const scheduleLetterLayout = css`
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-family: 'semibold';
`;

const scheduleLetterStyle = css`
  width: 286px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const oneLineStyle = css`
  display: flex;
  gap: 10px;
`;

export default function PaidAutoSchedule({
  schedule,
  scheduleNum,
  dayNum,
  dragHandleProps,
}: {
  schedule: PaidAutoSchedule;
  scheduleNum: number;
  dayNum: number;
  dragHandleProps: any;
}) {
  const getTimeFromSchedule = (scheduleTime: string) => {
    return scheduleTime.split('T')[1].slice(0, 5); // "T" 이후의 시간 부분에서 앞 5글자만 추출 ("HH:MM")
  };

  console.log(dragHandleProps);

  return (
    <div css={scheduleCardLayout}>
      <div css={checkBoxStyle}>
        <img
          src={blueCheck}
          alt="체크리스트"
          style={{width: '30px', height: '30px', margin: '5px'}}
        />
        <span
          style={{
            fontSize: '12px',
            marginBottom: '5px',
            color: colors.lightBlack,
          }}
        >
          {getTimeFromSchedule(schedule.paymentTime)}
        </span>
      </div>
      <div css={scheduleLetterLayout}>
        <div css={scheduleLetterStyle}>
          <div style={{fontSize: '24px'}}>
            {scheduleNum}. {schedule.details}
          </div>
          <div css={oneLineStyle}>
            <span>결제 비용</span>{' '}
            <span style={{color: colors.fifth}}>
              {' '}
              {schedule.amount.toLocaleString()}원
            </span>
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <img src={doubleDown} alt="아래로 당기기" />
          </div>
        </div>
      </div>
      <div>
        <img
          style={{width: '16px', cursor: 'grab'}}
          src={hamburgerBtn}
          alt="일정 이동 버튼"
          {...dragHandleProps} // 여기서 dragHandleProps 적용
        />
      </div>
    </div>
  );
}
