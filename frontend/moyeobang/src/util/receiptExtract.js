"use strict";
// 영수증 => 원래 데이터 형태로 변환해주는 함수
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractItems = extractItems;
function extractItems(itemsData, transactionId, createdAt, money, paymentName, address, acceptedNumber) {
    var itemId = 1;
    var details = itemsData.map(function (item) {
        var orderItem = {
            orderItemId: itemId,
            orderItemTitle: item.name,
            orderItemQuantity: item.count,
            orderItemPrice: item.price,
            participants: [] // 빈 배열로 설정
        };
        itemId += 1;
        return orderItem;
    });
    // const totalPrice = details.reduce((sum:number, item) => sum + item.orderItemPrice, 0);
    var receiptData = {
        transactionId: Number(transactionId),
        paymentName: paymentName,
        address: address, // address 필드 수정
        money: money,
        details: details,
        createdAt: createdAt, // 시간
        splitMethod: "receipt",
        acceptedNumber: acceptedNumber
    };
    return receiptData;
}
