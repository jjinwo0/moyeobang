// import {css} from '@emotion/react';
// import React, {useState} from 'react';
// import HeaderWithXButton from '../common/Header/HeaderWithXbutton';
// import {colors} from '@/styles/colors';
// import LabeledInput from '../common/Inputs/LabeledInput';
// import LocationInput from '../common/Inputs/LocationInput';
// import QuizInput from '../common/Inputs/QuizInput';
// import AuthVerification from './AuthVerification';
// import Btn from '../common/btn/Btn';
// import addTravelPhoto from '@/assets/icons/addTravelPhoto.png';
// import calendar from '@/assets/icons/calendar.png';

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// interface CreateTravelProps {
//   onClose: () => void; // 모달을 닫는 함수
// }

// const modalStyle = css`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: white;
//   z-index: 10000;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
// `;

// const contentStyle = css`
//   padding: 20px;
//   flex-grow: 1; /* 남는 공간을 차지하게 만듦 */
//   display: flex;
//   flex-direction: column;
// `;

// const titleStyle = css`
//   display: flex;
//   justify-content: center;
//   margin: 40px 0;
//   font-family: 'bold';
//   font-size: 24px;
// `;

// const titleBlue = css`
//   color: ${colors.fifth};
// `;

// const travelStyle = css`
//   font-family: 'regular';
//   font-size: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 20px;
//   flex-grow: 1; /* 여행 관련 입력란들이 남는 공간을 차지하고 버튼을 아래로 밀어냄 */
// `;

// const inputsContainerStyle = css`
//   display: flex;
//   flex-direction: column;
//   gap: 30px; /* 입력란들 사이의 간격을 30px로 설정 */
// `;

// const inputWithIconStyle = css`
//   display: flex;
//   align-items: center;
//   position: relative;
// `;

// const calendarIconStyle = css`
//   position: absolute;
//   right: 20px;
//   top: 65%;
//   transform: translateY(-50%);
//   width: 24px;
//   height: 24px;
// `;

// const inputStyleWithIcon = css`
//   padding-right: 40px; /* 아이콘 공간을 확보하기 위해 패딩 추가 */
//   width: 100%;
// `;

// const quizStyle = css`
//   display: flex;
//   flex-direction: column;
//   gap: 20px; /* 퀴즈 입력란들 사이의 간격을 20px로 설정 */
//   margin-top: 10px;
// `;

// const btnContainerStyle = css`
//   display: flex;
//   justify-content: flex-end;
//   margin-top: auto; /* 버튼을 아래로 배치 */
//   margin-bottom: 45px;
//   margin-right: 10px;
// `;

// const photoStyle = css`
//   font-family: 'regular';
//   align-self: flex-start; /* 사진 글씨를 왼쪽으로 정렬 */
//   margin-left: 15px;
//   margin-top: 10px;

//   display: flex; /* 텍스트와 이미지를 수평으로 배치 */
//   align-items: center; /* 텍스트와 이미지를 수평으로 맞춤 */

//   img {
//     width: 30px;
//     height: 30px;
//     margin-left: 10px;
//     // margin-top: 1px; /* 이미지에만 margin-top 적용 */
//     margin-bottom: 3px;
//   }
// `;

// function CreateTravel({onClose}: CreateTravelProps) {
//   const [step, setStep] = useState<number>(1);
//   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
//     null,
//     null,
//   ]); // 날짜 범위
//   const [startDate, endDate] = dateRange; // 시작일과 종료일

//   const handleNextClick = () => {
//     setStep(2); // "다음" 버튼 클릭 시 2단계(본인 인증)로 전환
//   };

//   const handleXClick = () => {
//     onClose();
//   };

//   const handleCalendarClick = () => {
//     // 캘린더 아이콘 클릭 시 DatePicker가 열리도록 포커스
//     const input = document.getElementById('datepicker') as HTMLElement;
//     input?.focus(); // input에 포커스를 주어 DatePicker 열기
//   };

//   return (
//     <div css={modalStyle}>
//       <HeaderWithXButton onXClick={handleXClick} />
//       <div css={contentStyle}>
//         <div css={titleStyle}>
//           <span>여행</span>
//           <span css={titleBlue}>만들어방</span>
//         </div>

//         {step === 1 ? (
//           <>
//             <div css={travelStyle}>
//               <div css={inputsContainerStyle}>
//                 <LabeledInput
//                   label="여행이름"
//                   placeholder="여행 이름을 입력하세요"
//                 />
//                 <div css={inputWithIconStyle}>
//                   <DatePicker
//                     selected={startDate}
//                     onChange={(update: [Date | null, Date | null]) =>
//                       setDateRange(update)
//                     }
//                     startDate={startDate}
//                     endDate={endDate}
//                     selectsRange
//                     placeholderText="여행 기간을 선택하세요"
//                     customInput={
//                       <LabeledInput
//                         label="여행기간"
//                         placeholder="여행 기간을 선택하세요"
//                       />
//                     } // LabeledInput을 커스텀 input으로 사용
//                   />
//                   <img
//                     src={calendar}
//                     css={calendarIconStyle}
//                     onClick={() => {
//                       const input = document.querySelector(
//                         '.react-datepicker__input-container input'
//                       ) as HTMLElement;
//                       input?.focus();
//                     }} // 캘린더 아이콘 클릭 시 DatePicker가 열리도록 함
//                   />
//                 </div>
//                 <LocationInput
//                   label="여행장소"
//                   placeholder="여행 장소를 검색하세요"
//                 />
//               </div>

//               <div css={quizStyle}>
//                 <QuizInput
//                   title="초대퀴즈"
//                   label="Q"
//                   placeholder="김훈민의 별명은?"
//                 />
//                 <QuizInput label="A" placeholder="김훈남민" />
//               </div>

//               <div css={photoStyle}>
//                 <span>사진</span>
//                 <img src={addTravelPhoto} />
//               </div>
//             </div>

//             <div css={btnContainerStyle}>
//               <Btn
//                 buttonStyle={{style: 'blue', size: 'small'}}
//                 onClick={handleNextClick}
//               >
//                 다음
//               </Btn>
//             </div>
//           </>
//         ) : (
//           <AuthVerification />
//         )}
//       </div>
//     </div>
//   );
// }

// export default CreateTravel;

// src/components/CreateTravel.tsx

import {css} from '@emotion/react';
import React, {useState, useRef, useEffect} from 'react';
import HeaderWithXButton from '../common/Header/HeaderWithXbutton';
import {colors} from '@/styles/colors';
import LabeledInput from '../common/Inputs/LabeledInput';
import LocationInput from '../common/Inputs/LocationInput';
import QuizInput from '../common/Inputs/QuizInput';
import AuthVerification from './AuthVerification';
import Btn from '../common/btn/Btn';
import addTravelPhoto from '@/assets/icons/addTravelPhoto.png';
import calendarIcon from '@/assets/icons/calendar.png';

import CustomCalendar from './CustomCalendar';
import dayjs from 'dayjs';

interface CreateTravelProps {
  onClose: () => void; // 모달을 닫는 함수
}

const modalStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const contentStyle = css`
  padding: 20px;
  flex-grow: 1; /* 남는 공간을 차지하게 만듦 */
  display: flex;
  flex-direction: column;
  position: relative; /* 달력 포지셔닝을 위해 relative 설정 */
`;

const titleStyle = css`
  display: flex;
  justify-content: center;
  margin: 40px 0;
  font-family: 'bold';
  font-size: 24px;
`;

const titleBlue = css`
  color: ${colors.fifth};
`;

const travelStyle = css`
  font-family: 'regular';
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex-grow: 1; /* 여행 관련 입력란들이 남는 공간을 차지하고 버튼을 아래로 밀어냄 */
`;

const inputsContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 30px; /* 입력란들 사이의 간격을 30px로 설정 */
`;

const inputWithIconStyle = css`
  display: flex;
  align-items: center;
  position: relative;
`;

const calendarIconStyle = css`
  position: absolute;
  right: 20px;
  top: 65%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const quizStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 퀴즈 입력란들 사이의 간격을 20px로 설정 */
  margin-top: 10px;
`;

const btnContainerStyle = css`
  display: flex;
  justify-content: flex-end;
  margin-top: auto; /* 버튼을 아래로 배치 */
  margin-bottom: 45px;
  margin-right: 10px;
`;

const photoStyle = css`
  font-family: 'regular';
  align-self: flex-start; /* 사진 글씨를 왼쪽으로 정렬 */
  margin-left: 15px;
  margin-top: 10px;

  display: flex; /* 텍스트와 이미지를 수평으로 배치 */
  align-items: center; /* 텍스트와 이미지를 수평으로 맞춤 */

  img {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    /* margin-top: 1px; /* 이미지에만 margin-top 적용 */
    margin-bottom: 3px;
  }
`;

function CreateTravel({onClose}: CreateTravelProps) {
  const [step, setStep] = useState<number>(1);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]); // 날짜 범위
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false); // 달력 표시 상태

  const handleNextClick = () => {
    setStep(2); // "다음" 버튼 클릭 시 2단계(본인 인증)로 전환
  };

  const handleXClick = () => {
    onClose();
  };

  const handleCalendarClick = () => {
    setIsCalendarOpen(prev => !prev); // 달력 표시/숨기기 토글
  };

  const handleSelectRange = (start: Date, end: Date) => {
    setDateRange([start, end]);
    setIsCalendarOpen(false); // 달력 닫기
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.custom-calendar') &&
      !target.closest('#calendar-icon')
    ) {
      setIsCalendarOpen(false);
    }
  };

  useEffect(() => {
    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

  return (
    <div css={modalStyle}>
      <HeaderWithXButton onXClick={handleXClick} />
      <div css={contentStyle}>
        <div css={titleStyle}>
          <span>여행</span>
          <span css={titleBlue}>만들어방</span>
        </div>

        {step === 1 ? (
          <>
            <div css={travelStyle}>
              <div css={inputsContainerStyle}>
                <LabeledInput
                  label="여행이름"
                  placeholder="여행 이름을 입력하세요"
                />
                <div css={inputWithIconStyle}>
                  <LabeledInput
                    label="여행기간"
                    placeholder={
                      dateRange[0] && dateRange[1]
                        ? `${dayjs(dateRange[0]).format('YYYY-MM-DD')} ~ ${dayjs(
                            dateRange[1]
                          ).format('YYYY-MM-DD')}`
                        : '여행 기간을 선택하세요'
                    }
                    readOnly
                    onClick={handleCalendarClick}
                  />
                  <img
                    src={calendarIcon}
                    css={calendarIconStyle}
                    id="calendar-icon"
                    onClick={handleCalendarClick} // 달력 아이콘 클릭 시 달력 표시
                  />
                  {isCalendarOpen && (
                    <div className="custom-calendar">
                      <CustomCalendar
                        onSelectRange={handleSelectRange}
                        onClose={() => setIsCalendarOpen(false)}
                      />
                    </div>
                  )}
                </div>
                <LocationInput
                  label="여행장소"
                  placeholder="여행 장소를 검색하세요"
                />
              </div>

              <div css={quizStyle}>
                <QuizInput
                  title="초대퀴즈"
                  label="Q"
                  placeholder="김훈민의 별명은?"
                />
                <QuizInput label="A" placeholder="김훈민" />
              </div>

              <div css={photoStyle}>
                <span>사진</span>
                <img src={addTravelPhoto} alt="Add Photo" />
              </div>
            </div>

            <div css={btnContainerStyle}>
              <Btn
                buttonStyle={{style: 'blue', size: 'small'}}
                onClick={handleNextClick}
              >
                다음
              </Btn>
            </div>
          </>
        ) : (
          <AuthVerification />
        )}
      </div>
    </div>
  );
}

export default CreateTravel;
