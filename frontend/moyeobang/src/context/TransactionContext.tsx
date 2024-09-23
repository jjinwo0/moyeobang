import React, {createContext, useState, useContext} from "react";

// 초기 설정
const defaultCompleteTransacton : CompleteTransaction = {
    transactionId: 0,
    money:0,
    adress:'',
    paymentName:"",
    createdAt: new Date(),
};

// Context 생성
const CompleteTransactionContext = createContext<{
    transactionData : CompleteTransaction;
    updateTransactionData : (newData: CompleteTransaction) => void;
    }>({
        transactionData : defaultCompleteTransacton,
        updateTransactionData: () => {}, // 기본값
    });

export default function CompleteTransactionContextProvider({children} : {children : React.ReactNode}) {

    // 상태관리 초기값은 defaultCompleteTransaction
    const [transactionData, setTransactionData] = useState<CompleteTransaction>(defaultCompleteTransacton);

    const updateTransactionData = (newData: CompleteTransaction) => {
        setTransactionData(newData);
    }

    return (
        <CompleteTransactionContext.Provider value={{transactionData, updateTransactionData}}>
            {children}
        </CompleteTransactionContext.Provider>
    )
}

export const useCompleteTransaction = () => {
    return useContext(CompleteTransactionContext);
}