// TravelDataProps 타입 정의
interface TravelDataProps {
  travelData: {
    totalAmount: number;
    amountUsed: number;
    consumptionCategory: {
      restaurant: number;
      cafe: number;
      shopping: number;
      souvenir: number;
    };
    consumptionTag: string[];
  };
}

// ConsumptionSummary 컴포넌트
export default function ConsumptionSummary({travelData}: TravelDataProps) {
  const {totalAmount, amountUsed, consumptionCategory, consumptionTag} =
    travelData;

  return (
    <div>
      <h2>여행 소비 요약</h2>

      <p>전체 예산: {totalAmount.toLocaleString()}원</p>
      <p>총 사용 금액: {amountUsed.toLocaleString()}원</p>

      <h3>소비 카테고리</h3>
      <ul>
        <li>음식점: {consumptionCategory.restaurant}%</li>
        <li>카페: {consumptionCategory.cafe}%</li>
        <li>쇼핑: {consumptionCategory.shopping}%</li>
        <li>기념품: {consumptionCategory.souvenir}%</li>
      </ul>

      <h3>소비 태그</h3>
      <ul>
        {consumptionTag.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}
