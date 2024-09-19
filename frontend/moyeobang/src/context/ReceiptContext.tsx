import React, {createContext, useState, useContext} from "react";

// 초기 설정
const defaultReceipt : TransactionDetailByReceipt = {
    transactionId: 0,
    paymentName: '',
    adress: '',
    money: 0,
    createdAt: '',
    acceptedNumber: '',
    details: [],
    splitMethod: 'receipt',
};

// Context 생성
const ReceiptContext = createContext<{
    receiptData : TransactionDetailByReceipt;
    isNew: IsNew;
    updateReceiptData : (newData: TransactionDetailByReceipt, isNew:boolean) => void;
    setIsNew: (isNew: boolean) => void;
    }>({
        receiptData : defaultReceipt,
        isNew:true,
        updateReceiptData: () => {}, // 기본값
        setIsNew:() => {}
    });

export default function ReceiptContextProvider({children} : {children : React.ReactNode}) {

    // 상태관리 초기값은 defaultReceipt
    const [receiptData, setReceiptData] = useState<TransactionDetailByReceipt>(defaultReceipt);
    const [isNew, setIsNew] = useState<IsNew>(true);

    const updateReceiptData = (newData:TransactionDetailByReceipt, isNew:boolean) => {
        setReceiptData(newData);
        setIsNew(isNew)
    }

    return (
        <ReceiptContext.Provider value={{receiptData, isNew, updateReceiptData, setIsNew}}>
            {children}
        </ReceiptContext.Provider>
    )
}

export const useReceiptContext = () => {
    return useContext(ReceiptContext);
}