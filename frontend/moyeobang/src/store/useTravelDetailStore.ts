import {create} from 'zustand';

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

const useTravelDetailStore = create<TravelState>(set => ({
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
}));

export default useTravelDetailStore;
