import React, {createContext, useContext, useState} from 'react';
import useTravelDetailStore from '@/store/useTravelDetailStore';

// Context 생성
const TravelLogContext = createContext<any>(null);

// Provider 컴포넌트 생성
export const TravelLogProvider = ({children}: {children: React.ReactNode}) => {
  const initialtravelSchedules: TravelLog = [
    [
      {
        scheduleId: 67890,
        scheduleTitle: '도쿄 타워 방문',
        scheduleLocation: '도쿄 타워',
        scheduleTime: '2024-10-01T10:00:00',
        predictedBudget: 50000,
        completion: 'completed',
        memo: '도쿄 타워가서 누구보다 신나게 놀아야지',
        scheduleImg: 'url',
        matchedTransaction: {
          transactionId: 78901,
          paymentName: '도쿄 타워 입장료 결제',
          totalPrice: 50000,
          paymentTime: '2024-10-01T12:15:00',
          splitMethod: 'custom', // 정산 방식: "receipt" 또는 "custom"
          participantsInfo: [
            {
              memberId: 1,
              nickname: '김훈민',
              profileImage: '/assets/images/profile.jpg',
            },
            {
              memberId: 2,
              nickname: '이수민',
              profileImage: '/assets/images/profile.jpg',
            },
          ],
        },
      },
      {
        transactionId: 78902,
        paymentName: '신주쿠 카페 결제',
        totalPrice: 25000,
        paymentTime: '2024-10-01T16:00:00',
        splitMethod: 'receipt', // 정산 방식
        participantsInfo: [
          {
            memberId: 1,
            nickname: '김훈민',
            profileImage: '/assets/images/profile.jpg',
          },
          {
            memberId: 3,
            nickname: '박지현',
            profileImage: '/assets/images/profile.jpg',
          },
        ],
      },
    ],
    [
      {
        scheduleId: 67891,
        scheduleTitle: '시부야 거리 탐방',
        scheduleLocation: '시부야',
        scheduleTime: '2024-10-01T13:00:00',
        predictedBudget: 30000,
        completion: 'pending',
        memo: '',
        matchedTransaction: null,
      },
    ],
  ];

  const [travelSchedules, setTravelSchedules] = useState<TravelLog>(
    initialtravelSchedules
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const [searchLocation, setSearchLocation] = useState<string | undefined>();

  const {travelPlaceList} = useTravelDetailStore();

  const [selectedPlace, setSelectedPlace] = useState<string | []>(
    travelPlaceList[0]
  );

  // scheduleDayNum 실제 day를 알 수 있다.
  // scheduleDayNum-1을 하면 인덱스를 알 수 있다.
  const [scheduleDayNum, setScheduleDayNum] = useState<number | null>();

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
      }}
    >
      {children}
    </TravelLogContext.Provider>
  );
};

// Context 사용을 위한 custom hook 생성
export const useTravelLogContext = () => {
  return useContext(TravelLogContext);
};
