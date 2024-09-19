function formatToISO(dateString:string) {
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split(".");
  const isoString = `${year}-${month}-${day}T${timePart}Z`;
  return isoString;
}

// 원래 데이터 형태로 변환해주는 함수
export function extractItems(parsedData : any, transactionId: TransactionId) {

  let itemId = 1;

  const details = parsedData.products.map((product: any) => {

    const orderItem : SettledItemByReceipt = {
      orderItemId: itemId,
      orderItemTitle: product.product_name,
      orderItemQuantity: product.quantity,
      orderItemPrice: product.price,
      participants: [] // 빈 배열로 설정
    }
    
    itemId += 1;

    return orderItem
  });

  const totalPrice = details.reduce((sum:number, item) => sum + item.orderItemPrice, 0);

  const receiptData : TransactionDetailByReceipt = {
    transactionId: Number(transactionId),
    paymentName: parsedData.place_name,
    adress: parsedData.address, // address 필드 수정
    money: totalPrice,
    details: details,
    acceptedNumber: parsedData.approval_number,
    createdAt: formatToISO(parsedData.time), // 시간
    splitMethod:"receipt"
  };

  return receiptData
}