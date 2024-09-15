import React, {useState} from 'react';
import useTravelStore from '@/store/useTravelStore';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import HeaderWithXButton from '../common/Header/HeaderWithXbutton';
import ConsumptionSummary from './ConsumptionSummary';
import ImgSummary from './ImgSummary';

const travelSummary: TravelSummary = {
  locationList: [
    {
      latitude: 33.431441,
      longitude: 126.874237, // 여행 장소들 위도,경도
    },
  ],
  totalAmount: 1000000, //전체 예산
  amountUsed: 950000, // 총 사용 금액(여행 끝나고)
  consumptionCategory: [
    {categoryName: '음식점', percent: 40},
    {categoryName: '카페', percent: 25},
    {categoryName: '마트', percent: 25},
    {categoryName: '기념품', percent: 10},
  ],
  consumptionTag: [
    '맛집탐방 했나방',
    '카페인 중독인가방',
    '장바구니 가득 채웠나방',
    '맥시멀리스트인가방',
  ], // 소비 태그 (문구는 프론트에서 정하는건가...?)
  participantsConsumption: [
    {
      name: '지연',
      amount: 1000000,
    },
    {
      name: '가현',
      amount: 900000,
    },
    {
      name: '두홍',
      amount: 1500000,
    },
  ],
  imgSummary: [
    {
      imgUrl: '',
      locationName: '제주공항',
    },
  ], // 이미지&장소이름 8개 리스트
};

const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  z-index: 100;
`;

const modalContentStyle = css`
  padding: 20px;
  flex-grow: 1;
  text-align: center;
`;

const titleStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-family: 'semibold';
  text-align: center;

  span {
    margin-bottom: 0;
    display: inline;
  }
`;

const travelNameStyle = css`
  color: ${colors.fifth};
`;

const blackTextStyle = css`
  font-family: 'semibold';
  font-size: 32px;
  color: ${colors.black};
`;

const travelPlaceStyle = css`
  font-family: 'semibold';
  font-size: 32px;
  color: ${colors.third};
`;

const modalTitleStyle = css`
  margin-top: 50px;
  margin-bottom: 20px;
`;

const dotContainerStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const dotStyle = (isActive: boolean) => css`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${isActive ? colors.fifth : colors.gray};
  margin: 0 5px;
`;

export default function TravelSummaryModal({onClose}: {onClose: () => void}) {
  const {travelName, startDate, endDate, travelPlaceList} = useTravelStore();
  const [currentSlide, setCurrentSlide] = useState(0); // 슬라이드 상태
  const slideCount = 2; // 슬라이드 개수
  const slides = [
    <ConsumptionSummary travelData={travelSummary} />,
    <ImgSummary travelImg={travelSummary.imgSummary} />,
  ]; // 슬라이드에 표시할 컴포넌트들

  let startX = 0; // 터치 시작 위치
  let endX = 0; // 터치 종료 위치

  // 터치 시작 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  // 터치 이동 이벤트
  const handleTouchMove = (e: React.TouchEvent) => {
    endX = e.touches[0].clientX;
  };

  // 터치 종료 이벤트
  const handleTouchEnd = () => {
    if (startX - endX > 50) {
      // 왼쪽으로 스와이프
      setCurrentSlide(prevSlide => (prevSlide + 1) % slideCount);
    } else if (endX - startX > 50) {
      // 오른쪽으로 스와이프
      setCurrentSlide(prevSlide => (prevSlide - 1 + slideCount) % slideCount);
    }
  };

  return (
    <div css={modalOverlayStyle}>
      <HeaderWithXButton onXClick={onClose} />
      <div
        css={modalContentStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div css={modalTitleStyle}>
          <div css={titleStyle}>
            <span css={travelNameStyle}>{travelName}</span>
            <span css={blackTextStyle}>의</span>
          </div>
          <span css={travelPlaceStyle}>{travelPlaceList.join(', ')}</span>
          <span css={blackTextStyle}>여행 요약</span>
        </div>

        <p>{`여행 기간: ${startDate} - ${endDate}`}</p>

        {/* 슬라이드 영역 */}
        <div>{slides[currentSlide]}</div>

        {/* 동그라미로 슬라이드 위치 표시 */}
        <div css={dotContainerStyle}>
          {slides.map((_, index) => (
            <div
              key={index}
              css={dotStyle(currentSlide === index)}
              onClick={() => setCurrentSlide(index)} // 슬라이드 변경 (사용자가 클릭할 경우)
            />
          ))}
        </div>
      </div>
    </div>
  );
}
