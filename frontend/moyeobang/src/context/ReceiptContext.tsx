import React, {createContext, useState, useContext} from "react";

// 초기 설정
const defaultReceipt : TransactionDetailByReceipt = {
    transactionId: 0,
    paymentName: '',
    adress: '',
    money: 0,
    createdAt: '',
    details: [],
    splitMethod: 'receipt',
};

// Context 생성
const ReceiptContext = createContext<{
    receiptData : TransactionDetailByReceipt;
    updateReceiptData : (newData: TransactionDetailByReceipt, isNew:boolean) => void;
    }>({
        receiptData : defaultReceipt,
        updateReceiptData: () => {}, // 기본값
    });

export default function ReceiptContextProvider({children} : {children : React.ReactNode}) {

    // 상태관리 초기값은 defaultReceipt
    const [receiptData, setReceiptData] = useState<TransactionDetailByReceipt>(defaultReceipt);

    const updateReceiptData = (newData:TransactionDetailByReceipt) => {
        setReceiptData(newData);
    }

    return (
        <ReceiptContext.Provider value={{receiptData, updateReceiptData}}>
            {children}
        </ReceiptContext.Provider>
    )
}

export const useReceiptContext = () => {
    return useContext(ReceiptContext);
}