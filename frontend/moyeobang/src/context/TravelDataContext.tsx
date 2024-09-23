import React, {createContext, useContext, useState, ReactNode} from 'react';

interface TravelData {
  travelName: string;
  startDate: string;
  endDate: string;
  travelPlaceList: string[];
  quizQuestion: string;
  quizAnswer: string;
}

interface TravelContextType {
  nowTravelData: TravelData | null;
  setNowTravelData: (data: TravelData) => void;
}

const TravelDataContext = createContext<TravelContextType | undefined>(
  undefined
);

export default function TravelDataContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [nowTravelData, setNowTravelData] = useState<TravelData | null>(null);

  return (
    <TravelDataContext.Provider value={{nowTravelData, setNowTravelData}}>
      {children}
    </TravelDataContext.Provider>
  );
}

export const useTravelContext = () => {
  const context = useContext(TravelDataContext);
  if (!context) {
    throw new Error(
      'useTravelContext must be used within a TravelDataContextProvider'
    );
  }
  return context;
};
