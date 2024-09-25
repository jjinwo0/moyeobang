import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface TravelState
  extends Omit<
    Travel,
    'quizQuestion' | 'quizAnswer' | 'travelImg' | 'participantsCount'
  > {
  setTravelData: (
    data: Omit<
      Travel,
      'quizQuestion' | 'quizAnswer' | 'travelImg' | 'participantsCount'
    >
  ) => void;
}

const useTravelDetailStore = create<TravelState>()(
  persist(
    set => ({
      travelId: 0,
      travelName: '',
      startDate: '',
      endDate: '',
      travelPlaceList: [],
      accountId: 0,
      accountNumber: '',
      participantsInfo: [],
      setTravelData: ({
        travelId,
        travelName,
        startDate,
        endDate,
        travelPlaceList,
        accountId,
        accountNumber,
        participantsInfo,
      }) =>
        set({
          travelId,
          travelName,
          startDate,
          endDate,
          travelPlaceList,
          accountId,
          accountNumber,
          participantsInfo,
        }),
    }),
    {
      name: 'travel-detail-store', // localStorage에 저장될 키 이름
      getStorage: () => localStorage, // localStorage 사용
    }
  )
);
export default useTravelDetailStore;
