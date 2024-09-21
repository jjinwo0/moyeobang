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
import useModalStore from '@/store/useModalStore';

import CustomCalendar from './CustomCalendar';
import dayjs from 'dayjs';

interface CreateTravelProps {
  onClose: () => void; // 모달을 닫는 함수
  isEditMode?: boolean; // 수정 모드 여부
  initialData?: {
    // 수정 모드일 때의 초기 데이터
    travelName?: string;
    travelPlaceList?: string[];
    quizQuestion?: string;
    quizAnswer?: string;
    startDate?: Date | null; // startDate 추가
    endDate?: Date | null; // endDate 추가
    selectedImage?: string | null;
  };
  onSubmit?: () => void; // 수정 버튼 클릭 시 실행할 함수
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
  margin-left: 3px;
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

// 사진 스타일을 동적으로 설정하는 함수로 변경
const photoStyle = (selectedImage: string | null) => css`
  font-family: 'regular';
  align-self: flex-start; /* 사진 글씨를 왼쪽으로 정렬 */
  margin-left: 15px;
  margin-top: 10px;

  display: flex; /* 텍스트와 이미지를 수평으로 배치 */
  align-items: center; /* 텍스트와 이미지를 수평으로 맞춤 */

  img {
    width: ${selectedImage
      ? '100px'
      : '30px'}; /* 선택된 이미지가 있으면 100px로 크기 확대 */
    height: ${selectedImage ? '100px' : '30px'};
    margin-left: 10px;
    cursor: pointer; /* 클릭 가능하게 설정 */
    object-fit: cover; /* 이미지 크기에 맞게 조정 */
  }
`;

export default function CreateTravel({
  onClose,
  isEditMode = false, // 기본값은 false로 설정 (생성 모드)
  initialData = {}, // 기본값을 빈 객체로 설정하여 생성 모드에서 문제가 없도록 처리
  onSubmit, // 수정 시의 함수
}: CreateTravelProps) {
  const {closeModal} = useModalStore();
  //인풋값들 상태
  const [travelName, setTravelName] = useState<string>(
    initialData.travelName || ''
  );
  const [travelPlaceList, setTravelPlaceList] = useState<string[]>(
    initialData.travelPlaceList || []
  );
  const [quizQuestion, setQuizQuestion] = useState<string>(
    initialData.quizQuestion || ''
  );
  const [quizAnswer, setQuizAnswer] = useState<string>(
    initialData.quizAnswer || ''
  );
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(
    initialData.dateRange || [
      initialData.startDate || null,
      initialData.endDate || null,
    ]
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(
    initialData.selectedImage || null
  );

  const [step, setStep] = useState<number>(1); // Step 상태
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 수정과 생성을 구분하여 처리
  const handleNextClick = () => {
    if (isEditMode) {
      // 수정 모드일 때는 onSubmit 함수 호출
      onClose();
      // onSubmit();
    } else {
      console.log('여행 이름:', travelName);
      console.log('여행 장소:', travelPlaceList);
      console.log('여행 시작:', dateRange[0]);
      console.log('여행 끝:', dateRange[1]);
      console.log('퀴즈 질문:', quizQuestion);
      console.log('퀴즈 답변:', quizAnswer);
      setStep(2); // 생성 모드일 때 다음 단계로 이동
    }
  };

  const handleCalendarClick = () => {
    setIsCalendarOpen(prev => !prev); // 달력 표시/숨기기 토글
  };

  // const handleSelectRange = (start: Date, end: Date) => {
  //   setDateRange([start, end]);
  //   setIsCalendarOpen(false); // 달력 닫기
  // };

  const handlePhotoClick = () => {
    fileInputRef.current?.click(); // 이미지 클릭 시 파일 선택창 열기
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // 선택한 이미지 미리보기
    }
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
    console.log(initialData);
    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  const handleSelectRange = (start: Date, end: Date) => {
    setSelectedRange({start, end});
    setDateRange([start, end]); // 날짜 범위를 업데이트
  };

  return (
    <div css={modalStyle}>
      <HeaderWithXButton onXClick={onClose} />
      <div css={contentStyle}>
        <div css={titleStyle}>
          <span>여행</span>
          <span css={titleBlue}>{isEditMode ? '수정해방' : '만들어방'}</span>
        </div>

        {step === 1 ? (
          <>
            <div css={travelStyle}>
              <div css={inputsContainerStyle}>
                <LabeledInput
                  label="여행이름"
                  value={travelName}
                  onChange={e => setTravelName(e.target.value)}
                  placeholder="여행 이름을 입력하세요"
                />
                <div css={inputWithIconStyle}>
                  <LabeledInput
                    label="여행기간"
                    value={
                      dateRange[0] && dateRange[1]
                        ? `${dayjs(dateRange[0]).format('YYYY-MM-DD')} ~ ${dayjs(dateRange[1]).format('YYYY-MM-DD')}`
                        : ''
                    }
                    placeholder="여행 기간을 선택하세요"
                    readOnly
                    onClick={handleCalendarClick}
                  />
                  <img
                    src={calendarIcon}
                    css={calendarIconStyle}
                    id="calendar-icon"
                    onClick={handleCalendarClick}
                  />
                  {isCalendarOpen && (
                    <div className="custom-calendar">
                      <CustomCalendar
                        onSelectRange={handleSelectRange}
                        onClose={() => setIsCalendarOpen(false)}
                        selectedRange={selectedRange}
                      />
                    </div>
                  )}
                </div>
                <LocationInput
                  label="여행장소"
                  value={travelPlaceList.join(', ')} // 배열을 문자열로 변환하여 입력 필드에 표시
                  onChange={e =>
                    setTravelPlaceList(
                      e.target.value.split(',').map(place => place.trim())
                    )
                  } // 쉼표로 구분하여 배열로 변환
                  placeholder="여행 장소를 검색하세요"
                />
              </div>

              <div css={quizStyle}>
                <QuizInput
                  title="초대퀴즈"
                  label="Q"
                  value={quizQuestion}
                  onChange={e => setQuizQuestion(e.target.value)}
                  placeholder="김훈민의 별명은?"
                />
                <QuizInput
                  label="A"
                  value={quizAnswer}
                  onChange={e => setQuizAnswer(e.target.value)}
                  placeholder="김훈민"
                />
              </div>

              <div css={photoStyle(selectedImage)}>
                <span>사진</span>
                <img
                  src={selectedImage || addTravelPhoto}
                  alt="사진 추가"
                  onClick={handlePhotoClick}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{display: 'none'}}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div css={btnContainerStyle}>
              <Btn
                buttonStyle={{style: 'blue', size: 'small'}}
                onClick={handleNextClick}
              >
                {isEditMode ? '수정' : '다음'}
              </Btn>
            </div>
          </>
        ) : (
          <AuthVerification onClose={closeModal} />
        )}
      </div>
    </div>
  );
}
