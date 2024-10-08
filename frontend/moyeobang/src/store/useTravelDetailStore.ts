import {create} from 'zustand';
import {persist, PersistStorage} from 'zustand/middleware';

interface TravelState
  extends Omit<Travel, 'quizQuestion' | 'quizAnswer' | 'participantCount'> {
  setTravelData: (
    data: Omit<Travel, 'quizQuestion' | 'quizAnswer' | 'participantCount'>
  ) => void;
}

// Custom storage object for Zustand
const localStoragePersist: PersistStorage<TravelState> = {
  getItem: name => {
    const storedValue = localStorage.getItem(name);
    return storedValue ? JSON.parse(storedValue) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: name => {
    localStorage.removeItem(name);
  },
};

const useTravelDetailStore = create<TravelState>()(
  persist(
    set => ({
      travelId: 0,
      travelName: '',
      travelImg: null,
      startDate: '',
      endDate: '',
      travelPlaceList: [],
      accountId: 0,
      accountNumber: '',
      participantsInfo: [],
      setTravelData: ({
        travelId,
        travelName,
        travelImg,
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
          travelImg,
          startDate,
          endDate,
          travelPlaceList,
          accountId,
          accountNumber,
          participantsInfo,
        }),
    }),
    {
      name: 'travel-detail-store', // Key name in localStorage
      storage: localStoragePersist, // Use the custom storage object
    }
  )
);

export default useTravelDetailStore;
