import {css} from '@emotion/react';
import React, {useState} from 'react';
import HeaderWithXButton from '../common/Header/HeaderWithXbutton';
import {colors} from '@/styles/colors';
import LabeledInput from '../common/Inputs/LabeledInput';
import LocationInput from '../common/Inputs/LocationInput';
import QuizInput from '../common/Inputs/QuizInput';
import AuthVerification from './AuthVerification';
import Btn from '../common/btn/Btn';

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

function CreateTravel({onClose}: CreateTravelProps) {
  const [step, setStep] = useState<number>(1);

  const handleNextClick = () => {
    setStep(2); // "다음" 버튼 클릭 시 2단계(본인 인증)로 전환
  };

  const handleXClick = () => {
    onClose();
  };

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
              {/* 여기에 여행 이름, 기간, 장소 입력란을 묶어서 간격을 늘림 */}
              <div css={inputsContainerStyle}>
                <LabeledInput
                  label="여행이름"
                  placeholder="여행 이름을 입력하세요"
                />
                <LabeledInput
                  label="여행기간"
                  placeholder="여행 기간을 선택하세요"
                />
                <LocationInput
                  label="여행장소"
                  placeholder="여행 장소를 검색하세요"
                />
              </div>
              {/* 퀴즈 입력란은 다른 입력란들과 간격이 유지되도록 분리 */}
              <div css={quizStyle}>
                <QuizInput
                  title="초대퀴즈"
                  label="Q"
                  placeholder="김훈민의 별명은?"
                />
                <QuizInput label="A" placeholder="김훈남민" />
              </div>
            </div>

            <div css={btnContainerStyle}>
              {/* onClick 이벤트를 추가하여 handleNextClick 함수 호출 */}
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
