import React, {createContext, useContext, useState} from 'react';
import useTravelDetailStore from '@/store/useTravelDetailStore';

// Context 생성
const TravelLogContext = createContext<TravelLogContextType | null>(null);

export type TravelLogContextType = {
  travelSchedules: TravelLog;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setTravelSchedules: React.Dispatch<React.SetStateAction<TravelLog>>;
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
  const initialDaySchedule: TravelLog = [
    {
        "dayNum": 1,
        "dayDate": "2023-10-01",
        "daySchedules": [
            {
                "scheduleId": 1,
                "scheduleTitle": "카페 방문",
                "scheduleLocation": {
                    "googlePlaceId": "ChIJN1t_tDeuEmsRUsoyG83frY4",
                    "title": "스타벅스",
                    "address": "서울시 강남구 스타벅스",
                    "latitude": 37.7749,
                    "longitude": -122.4194,
                    "category": "카페"
                    },
                "scheduleTime": "2023-10-01T10:00:00",
                "budget": 5000,
                "sequence": 1,
                "completion": "COMPLETE",
                "memo": "친구들과 카페에서 만남",
                "scheduleImg": "http://image.url/cafe.jpg",
                "matchedTransaction": {
                    "transactionId": 1,
                    "paymentName": "카페 결제",
                    "latitude": 37.7749,
                    "longitude": -122.4194,
                    "totalPrice": 5000,
                    "paymentTime": "2023-10-01T10:00:00",
                    "splitMethod": "RECEIPT",
                    "participantsInfo": [
                        {
                            "memberId": 1
                        },
                        {
                            "memberId": 2
                        }
                    ]
                },
                "unmatchedTransaction": null
            }
        ]
    },
    {
        "dayNum": 2,
        "dayDate": "2023-10-02",
        "daySchedules": [
            {
                "scheduleId": 2,
                "scheduleTitle": "식당 방문",
                "scheduleLocation": {
                    "googlePlaceId": "ChIJ9TPcRgWuEmsRZtZQk5E_7Pc",
                    "title": "식당 방문",
                    "address": "서울시 용산구 이태원 식당",
                    "latitude": 37.5665,
                    "longitude": 126.978,
                    "category": "카테고리"
                },
                "scheduleTime": "2023-10-02T12:30:00",
                "budget": 15000,
                "sequence": 2,
                "completion": "INCOMPLETE",
                "memo": "가족과 식사",
                "scheduleImg": "http://image.url/restaurant.jpg",
                "matchedTransaction": {
                    "transactionId": 2,
                    "paymentName": "식당 결제",
                    "latitude": 37.5665,
                    "longitude": 126.978,
                    "totalPrice": 15000,
                    "paymentTime": "2023-10-02T12:30:00",
                    "splitMethod": "CUSTOM",
                    "participantsInfo": [
                        {
                            "memberId": 1
                        }
                    ]
                },
                "unmatchedTransaction": null
            }
        ]
    },
    {
        "dayNum": 3,
        "dayDate": "2023-10-03",
        "daySchedules": [
            {
                "scheduleId": 3,
                "scheduleTitle": null,
                "scheduleLocation": {
                    "googlePlaceId": null,
                    "title": null,
                    "address": null,
                    "latitude": 37.1234,
                    "longitude": 127.5678,
                    "category": "카테고리"
                },
                "scheduleTime": "2023-10-03T15:00:00",
                "budget": 0,
                "sequence": 3,
                "completion": "INCOMPLETE",
                "memo": null,
                "scheduleImg": null,
                "matchedTransaction": null,
                "unmatchedTransaction": {
                    "transactionId": 3,
                    "paymentName": "헬스장 결제",
                    "latitude": 37.1234,
                    "longitude": 127.5678,
                    "totalPrice": 30000,
                    "paymentTime": "시간채우기",
                    "splitMethod": "RECEIPT",
                    "participantsInfo": [
                        {
                            "memberId": 3
                        },
                        {
                            "memberId": 4
                        }
                    ]
                }
            }
        ]
    }
]

  const [travelSchedules, setTravelSchedules] =
    useState<TravelLog>(initialDaySchedule);

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

  const {travelPlaceList, startDate, endDate, travelName} =
    useTravelDetailStore();

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

  const [scheduleName, setScheduleName] = useState<string | undefined>();

  // scheduleDayNum 실제 day를 알 수 있다.
  // scheduleDayNum-1을 하면 인덱스를 알 수 있다.
  const [scheduleDayNum, setScheduleDayNum] = useState<number | undefined>(1);

  // type ExtendedMarkerOptions = google.maps.Marker & {
  //   position?: {
  //     lat: number;
  //     lng: number;
  //   };
  //   googlePlaceId?: string;
  //   placeName?: string;
  //   address?: string;
  //   category?: string;
  // };

  // // 여기서 selectedMarker 상태를 추가
  // const [selectedMarker, setSelectedMarker] =
  //   useState<ExtendedMarkerOptions | null>(null);

  // `selectedMarker`를 이 확장된 타입으로 선언
  const [selectedMarker, setSelectedMarker] =
    useState<ExtendedMarkerOptions | null>(null);

  return (
    <TravelLogContext.Provider
      value={{
        travelSchedules,
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
