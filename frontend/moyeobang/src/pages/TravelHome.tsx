import React, {useState} from 'react';
import {css} from '@emotion/react';
import HeaderWithAlarmAndQR from '@/components/common/Header/HeaderWithAlarmAndQR';
import TravelCard from '@/components/travelHome/TravelCard';
import {colors} from '@/styles/colors';
import bangbang from '@/assets/icons/bangBang.png';
import sadBangbang from '@/assets/icons/sadBangbang.png';
import TwoBtn from '@/components/common/btn/TwoBtn'; // TwoBtn 컴포넌트 임포트

const data = [
  {
    id: 1,
    title: '여행제목1',
    startDate: '20240910',
    endDate: '20240913',
    place: ['강원도 춘천시', '제주도 서귀포시'],
    quizQuestion: '김훈민의 발사이즈는?',
    quizAnswer: '235',
  },
  {
    id: 2,
    title: '여행제목2',
    startDate: '20230920',
    endDate: '20230923',
    place: ['강원도 춘천시', '경상남도 함양군'],
    quizQuestion: '김용수의 키는?',
    quizAnswer: '155',
  },
];

const userData = {
  status: 'SUCCESS',
  data: {
    nickName: '진우바오',
  },
  error: null,
};

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
  margin-bottom: 20px;
  white-space: nowrap;
`;

const nickNameTextContainer = css`
  display: flex;
  flex-direction: column;
`;

const nickNameStyle = css`
  font-family: 'bold';
  font-size: 32px;
  margin-bottom: 15px;
`;

const textStyle = css`
  font-family: 'surround';
  font-size: 32px;
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
  margin-top: 10px;
`;

const noTravelStyle = css`
  display: flex;
  align-items: center; /* 세로축 정렬을 중앙으로 설정 */
  margin-top: 130px;
  margin-left: 15px;
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

const TravelHome = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

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

  return (
    <>
      <HeaderWithAlarmAndQR />
      <div css={descriptionStyle}>
        <div css={nickNameTextContainer}>
          <p css={nickNameStyle}>{userData.data.nickName}의</p>
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
            key={currentTrip.id}
            title={currentTrip.title}
            startDate={currentTrip.startDate}
            endDate={currentTrip.endDate}
            place={currentTrip.place}
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
              key={item.id}
              title={item.title}
              startDate={item.startDate}
              endDate={item.endDate}
              place={item.place}
            />
          ))
        ) : (
          <div css={noTravelStyle}>
            <span css={noTravelTextStyle}>지난 여행이 없습니다</span>
            <img src={sadBangbang} css={sadIconStyle} />
          </div>
        )}
      </div>
    </>
  );
};

export default TravelHome;
