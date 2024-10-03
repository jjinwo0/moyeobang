import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface CurrentTravelState
  extends Omit<
    Travel,
    'quizQuestion' | 'quizAnswer' | 'participantCount' | 'participantsInfo'
  > {
  setCurrentTravelData: (
    data: Omit<
      Travel,
      'quizQuestion' | 'quizAnswer' | 'participantCount' | 'participantsInfo'
    >
  ) => void;
}

const useCurrentTravelStore = create<CurrentTravelState>()(
  persist(
    set => ({
      travelId: 0,
      travelName: '',
      travelImg: null,
      accountNumber: '',
      accountId: 0,
      startDate: '',
      endDate: '',
      travelPlaceList: [],
      setCurrentTravelData: ({
        travelId,
        travelName,
        travelImg,
        startDate,
        endDate,
        travelPlaceList,
        accountId,
        accountNumber,
      }) =>
        set({
          travelId,
          travelName,
          travelImg,
          startDate,
          endDate,
          travelPlaceList,
          accountId,
          accountNumber,
        }),
    }),
    {
      name: 'current-travel-store', // localStorage에 저장될 키 이름
      getStorage: () => localStorage, // localStorage 사용
    }
  )
);
export default useCurrentTravelStore;
