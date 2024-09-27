import {create} from 'zustand';

interface TravelState {
  travelId: number;
  travelName: string;
  startDate: string;
  endDate: string;
  travelPlaceList: string[];
  setTravelData: (
    id: number,
    name: string,
    start: string,
    end: string,
    places: string[]
  ) => void;
}

const useTravelStore = create<TravelState>(set => ({
  travelId: 0,
  travelName: '',
  startDate: '',
  endDate: '',
  travelPlaceList: [],
  setTravelData: (id, name, start, end, places) =>
    set({
      travelId: id,
      travelName: name,
      startDate: start,
      endDate: end,
      travelPlaceList: places,
    }),
}));

export default useTravelStore;
