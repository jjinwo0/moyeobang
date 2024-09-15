// 상품 데이터를 추출하는 함수
export function extractItems(receiptText : string[]) {

    // 상품명 뒤에 오는 수량과 가격을 추출하는 정규식
    const itemRegex = /([^\[\]\s]+(?:\s*\([^\)]*\))?)\s+(\d+)\s+([\d,]+)/g;
  
    const joinedText = receiptText.join(' ');
    console.log("Joined Text:", joinedText); // joinedText를 확인
    const itemMatches = [...joinedText.matchAll(itemRegex)];
  
    if (itemMatches.length === 0) {
      console.log("No items matched");
    }
  
    return itemMatches.map(match => {
      console.log("Matched item:", match); // 각 매칭된 항목을 출력
  
      const itemName = match[1].trim(); // 상품명 (괄호 포함)
      const quantity = parseInt(match[2], 10); // 수량
      const price = parseInt(match[3].replace(/,/g, ""), 10); // 가격

  return {
    orderItemTitle: itemName,
    orderItemCount: quantity,
    orderItemAmount: price
    };
  });
}

// JSON 형태로 영수증 정보를 추출하는 함수
export function extractReceiptData(receiptText:string[]) {

  const joinedText = receiptText.join(' '); // ' '사이에 두면서 다 붙여서 해당 형태인거 뽑아내기!

  // 매장명, 주소, 승인번호, 날짜 등 기본 정보 추출
  const location =  receiptText[2]?.trim() || '알 수 없음';
  const address = `${receiptText[4]?.trim() || ''} ${receiptText[5]?.trim() || ''} ${receiptText[6]?.trim() || ''}`.trim(); // 주소 조합
  const acceptedNumber = joinedText.match(/\[POS,([0-9]+)\]/)?.[1] || "알 수 없음";
  const createdAt = joinedText.match(/([0-9]{4}\.[0-9]{2}\.[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2})/)?.[1] || "알 수 없음";

  // 상품 항목 추출
  const description = extractItems(receiptText);

  // 총 결제 금액 추출
  const amount = parseInt(joinedText.match(/판매 합계 ([0-9,]+)/)?.[1].replace(/,/g, ""), 10);

  // JSON 형식의 결과 반환
  return {
    location,
    address,
    acceptedNumber,
    description,
    amount,
    createdAt
  };
}