import {createLazyFileRoute} from '@tanstack/react-router';
import React, {useState} from 'react';
import {css} from '@emotion/react';
// import HeaderWithAlarmAndQR from '@/components/common/Header/HeaderWithAlarmAndQR';
import TravelCard from '@/components/travelHome/TravelCard';
import {colors} from '@/styles/colors';
import bangbang from '@/assets/icons/bangBang.png';
import sadBangbang from '@/assets/icons/sadBangbang.png';
import TwoBtn from '@/components/common/btn/TwoBtn'; // TwoBtn 컴포넌트 임포트
import plusButton from '@/assets/icons/plusButton.png';
import CreateTravel from '@/components/travelHome/CreateTravel';

const data: Travel[] = [
  {
    travelId: 1,
    travelName: '여행제목1',
    startDate: '20240910',
    endDate: '20240913',
    travelPlaceList: ['강원도 춘천시', '제주도 서귀포시'],
    quizQuestion: '김훈민의 발사이즈는?',
    quizAnswer: '235',
  },
  {
    travelId: 2,
    travelName: '여행제목2',
    startDate: '20230920',
    endDate: '20230923',
    travelPlaceList: ['강원도 춘천시', '경상남도 함양군'],
    quizQuestion: '김용수의 키는?',
    quizAnswer: '155',
  },
];

const nickName: Nickname = '진우바오';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const descriptionStyle = css`
  display: flex;
  align-items: center;
  margin-top: 100px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 35px;
  white-space: nowrap;
`;

const nickNameTextContainer = css`
  display: flex;
  flex-direction: column;
`;

const nickNameStyle = css`
  font-family: 'surround';
  font-size: 34px;
  margin-bottom: 10px;
`;

const textStyle = css`
  font-family: 'surround';
  font-size: 34px;
  display: inline-block;
`;

const textBlueStyle = css`
  font-family: 'surround';
  font-size: 32px;
  color: ${colors.fifth};
  display: inline-block;
  margin-left: 5px;
`;

const profileImageStyle = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid ${colors.gray};
  margin-left: 15px;
`;

const buttonStyle = css`
  margin-top: 45px;
`;

const noTravelStyle = css`
  display: flex;
  align-items: center; /* 세로축 정렬을 중앙으로 설정 */
  margin-top: 130px;
  margin-left: 5px;
`;

const noTravelTextStyle = css`
  font-family: 'semibold';
  font-size: 20px;
  color: ${colors.lightBlack};
`;

const sadIconStyle = css`
  width: 40px;
  height: 40px;
  margin-left: 5px; /* 텍스트와 아이콘 사이의 간격 추가 */
`;

const plusStyle = css`
  position: fixed; /* 또는 absolute, 부모 요소에 따라 다름 */
  bottom: 48px; /* 하단에서 25px 위 */
  right: 25px; /* 오른쪽에서 25px 떨어진 위치 */
  width: 48px;
  height: 48px;
  z-index: 999; /* 다른 요소 위에 위치하도록 설정 */
`;
function Index() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  // 현재 날짜와 여행 날짜를 비교하여 예정된 여행과 지난 여행을 구분
  const formatDateString = (dateString: string) => {
    // "YYYYMMDD"를 "YYYY-MM-DD"로 변환
    return `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6, 8)}`;
  };

  const today = new Date();

  // 날짜를 변환한 후 비교
  const upcomingTrips = data.filter(
    item => new Date(formatDateString(item.startDate)) >= today
  );
  const pastTrips = data.filter(
    item => new Date(formatDateString(item.endDate)) < today
  );

  // activeTab에 따라 표시할 여행 결정
  const tripsToDisplay = activeTab === 'upcoming' ? upcomingTrips : pastTrips;

  // 현재 날짜가 여행 기간 내에 있는지 확인하는 함수
  const isTodayInTrip = (startDate: string, endDate: string) => {
    const start = new Date(formatDateString(startDate));
    const end = new Date(formatDateString(endDate));
    return today >= start && today <= end;
  };

  // 현재 날짜가 포함된 여행 찾기
  const currentTrip = data.find(trip =>
    isTodayInTrip(trip.startDate, trip.endDate)
  );

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* <HeaderWithAlarmAndQR /> */}
      <div css={descriptionStyle}>
        <div css={nickNameTextContainer}>
          <p css={nickNameStyle}>{nickName}의</p>
          <span css={textStyle}>
            여행기록<span css={textBlueStyle}>모여방</span>
          </span>
        </div>
        <img src={bangbang} css={profileImageStyle} />
      </div>

      {/* 현재 진행 중인 여행이 있을 경우 표시 */}
      {currentTrip && (
        <div css={containerStyle}>
          <TravelCard
            key={currentTrip.travelId}
            title={currentTrip.travelName}
            startDate={currentTrip.startDate}
            endDate={currentTrip.endDate}
            place={currentTrip.travelPlaceList}
          />
        </div>
      )}

      {/* TwoBtn 컴포넌트 사용, 왼쪽엔 예정여행, 오른쪽엔 지난 여행 */}
      <div css={buttonStyle}>
        <TwoBtn
          leftText="예정여행"
          rightText="지난 여행"
          onLeftClick={() => setActiveTab('upcoming')}
          onRightClick={() => setActiveTab('past')}
        />
      </div>

      {/* 여행 카드 리스트 */}
      <div css={containerStyle}>
        {tripsToDisplay.length > 0 ? (
          tripsToDisplay.map(item => (
            <TravelCard
              key={item.travelId}
              title={item.travelName}
              startDate={item.startDate}
              endDate={item.endDate}
              place={item.travelPlaceList}
            />
          ))
        ) : (
          <div css={noTravelStyle}>
            <span css={noTravelTextStyle}>
              {activeTab === 'upcoming' ? '예정 여행' : '지난 여행'}이 없습니다
            </span>
            <img src={sadBangbang} css={sadIconStyle} />
          </div>
        )}
      </div>

      <img src={plusButton} css={plusStyle} onClick={openModal} />

      {isModalOpen && <CreateTravel onClose={closeModal} />}
    </>
  );
}

export const Route = createLazyFileRoute('/_layout/_protected/_layout/_Home/')({
  component: Index,
});
