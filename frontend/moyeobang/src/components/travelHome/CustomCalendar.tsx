import React, {useState} from 'react';
import {css} from '@emotion/react';
import dayjs, {Dayjs} from 'dayjs';

interface CustomCalendarProps {
  onSelectRange: (start: Date, end: Date) => void;
  onClose: () => void;
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
`;

const daysStyle = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

const dayCellStyle = css`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const selectedDayStyle = css`
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
`;

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  onSelectRange,
  onClose,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selection, setSelection] = useState<{
    start: Dayjs | null;
    end: Dayjs | null;
  }>({
    start: null,
    end: null,
  });

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const handleDayClick = (day: Dayjs) => {
    if (!selection.start || (selection.start && selection.end)) {
      setSelection({start: day, end: null});
    } else {
      if (day.isBefore(selection.start, 'day')) {
        setSelection({start: day, end: selection.start});
      } else {
        setSelection({start: selection.start, end: day});
      }
      if (selection.start) {
        onSelectRange(selection.start.toDate(), day.toDate());
        onClose();
      }
    }
  };

  const days = [];
  let currentDay = startDate;

  while (currentDay.isBefore(endDate, 'day')) {
    days.push(currentDay);
    currentDay = currentDay.add(1, 'day');
  }

  return (
    <div css={calendarContainerStyle}>
      <div css={headerStyle}>
        <button onClick={handlePrevMonth}>이전</button>
        <div>{currentMonth.format('YYYY년 MM월')}</div>
        <button onClick={handleNextMonth}>다음</button>
      </div>
      <div css={daysStyle}>
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day} css={dayCellStyle}>
            {day}
          </div>
        ))}
        {days.map(day => {
          const isSelected =
            (selection.start && day.isSame(selection.start, 'day')) ||
            (selection.end && day.isSame(selection.end, 'day')) ||
            (selection.start &&
              selection.end &&
              day.isAfter(selection.start, 'day') &&
              day.isBefore(selection.end, 'day'));

          return (
            <div
              key={day.format('YYYY-MM-DD')}
              css={[dayCellStyle, isSelected && selectedDayStyle]}
              onClick={() => handleDayClick(day)}
            >
              {day.date()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
