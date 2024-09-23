import React, {useState} from 'react';
import {useSwipeable} from 'react-swipeable';
import useTravelStore from '@/store/useTravelStore';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';
import HeaderWithXButton from '../common/Header/HeaderWithXbutton';
import ConsumptionSummary from './ConsumptionSummary';
import ImgSummary from './ImgSummary';
import MapComponent from './MapComponent'; // 지도 컴포넌트 임포트
import bangBang from '@/assets/icons/bangBang.png';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 요일을 위해 한국어 로케일 임포트
import weekday from 'dayjs/plugin/weekday'; // 요일 계산을 위한 플러그인
import updateLocale from 'dayjs/plugin/updateLocale'; // 요일 출력 수정용 플러그인

const travelSummary: TravelSummary = {
  locationList: [
    {
      latitude: 33.43143,
      longitude: 126.874237, // 여행 장소들 위도,경도
    },
    {
      latitude: 33.48549374886766,
      longitude: 126.48117326163943, // 여행 장소들 위도,경도
    },
    {
      latitude: 33.3942945,
      longitude: 126.2398813, // 여행 장소들 위도,경도
    },
    {
      latitude: 33.5098305,
      longitude: 126.5233913, // 여행 장소들 위도,경도
    },
  ],
  totalAmount: 1000000, // 전체 예산
  amountUsed: 950000, // 총 사용 금액(여행 끝나고)
  amountComparison: 900000,
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
      imgUrl: bangBang,
      locationName: '제주공항',
    },
    {
      imgUrl: bangBang,
      locationName: '제주공항',
    },
    {
      imgUrl: bangBang,
      locationName: '제주공항',
    },
    {
      imgUrl: bangBang,
      locationName: '제주공항',
    },
    {
      imgUrl: bangBang,
      locationName: '제주공항',
    },
    {
      imgUrl: bangBang,
      locationName: '제주공항',
    },
    {
      imgUrl: bangBang,
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

  p {
    font-family: 'semibold';
    font-size: 13px;
  }
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
  margin-top: 40px;
  margin-bottom: 20px;
`;

const mapContainerStyle = css`
  margin: 20px 0;
`;

const dotContainerStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 0; /* 불필요한 마진을 없앰 */
  /* margin-top: 20px; */
  /* margin-bottom: 10px; */
`;

const dotStyle = (isActive: boolean) => css`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${isActive ? colors.fifth : colors.gray};
  margin: 0 5px;
`;

const slideStyle = css`
  max-width: 390px;
`;

dayjs.extend(weekday);
dayjs.extend(updateLocale);

dayjs.locale('ko'); // 여기서 한국어 로케일을 설정

// 한국어 요일 설정
dayjs.updateLocale('ko', {
  weekdays: ['일', '월', '화', '수', '목', '금', '토'],
});

export default function TravelSummaryModal({onClose}: {onClose: () => void}) {
  const {travelName, startDate, endDate, travelPlaceList} = useTravelStore();
  const [currentSlide, setCurrentSlide] = useState(0); // 슬라이드 상태
  const slideCount = 2; // 슬라이드 개수
  const slides = [
    <ConsumptionSummary travelData={travelSummary} />,
    <ImgSummary travelImg={travelSummary.imgSummary} />,
  ]; // 슬라이드에 표시할 컴포넌트들

  const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD (dddd)');
  const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD (dddd)');

  // Swipeable 설정
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentSlide(prevSlide => (prevSlide + 1) % slideCount),
    onSwipedRight: () =>
      setCurrentSlide(prevSlide => (prevSlide - 1 + slideCount) % slideCount),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // 마우스도 지원
  });

  return (
    <div css={modalOverlayStyle}>
      <HeaderWithXButton onXClick={onClose} />
      <div css={modalContentStyle}>
        <div css={modalTitleStyle}>
          <div css={titleStyle}>
            <span css={travelNameStyle}>{travelName}</span>
            <span css={blackTextStyle}>의</span>
          </div>
          <span css={travelPlaceStyle}>{travelPlaceList.join(' & ')}</span>
          <span css={blackTextStyle}> 여행 요약</span>
        </div>

        <p>{`${formattedStartDate} ~ ${formattedEndDate}`}</p>

        {/* 첫 번째 슬라이드일 때만 지도 보여주기 */}
        {currentSlide === 0 && (
          <div css={mapContainerStyle}>
            <MapComponent
              locationList={travelSummary.locationList}
              travelPlaceList={travelPlaceList}
            />
          </div>
        )}

        {/* 슬라이드 영역 */}
        <div css={slideStyle} {...handlers}>
          {slides[currentSlide]}
        </div>

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
