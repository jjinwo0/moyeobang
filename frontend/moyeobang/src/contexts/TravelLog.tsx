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
      dayNum: 1,
      dayDate: '2024-10-01',
      daySchedules: [
        {
          scheduleId: 67890,
          isSelfPlus: true,
          scheduleTitle: '도쿄 타워 방문',
          scheduleLocation: {
            googlePlaceId: 'ChIJ1x9-lADvYjURbMl_CjjFXjg',
            title: '소울로스터리커피',
            address: '대한민국 강원특별자치도 춘천시 소양강로 538',
            latitude: 37.9243555,
            longitude: 127.7672156,
            category: '카페',
          },
          scheduleTime: '2024-10-01T10:00:00',
          budget: 50000,
          completion: 'completed',
          memo: '도쿄 타워가서 누구보다 신나게 놀아야지',
          scheduleImg: '',
          matchedTransaction: {
            transactionId: 78901,
            paymentName: '도쿄 타워 입장료 결제',
            totalPrice: 50000,
            paymentTime: '2024-10-01T12:15:00',
            splitMethod: 'custom', // 결제 내역 상세조회랑 동일, 정산 방식: "receipt" (영수증 정산) 또는 "custom" (default(1/n), 사용자 지정)
            participantsInfo: [
              {
                memberId: 1,
                memberName: '김훈민',
                profileImage: '/assets/images/profile.jpg',
              },
              {
                memberId: 2,
                memberName: '이수민',
                profileImage: '/assets/images/profile.jpg',
              },
            ],
          },
        },
        {
          transactionId: 78902,
          isSelfPlus: false,
          paymentName: '신주쿠 카페 결제',
          latitude: 37.85294409999999,
          longitude: 127.7113324,
          totalPrice: 25000,
          paymentTime: '2024-10-01T16:00:00',
          splitMethod: 'receipt', // 정산 방식
          participantsInfo: [
            {
              memberId: 1,
              memberName: '김훈민',
              profileImage: '/images/profiles/1.png',
            },
            {
              memberId: 2,
              memberName: '이수민',
              profileImage: '/images/profiles/2.png',
            },
            {
              memberId: '3',
              memberName: '박지현',
              profileImage: '/images/profiles/3.png',
            },
          ],
        },
      ],
    },
    {
      dayNum: 2,
      dayDate: '2024-10-02',
      daySchedules: [
        {
          scheduleId: 67891,
          isSelfPlus: true,
          scheduleTitle: '시부야 거리 탐방',
          scheduleLocation: {
            googlePlaceId: 'ChIJ1x9-lADvYjURbMl_CjjFXjg',
            title: '소울로스터리커피',
            address: '대한민국 강원특별자치도 춘천시 소양강로 538',
            latitude: 37.9243555,
            longitude: 127.7672156,
            category: '카페',
          },
          scheduleTime: '2024-10-02T13:00:00',
          budget: 30000,
          completion: 'pending',
          memo: '',
          matchedTransaction: null,
          scheduleImg: '',
        },
      ],
    },
  ];

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
