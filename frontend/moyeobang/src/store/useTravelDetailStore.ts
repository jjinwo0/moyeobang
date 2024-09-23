import {create} from 'zustand';

interface TravelState
  extends Omit<
    Travel,
    | 'quizQuestion'
    | 'quizAnswer'
    | 'travelImg'
    | 'participantsCount'
    | 'travelId'
  > {
  setTravelData: (
    data: Omit<
      Travel,
      | 'quizQuestion'
      | 'quizAnswer'
      | 'travelImg'
      | 'participantsCount'
      | 'travelId'
    >
  ) => void;
}

const useTravelDetailStore = create<TravelState>(set => ({
  travelName: '',
  startDate: '',
  endDate: '',
  travelPlaceList: [],
  accountId: 0,
  accountNumber: '',
  participantsInfo: [],
  setTravelData: ({
    travelName,
    startDate,
    endDate,
    travelPlaceList,
    accountId,
    accountNumber,
    participantsInfo,
  }) =>
    set({
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
