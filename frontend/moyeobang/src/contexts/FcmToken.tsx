import React, {createContext, useContext, useState, ReactNode} from 'react';

// 계좌번호를 관리할 context와 타입을 정의합니다.
interface FcmTokenContextType {
  fcmToken: string;
  setFcmToken: (accountNumber: string) => void;
}

const FcmTokenContext = createContext<FcmTokenContextType | undefined>(
  undefined
);

// Provider 컴포넌트 생성
export const FcmTokenProvider = ({children}: {children: ReactNode}) => {
  const [fcmToken, setFcmToken] = useState<string>('');

  return (
    <FcmTokenContext.Provider value={{fcmToken, setFcmToken}}>
      {children}
    </FcmTokenContext.Provider>
  );
};

// context를 쉽게 사용할 수 있도록 custom hook 생성
export const useFcmTokenContext = () => {
  const context = useContext(FcmTokenContext);
  if (!context) {
    throw new Error('useAccount는 AccountProvider 내에서 사용해야 합니다');
  }
  return context;
};
