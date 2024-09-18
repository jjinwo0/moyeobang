//

import React from 'react';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import SingleTravelLog from './SingleTravelLog';

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
  height: 100%;
  position: absolute;
  left: 24px;
  margin-top: 50px;
  z-index: 1; /* 낮은 값으로 설정 */
`;

export default function DaySchedules({
  daySchedules,
  dayNum,
}: {
  daySchedules: (PlusSelfSchedule | PaidAutoSchedule)[];
  dayNum: number;
}) {
  // onDragEnd 함수 추가
  const handleOnDragEnd = result => {
    // 드래그가 성공적으로 완료되지 않으면 아무 것도 하지 않음
    if (!result.destination) return;

    // 여기서 state를 업데이트하거나 다른 작업 수행 가능
    console.log('드래그 시작 위치:', result.source.index);
    console.log('드래그 종료 위치:', result.destination.index);
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
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{position: 'relative'}}
              >
                {daySchedules.map((schedule, index) => (
                  <Draggable
                    key={index}
                    draggableId={`schedule-${index}`}
                    index={index}
                  >
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          transform: provided.draggableProps.style?.transform,
                          top: 0, // 위치가 어긋나는 문제 해결
                          left: 0, // 추가 위치 속성 명시적으로 설정
                          position: 'relative', // position: relative 설정
                          height: '115px',
                        }}
                      >
                        <SingleTravelLog
                          schedule={schedule}
                          scheduleNum={index + 1}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
