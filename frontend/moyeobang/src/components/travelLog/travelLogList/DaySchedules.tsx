import React from 'react';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import SingleTravelLog from './travelSingleCard/SingleTravelLog';
import {useTravelLogContext} from '@/contexts/TravelLog';

const travelDayTitleSytle = css`
  margin-top: 5px;
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
  height: 100%;
  position: absolute;
  left: 24px;
  margin-top: 60px;
  z-index: 1; /* 낮은 값으로 설정 */
`;

export default function DaySchedules({
  daySchedules,
  dayNum,
}: {
  daySchedules: (PlusSelfSchedule | PaidAutoSchedule)[];
  dayNum: number;
}) {
  const {travelSchedules, setTravelSchedules} = useTravelLogContext();
  // onDragEnd 함수 추가
  const handleOnDragEnd = (result: any) => {
    const {source, destination} = result;

    // 드래그가 성공적으로 완료되지 않으면 아무 것도 하지 않음
    if (!destination) return;

    const dayId = dayNum - 1; // dayNum을 기준으로 배열 index로 사용 (0부터 시작하도록)

    // travelSchedules의 깊은 복사본을 생성하여 불변성 유지
    const updatedTravelSchedules = [...travelSchedules];

    // 현재 dayId의 스케줄을 가져옴
    const currentDaySchedules = Array.from(updatedTravelSchedules[dayId]);

    // 드래그된 항목을 source에서 제거하고 destination으로 삽입
    const [movedItem] = currentDaySchedules.splice(source.index, 1);
    currentDaySchedules.splice(destination.index, 0, movedItem);

    // 변경된 스케줄을 updatedTravelSchedules에 다시 할당
    updatedTravelSchedules[dayId] = currentDaySchedules;

    // 상태 업데이트
    setTravelSchedules(updatedTravelSchedules);
    // [todo] 순서 변경된 travelSchedules api로 전달하기

    console.log('드래그 시작 위치:', source.index);
    console.log('드래그 종료 위치:', destination.index);
  };
  return (
    <>
      <span css={verticalLineStyle}></span>
      <div css={travelDayTitleSytle}>
        <span css={dayIdStyle}> DAY {dayNum} </span>
        <span css={dayDateStyle}>09.01 (일)</span>
      </div>
      <div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {' '}
          {/* onDragEnd 추가 */}
          <Droppable droppableId="daySchedules">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {daySchedules.map((schedule, index) => {
                  return (
                    <Draggable
                      key={`schedule-${'scheduleId' in schedule ? schedule.scheduleId : schedule.transactionId}`}
                      draggableId={`schedule-${'scheduleId' in schedule ? schedule.scheduleId : schedule.transactionId}`}
                      index={index}
                    >
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            transform: provided.draggableProps.style?.transform,
                            top: 0,
                            left: 0,
                            position: 'relative',
                          }}
                        >
                          <SingleTravelLog
                            schedule={schedule}
                            scheduleNum={index + 1}
                            dayNum={dayNum}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
