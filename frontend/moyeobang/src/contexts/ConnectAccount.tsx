import React, {createContext, useContext, useState, ReactNode} from 'react';

// 계좌번호를 관리할 context와 타입을 정의합니다.
interface AccountContextType {
  connectAccountNumber: string;
  setConnectAccountNumber: (accountNumber: string) => void;
}

const ConnectAccountContext = createContext<AccountContextType | undefined>(
  undefined
);

// Provider 컴포넌트 생성
export const ConnectAccountProvider = ({children}: {children: ReactNode}) => {
  const [connectAccountNumber, setConnectAccountNumber] = useState<string>('');

  return (
    <ConnectAccountContext.Provider
      value={{connectAccountNumber, setConnectAccountNumber}}
    >
      {children}
    </ConnectAccountContext.Provider>
  );
};

// context를 쉽게 사용할 수 있도록 custom hook 생성
export const useConnectAccountContext = () => {
  const context = useContext(ConnectAccountContext);
  if (!context) {
    throw new Error('useAccount는 AccountProvider 내에서 사용해야 합니다');
  }
  return context;
};
