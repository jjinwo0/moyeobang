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
import moyeobang from '@/services/moyeobang';
import {useMutation, useQueryClient} from '@tanstack/react-query';

interface CreateTravelProps {
  onClose: () => void; // 모달을 닫는 함수
  isEditMode?: boolean; // 수정 모드 여부
  travelId?: number;
  initialData?: {
    // 수정 모드일 때의 초기 데이터
    travelName?: string;
    travelPlaceList?: string[];
    quizQuestion?: string;
    quizAnswer?: string;
    startDate?: string | null; // startDate 추가
    endDate?: string | null; // endDate 추가
    selectedImage?: string | null;
  };
}

export default function CreateTravel({
  onClose,
  travelId, // 수정 모드일 때만 사용됨
  isEditMode = false, // 기본값은 false로 설정 (생성 모드)
  initialData = {}, // 기본값을 빈 객체로 설정하여 생성 모드에서 문제가 없도록 처리
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
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    initialData.startDate
      ? dayjs(initialData.startDate).format('YYYY-MM-DD') // Date 타입이면 string으로 변환
      : null,
    initialData.endDate
      ? dayjs(initialData.endDate).format('YYYY-MM-DD') // Date 타입이면 string으로 변환
      : null,
  ]);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    initialData.selectedImage || null
  );

  const [step, setStep] = useState<number>(1); // Step 상태
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<FormData>(new FormData());

  // 수정과 생성을 구분하여 처리
  const handleNextClick = () => {
    if (!travelName || !dateRange[0] || !dateRange[1]) {
      alert('모든 필드를 입력해주세요');
      return;
    }
    const newFormData = new FormData();
    const requestData = {
      travelName: travelName,
      startDate: dateRange[0],
      endDate: dateRange[1],
      travelPlaceList: travelPlaceList,
      quizQuestion: quizQuestion,
      quizAnser: quizAnswer,
    };

    newFormData.append('request', JSON.stringify(requestData));
    if (selectedImage) {
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        newFormData.append('backgroundImage', file);
      }
    }

    setFormData(newFormData); // formData 상태 업데이트

    // FormData의 내용을 확인하기 위해 entries() 사용
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }
    if (isEditMode) {
      // 수정 모드일 때는 onSubmit 함수 호출
      onClose();
      handleSubmit();
    } else {
      setStep(2); // 생성 모드일 때 다음 단계로 이동
    }
  };

  const handleSubmit = () => {
    const newform = new FormData();

    // 필수 필드 유효성 검사
    if (!travelName || !dateRange[0] || !dateRange[1]) {
      alert('모든 필드를 입력해주세요');
      return;
    }

    const request = {
      travelName: travelName,
      startDate: dateRange[0],
      endDate: dateRange[1],
      travelPlaceList: travelPlaceList,
      quizQuestion: quizQuestion,
      quizAnswer: quizAnswer,
    };

    newform.append('request', JSON.stringify(request));

    if (selectedImage) {
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        newform.append('backgroundImage', file);
      }
    }

    // // [todo] travelId가 존재하는 경우에만 mutate 호출
    // if (typeof travelId === 'number') {
    //   putTravel(newform); // 바로 newform을 전달
    // }
  };

  // //[todo] 여행 수정 api 연결
  // const queryClient = useQueryClient();
  // const {mutate: patchTravel} = useMutation({
  //   mutationFn: (formData: FormData) =>
  //     moyeobang.patchTravel(travelId!, formData), //travelId!로 타입을 단언
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: ['travelList'],
  //       refetchType: 'all',
  //     });
  //   },
  // });

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
    start: string | null;
    end: string | null;
  }>({
    start: null,
    end: null,
  });

  const handleSelectRange = (start: string, end: string) => {
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
                  label={
                    <span>
                      <span style={{color: 'red'}}>*</span> 여행이름
                    </span>
                  }
                  value={travelName}
                  onChange={e => setTravelName(e.target.value)}
                  placeholder="여행 이름을 입력하세요"
                />
                <div css={inputWithIconStyle}>
                  <LabeledInput
                    label={
                      <span>
                        <span style={{color: 'red'}}>*</span> 여행기간
                      </span>
                    }
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
                  label={
                    <span>
                      <span style={{color: 'red'}}>*</span> 여행장소
                    </span>
                  }
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
                  title={
                    <span>
                      <span style={{color: 'red'}}>*</span> 초대퀴즈
                    </span>
                  }
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
          <AuthVerification onClose={closeModal} formData={formData} />
        )}
      </div>
    </div>
  );
}
