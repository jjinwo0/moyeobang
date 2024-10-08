import React, {createContext, useContext, useState} from 'react';
import useTravelDetailStore from '@/store/useTravelDetailStore';

// Context 생성
const TravelLogContext = createContext<TravelLogContextType | null>(null);

export type TravelLogContextType = {
  travelSchedules: TravelLog;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setTravelSchedules: React.Dispatch<
    React.SetStateAction<TravelLog | undefined>
  >;
  searchLocation?: string;
  setSearchLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedPlace: string | [];
  setSelectedPlace: React.Dispatch<React.SetStateAction<string | []>>;
  scheduleDayNum?: number;
  setScheduleDayNum: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedMarker: ExtendedMarkerOptions | null;
  setSelectedMarker: React.Dispatch<
    React.SetStateAction<ExtendedMarkerOptions | null>
  >;
  showMapSearch: boolean;
  setShowMapSearch: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowMapSearch: () => void;
  handleSearchLocation: (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => void;
  scheduleName: string | undefined;
  setScheduleName: React.Dispatch<React.SetStateAction<string | undefined>>;
  showPlusSelf: boolean;
  handleShowPlusSelf: () => void;
  travelDates: string[];
  scheduleEdit: number | null;
  setScheduleEdit: React.Dispatch<React.SetStateAction<number | null>>;
};

// Provider 컴포넌트 생성
export const TravelLogProvider = ({children}: {children: React.ReactNode}) => {
  const [travelSchedules, setTravelSchedules] = useState<TravelLog>();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [searchLocation, setSearchLocation] = useState<string | undefined>();
  const handleSearchLocation = (
    e: React.ChangeEvent<HTMLInputElement> | string
  ) => {
    if (typeof e === 'string') {
      setSearchLocation(e);
      setScheduleName(e);
    } else {
      setSearchLocation(e.target.value);
      setScheduleName(e.target.value);
    }
  };

  const {travelPlaceList, startDate, endDate} = useTravelDetailStore();

  const [selectedPlace, setSelectedPlace] = useState<string | []>(
    travelPlaceList[0]
  );

  // 여행 일수 계산
  const travelDates = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][
      currentDate.getDay()
    ];
    travelDates.push(
      `${currentDate.toISOString().split('T')[0]} (${dayOfWeek})`
    ); // YYYY-MM-DD (요일) 형식으로 추가
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // 자신의 일정 추가 모달
  const [showPlusSelf, setShowPlusSelf] = useState<boolean>(false);
  const [scheduleEdit, setScheduleEdit] = useState<number | null>(null);

  const handleShowPlusSelf = () => {
    setShowPlusSelf(!showPlusSelf);
  };

  // 지도 검색 모달
  const [showMapSearch, setShowMapSearch] = useState<boolean>(false);
  const handleShowMapSearch = () => {
    setShowMapSearch(!showMapSearch);
  };

  const [scheduleName, setScheduleName] = useState<string | undefined>(searchLocation);

  // scheduleDayNum 실제 day를 알 수 있다.
  // scheduleDayNum-1을 하면 인덱스를 알 수 있다.
  const [scheduleDayNum, setScheduleDayNum] = useState<number | undefined>(1);

  // `selectedMarker`를 이 확장된 타입으로 선언
  const [selectedMarker, setSelectedMarker] =
    useState<ExtendedMarkerOptions | null>(null);

  return (
    <TravelLogContext.Provider
      value={{
        travelSchedules: travelSchedules || [],
        currentIndex,
        setCurrentIndex,
        setTravelSchedules,
        searchLocation,
        setSearchLocation,
        selectedPlace,
        setSelectedPlace,
        scheduleDayNum,
        setScheduleDayNum,
        selectedMarker,
        setSelectedMarker,
        showMapSearch,
        setShowMapSearch,
        handleShowMapSearch,
        handleSearchLocation,
        scheduleName,
        setScheduleName,
        showPlusSelf,
        handleShowPlusSelf,
        travelDates,
        scheduleEdit,
        setScheduleEdit,
      }}
    >
      {children}
    </TravelLogContext.Provider>
  );
};

// Context 사용을 위한 custom hook 생성
export const useTravelLogContext = () => {
  const context = useContext(TravelLogContext);
  if (!context) {
    throw new Error(
      'useTravelLogContext must be used within a TravelLogProvider'
    );
  }
  return context;
};
