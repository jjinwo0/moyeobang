import {create} from 'zustand';

interface TravelState {
  travelName: string;
  startDate: string;
  endDate: string;
  travelPlaceList: string[];
  setTravelData: (
    name: string,
    start: string,
    end: string,
    places: string[]
  ) => void;
}

const useTravelStore = create<TravelState>(set => ({
  travelName: '',
  startDate: '',
  endDate: '',
  travelPlaceList: [],
  setTravelData: (name, start, end, places) =>
    set({
      travelName: name,
      startDate: start,
      endDate: end,
      travelPlaceList: places,
    }),
}));

export default useTravelStore;
