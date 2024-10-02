// 영수증 => 원래 데이터 형태로 변환해주는 함수

export function extractItems(
  itemsData: OcrItem[], 
  transactionId: TransactionId,
  createdAt: CreatedAt,
  money: Money,
  paymentName: PaymentName,
  address: Adress,
  acceptedNumber: AcceptedNumber
): TransactionDetailByReceipt {

  let itemId : number= 1;

  const details = itemsData.map((item: OcrItem) => {

    const orderItem : SettledItemByReceipt = {
      orderItemId: itemId,
      orderItemTitle: item.name,
      orderItemQuantity: item.count,
      orderItemPrice: item.price,
      participants: [] // 빈 배열로 설정
    }
    
    itemId += 1;

    return orderItem
  });

  // const totalPrice = details.reduce((sum:number, item) => sum + item.orderItemPrice, 0);

  const receiptData : TransactionDetailByReceipt = {
    transactionId: Number(transactionId),
    paymentName: paymentName,
    address: address, // address 필드 수정
    money: money,
    details: details,
    createdAt: createdAt, // 시간
    splitMethod:"receipt",
    acceptedNumber:acceptedNumber
  };

  return receiptData
}