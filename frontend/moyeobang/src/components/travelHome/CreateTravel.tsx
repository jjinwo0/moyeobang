import {
  modalStyle,
  contentStyle,
  titleStyle,
  titleBlue,
  travelStyle,
  inputsContainerStyle,
  inputWithIconStyle,
  calendarIconStyle,
  quizStyle,
  btnContainerStyle,
  photoStyle,
  tagStyle,
  locationStyle,
  tagContainerStyle,
} from './createTravel';
import React, {useState, useRef, useEffect} from 'react';
import HeaderWithXButton from '../common/Header/HeaderWithXbutton';
import LabeledInput from '../common/Inputs/LabeledInput';
import LocationInput from '../common/Inputs/LocationInput';
import QuizInput from '../common/Inputs/QuizInput';
import AuthVerification from './AuthVerification';
import Btn from '../common/btn/Btn';
import addTravelPhoto from '@/assets/icons/addTravelPhoto.png';
import calendarIcon from '@/assets/icons/calendar.png';
import useModalStore from '@/store/useModalStore';
import MapSearch from './MapSearch';
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

export default function CreateTravel({
  onClose,
  isEditMode = false, // 기본값은 false로 설정 (생성 모드)
  initialData = {}, // 기본값을 빈 객체로 설정하여 생성 모드에서 문제가 없도록 처리
  onSubmit, // 수정 시의 함수
}: CreateTravelProps) {
  const {closeModal} = useModalStore();
  const [cityInput, setCityInput] = useState<string>(''); // 선택된 도시 이름
  const [isMapSearchVisible, setMapSearchVisible] = useState<boolean>(false); // MapSearch 표시 여부
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
    start: Date | string | null;
    end: Date | string | null;
  }>({
    start: null,
    end: null,
  });

  const handleSelectRange = (start: Date, end: Date) => {
    setSelectedRange({start, end});
    setDateRange([start, end]); // 날짜 범위를 업데이트
  };

  // 사용자가 입력한 값을 cityInput으로 업데이트
  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value); // 현재 입력된 값을 업데이트
  };

  // MapSearch에서 도시 선택 후 배열에 추가
  const handleCitySelect = (city: string) => {
    setTravelPlaceList(prev => [...prev, city]); // 선택된 도시를 배열에 추가
    setMapSearchVisible(false); // MapSearch 숨기기
    setCityInput(''); // 입력 필드 초기화
  };

  // 검색 버튼을 클릭하면 cityInput 값을 사용하여 검색 실행
  const handleCitySearchClick = () => {
    if (cityInput.trim() && !travelPlaceList.includes(cityInput)) {
      // setTravelPlaceList([...travelPlaceList, cityInput]);
      // setCityInput(''); // 입력 필드 초기화
      setMapSearchVisible(true); // MapSearch 표시
    }
  };

  // 태그 삭제
  const handleDeleteTag = (place: string) => {
    setTravelPlaceList(travelPlaceList.filter(item => item !== place));
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
              </div>

              <div css={locationStyle}>
                <LocationInput
                  label="여행장소"
                  // value={travelPlaceList.join(', ')} // 배열을 문자열로 변환하여 입력 필드에 표시
                  value={cityInput}
                  // onChange={e =>
                  //   setTravelPlaceList(
                  //     e.target.value.split(',').map(place => place.trim())
                  //   )
                  // } // 쉼표로 구분하여 배열로 변환
                  onChange={handleCityInputChange}
                  onClick={handleCitySearchClick} // 검색 아이콘 클릭 시 검색 실행
                  placeholder="여행 장소를 검색하세요"
                />

                {isMapSearchVisible && (
                  <MapSearch
                    onSelectCity={handleCitySelect}
                    cityName={cityInput}
                  />
                )}

                <div css={tagContainerStyle}>
                  {travelPlaceList.map((place, index) => (
                    <div css={tagStyle} key={index}>
                      {place}
                      <button
                        className="close-button"
                        onClick={() => handleDeleteTag(place)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
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
