import {create} from 'zustand';
import {persist, PersistStorage} from 'zustand/middleware';

interface CurrentTravelState
  extends Omit<Travel, 'quizQuestion' | 'quizAnswer' | 'participantCount'> {
  setCurrentTravelData: (
    data: Omit<Travel, 'quizQuestion' | 'quizAnswer' | 'participantCount'>
  ) => void;
}

// Custom storage object for Zustand
const localStoragePersist: PersistStorage<CurrentTravelState> = {
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
      participantsInfo: [],
      setCurrentTravelData: ({
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
      name: 'current-travel-store', // Key name in localStorage
      storage: localStoragePersist, // Use the custom storage object
    }
  )
);

export default useCurrentTravelStore;
