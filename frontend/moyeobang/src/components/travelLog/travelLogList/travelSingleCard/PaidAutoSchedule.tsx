import React from 'react';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import {useRouter} from '@tanstack/react-router';
import {DraggableProvidedDragHandleProps} from 'react-beautiful-dnd';
import Btn from '@/components/common/btn/Btn';
import blueCheck from '@/assets/icons/blueCheck.png';
import hamburgerBtn from '@/assets/icons/hamburgerButton.png';

const scheduleCardLayout = css`
  width: 380px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  border-radius: 10px;
  box-shadow:
    0 3px 3px rgba(0, 0, 0, 0.2),
    0 -3px 3px rgba(0, 0, 0, 0.2);
  padding: 5px 0;
  background-color: white;
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

  const router = useRouter();
  const handleDetailClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    transactionId: Id
  ) => {
    e.stopPropagation();
    router.navigate({to: `/account/detail/${transactionId}`});
  };

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
            {scheduleNum}. {schedule.paymentName}
          </div>
          <div css={oneLineStyle}>
            <span>결제 비용</span>{' '}
            <span style={{color: colors.fifth}}>
              {' '}
              {schedule.totalPrice.toLocaleString()}원
            </span>
          </div>
          <div>
            {/* 정산된 인원 보여주기 */}
            <div>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}
              >
                <div>정산 참여자 : {schedule.participantsInfo.length}명</div>
                <Btn
                  buttonStyle={{size: 'sotiny', style: 'blue'}}
                  onClick={e => {
                    handleDetailClick(e, schedule.transactionId);
                  }}
                >
                  상세보기
                </Btn>
              </div>
              {/* [todo] 향후에는 zustand에서 participantsInfo[].length와 동일하다면 전체 프로필을 보여주고*/}
              {/* 다른 경우에는 해당 인원의 프로필만 보여주기 */}
              {/* <div>{schedule.matchedTransaction.participantsInfo.length}</div> */}
              <div>
                {/* {schedule.participantsInfo.map(
                  (participant: ParticipantInfo, index: number) => (
                    <img
                      key={index}
                      src={participant.profileImage}
                      alt={`${participant.memberName}'s profile`}
                      style={{
                        width: '40px',
                        height: '40px',
                        marginTop: '5px',
                        marginRight: '5px',
                        borderRadius: '45px',
                        border: `2px solid ${colors.third}`,
                      }}
                    />
                  )
                )} */}
              </div>
            </div>
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
