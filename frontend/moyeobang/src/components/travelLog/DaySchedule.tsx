import React from 'react';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';

const travelLogListLayout = css`
  height: 473px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  border-top-right-radius: 45px;
  border-top-left-radius: 45px;
  background-color: ${colors.white};
`;

const travelDayTitleSytle = css`
  margin-top: 2px;
  padding: 13px;
  padding-left: 22px;
  align-content: end;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const dayIdStyle = css`
  font-family: 'englishbold';
  font-size: 24px;
  color: ${colors.fifth};
  line-height: 1;
`;

const dayDateStyle = css`
  font-size: 18px;
  color: ${colors.lightBlack};
  line-height: 1;
`;

const verticalLineStyle = css`
  border-left: 2px solid ${colors.lightGray};
  height: 100%; /* 필요에 따라 길이를 조정하세요 */
  position: absolute; /* 위치를 고정할 경우 사용 */
  left: 24px; /* 세로선의 위치를 조정할 수 있습니다 */
  margin-top: 50px;
`;

export default function DaySchedule({
  daySchedules,
  dayNum,
}: {
  daySchedules: PlusSelfSchedule | PaidAutoSchedule;
  dayNum: number;
}) {
  return (
    <div css={travelLogListLayout}>
      <span css={verticalLineStyle}></span>
      <div css={travelDayTitleSytle}>
        <span css={dayIdStyle}> DAY {dayNum} </span>
        <span css={dayDateStyle}>09.01 (일)</span>
      </div>
    </div>
  );
}
