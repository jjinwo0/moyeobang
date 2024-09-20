import React, {useState} from 'react';
import {css} from '@emotion/react';
import dayjs, {Dayjs} from 'dayjs';
import oneArrow from '@/assets/icons/oneLeftArrow.png';
import {colors} from '@/styles/colors';
import Btn from '../common/btn/Btn';

interface CustomCalendarProps {
  onSelectRange: (start: Date, end: Date) => void;
  onClose: () => void;
  selectedRange: {start: Date | null; end: Date | null};
}

const calendarContainerStyle = css`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  background-color: white;
  z-index: 1001;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  font-family: 'semibold';
`;

const daysStyle = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-family: 'medium';
`;

const dayCellStyle = css`
  aspect-ratio: 1 / 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const outsideCurrentMonthStyle = css`
  color: ${colors.gray} !important; /* 회색으로 표시 */
`;

const sundayStyle = css`
  color: ${colors.customRed}; /* 일요일 색상 */
`;

const saturdayStyle = css`
  color: ${colors.customBlue}; /* 토요일 색상 */
`;

const prevStyle = css`
  width: 10px;
  transform: scaleX(-1);
  margin-left: 5px;
`;

const nextStyle = css`
  width: 10px;
  margin-right: 5px;
`;

const dayFontStyle = css`
  font-family: 'english';
  padding: 8px;
  cursor: pointer;
`;

const selectedStartDayStyle = css`
  background-color: ${colors.second};
  color: white;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
`;

const selectedEndDayStyle = css`
  background-color: ${colors.second};
  color: white;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
`;

const middleDayStyle = css`
  background-color: ${colors.second};
  color: white;
  border-radius: 0; /* 중간 날짜는 네모로 */
`;

const btnStyle = css`
  margin: 5px 0;
`;

export default function CustomCalendar({
  onSelectRange,
  onClose,
  selectedRange,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selection, setSelection] = useState<{
    start: Dayjs | null;
    end: Dayjs | null;
  }>({
    start: selectedRange.start ? dayjs(selectedRange.start) : null,
    end: selectedRange.end ? dayjs(selectedRange.end) : null,
  });

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const handleDayClick = (day: Dayjs) => {
    if (!selection.start || (selection.start && selection.end)) {
      setSelection({start: day, end: null});
    } else if (day.isBefore(selection.start)) {
      setSelection({start: day, end: selection.start});
    } else {
      setSelection({start: selection.start, end: day});
      onSelectRange(selection.start.toDate(), day.toDate());
      // onClose();
    }
  };

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const days = [];
  let currentDay = startDate;
  while (currentDay.isBefore(endDate.add(1, 'day'), 'day')) {
    days.push(currentDay);
    currentDay = currentDay.add(1, 'day');
  }

  return (
    <div css={calendarContainerStyle}>
      <div css={headerStyle}>
        <img src={oneArrow} onClick={handlePrevMonth} css={prevStyle} />
        <div>{currentMonth.format('YYYY년 MM월')}</div>
        <img src={oneArrow} onClick={handleNextMonth} css={nextStyle} />
      </div>
      <div css={daysStyle}>
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            css={[
              dayCellStyle,
              index === 0 && sundayStyle, // 일요일 스타일 적용
              index === 6 && saturdayStyle, // 토요일 스타일 적용
            ]}
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          const isStart = selection.start && day.isSame(selection.start, 'day');
          const isEnd = selection.end && day.isSame(selection.end, 'day');
          const isMiddle =
            selection.start &&
            selection.end &&
            day.isAfter(selection.start, 'day') &&
            day.isBefore(selection.end, 'day');

          const isOutsideCurrentMonth = !day.isSame(currentMonth, 'month'); // 현재 월에 속하지 않는 날짜 체크
          const isSunday = day.day() === 0; // 일요일
          const isSaturday = day.day() === 6; // 토요일

          return (
            <div
              key={day.format('YYYY-MM-DD')}
              css={[
                dayFontStyle,
                isOutsideCurrentMonth && outsideCurrentMonthStyle, // 현재 월이 아닌 날짜 회색 스타일 적용
                isSunday && sundayStyle, // 일요일 스타일
                isSaturday && saturdayStyle, // 토요일 스타일
                isStart && selectedStartDayStyle,
                isEnd && selectedEndDayStyle,
                isMiddle && middleDayStyle,
              ]}
              onClick={() => handleDayClick(day)}
            >
              {day.date()}
            </div>
          );
        })}
      </div>
      <div css={btnStyle}>
        <Btn
          buttonStyle={{style: 'blue', size: 'thinMiddle'}}
          onClick={onClose}
        >
          날짜 확인
        </Btn>
      </div>
    </div>
  );
}
