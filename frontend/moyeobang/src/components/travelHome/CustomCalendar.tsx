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
  // 현재 선택한 월을 관리하는 상태
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());

  // 선택한 시작 및 종료 날짜를 관리하는 상태
  const [selection, setSelection] = useState<{
    start: Dayjs | null;
    end: Dayjs | null;
  }>({
    start: null,
    end: null,
  });

  // 현재 월의 시작 날짜와 끝 날짜 계산
  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week'); // 현재 달의 첫 번째 날짜부터 시작
  const endDate = endOfMonth.endOf('week'); // 현재 달의 마지막 날짜까지 계산

  // 이전 달로 이동하는 함수
  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
    // 현재 월을 1개월 감소시켜 이전 달로 설정
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
    // 현재 월을 1개월 증가시켜 다음 달로 설정
  };

  // 날짜 클릭 시 선택 범위를 처리하는 함수
  const handleDayClick = (day: Dayjs) => {
    if (!selection.start || (selection.start && selection.end)) {
      setSelection({start: day, end: null});
      // 시작 날짜를 선택하고, 종료 날짜를 비움
    } else {
      if (day.isBefore(selection.start, 'day')) {
        setSelection({start: day, end: selection.start});
        // 클릭한 날짜가 시작 날짜보다 이전이면, 시작 날짜로 설정
      } else {
        setSelection({start: selection.start, end: day});
        // 클릭한 날짜가 시작 날짜보다 이후일 경우 종료 날짜로 설정
      }
      if (selection.start) {
        onSelectRange(selection.start.toDate(), day.toDate());
        // 부모 컴포넌트로 선택된 날짜 범위 전달
        onClose(); // 달력 닫기
      }
    }
  };

  // 현재 달의 모든 날짜를 계산하여 배열에 추가
  const days = [];
  let currentDay = startDate;
  while (currentDay.isBefore(endDate, 'day')) {
    days.push(currentDay);
    currentDay = currentDay.add(1, 'day');
    // 하루씩 증가시켜 다음 날짜로 이동
  }

  return (
    <div css={calendarContainerStyle}>
      <div css={headerStyle}>
        <button onClick={handlePrevMonth}>이전</button> {/* 이전 달 버튼 */}
        <div>{currentMonth.format('YYYY년 MM월')}</div> {/* 현재 달 표시 */}
        <button onClick={handleNextMonth}>다음</button> {/* 다음 달 버튼 */}
      </div>
      <div css={daysStyle}>
        {/* 요일 표시 */}
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day} css={dayCellStyle}>
            {day}
          </div>
        ))}
        {/* 현재 달의 모든 날짜 표시 */}
        {days.map(day => {
          const isSelected =
            (selection.start && day.isSame(selection.start, 'day')) ||
            (selection.end && day.isSame(selection.end, 'day')) ||
            (selection.start &&
              selection.end &&
              day.isAfter(selection.start, 'day') &&
              day.isBefore(selection.end, 'day'));
          // 선택된 범위 내 날짜 강조 표시

          return (
            <div
              key={day.format('YYYY-MM-DD')}
              css={[dayCellStyle, isSelected && selectedDayStyle]}
              // 선택된 날짜에 스타일 적용
              onClick={() => handleDayClick(day)}
              // 날짜 클릭 시 handleDayClick 호출
            >
              {day.date()} {/* 날짜 숫자 표시 */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomCalendar;
