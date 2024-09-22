import {createLazyFileRoute} from '@tanstack/react-router';
import React, {useState} from 'react';
import {css} from '@emotion/react';
import TravelCard from '@/components/travelHome/TravelCard';
import {colors} from '@/styles/colors';
import bangbang from '@/assets/icons/bangBang.png';
import sadBangbang from '@/assets/icons/sadBangbang.png';
import TwoBtn from '@/components/common/btn/TwoBtn'; // TwoBtn 컴포넌트 임포트
import plusButton from '@/assets/icons/plusButton.png';
import CreateTravel from '@/components/travelHome/CreateTravel.tsx';
import useModalStore from '@/store/useModalStore';
import NoTravel from '@/components/travelHome/NoTravel';
import TravelSummaryModal from '@/components/travelSummary/travelSummaryModal';
import useTravelStore from '@/store/useTravelStore';
import {useRouter} from '@tanstack/react-router';
import {useSuspenseQuery} from '@tanstack/react-query';
import moyeobang from '@/services/moyeobang';

const data: Travel[] = [
  {
    travelId: 1,
    travelName: '여행제목1',
    travelImg: null,
    participantsCount: 5,
    startDate: '2024-09-10T12:34:56Z',
    endDate: '2024-09-13T12:34:56Z',
    travelPlaceList: ['제주도'],
    quizQuestion: '김훈민의 발사이즈는?',
    quizAnswer: '235',
  },
  {
    travelId: 2,
    travelName: '여행제목2',
    travelImg: null,
    participantsCount: 5,
    startDate: '2023-09-01T12:34:56Z',
    endDate: '2023-09-05T12:34:56Z',
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
  z-index: 100; /* 다른 요소 위에 위치하도록 설정 */
`;

function Index() {
  const {isModalOpen, openModal, closeModal} = useModalStore();
  const {setTravelData} = useTravelStore();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [travelSummaryModal, setTravelSummaryModal] = useState<boolean>(false);
  // const {setNowTravelData} = useTravelContext();

  // //get으로 여행 목록 전체 조회하기
  // const {data} = useSuspenseQuery({
  //   queryKey: ['travelList'],
  //   queryFn: () => moyeobang.getTravelList(),
  // });

  // 날짜에서 시간 부분을 제거하는 함수
  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const today = normalizeDate(new Date());

  // 날짜를 변환한 후 비교
  const upcomingTrips = data.filter(
    item => normalizeDate(new Date(item.startDate)) > today
  );
  const pastTrips = data.filter(
    item => normalizeDate(new Date(item.endDate)) < today
  );
  const currentTrips = data.filter(
    item =>
      normalizeDate(new Date(item.startDate)) <= today &&
      normalizeDate(new Date(item.endDate)) >= today
  );

  // activeTab에 따라 표시할 여행 결정
  let tripsToDisplay;
  if (activeTab === 'upcoming') {
    tripsToDisplay = upcomingTrips;
  } else if (activeTab === 'past') {
    tripsToDisplay = pastTrips;
  } else {
    tripsToDisplay = currentTrips; // 필요에 따라 현재 진행 중인 여행
  }

  // 여행이 하나도 없을 때
  const noTripsAvailable =
    currentTrips.length === 0 &&
    upcomingTrips.length === 0 &&
    pastTrips.length === 0;

  const handleTravelSummary = (travel: Travel) => {
    setTravelData(
      travel.travelName,
      travel.startDate,
      travel.endDate,
      travel.travelPlaceList
    ); // 상태 저장
    setTravelSummaryModal(true);

    //여행 기록 페이지로 이동
    // clickTravelCard(travel);

    // setNowTravelData({
    //   travelName: travel.travelName,
    //   startDate: travel.startDate,
    //   endDate: travel.endDate,
    //   travelPlaceList: travel.travelPlaceList,
    //   quizQuestion: travel.quizQuestion,
    //   quizAnswer: travel.quizAnswer,
    // }); // Context 상태 저장
  };

  const router = useRouter();
  // const clickTravelCard = (travel: Travel) => {
  //   router.navigate({
  //     to: `/travelLog`,
  //   });
  // };

  const closeTravelSummary = () => {
    setTravelSummaryModal(false);
  };

  const goSettingPage = () => {
    router.navigate({
      to: `/profile/${nickName}`,
    });
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
        <img src={bangbang} css={profileImageStyle} onClick={goSettingPage} />
      </div>

      {noTripsAvailable ? (
        <NoTravel />
      ) : (
        <>
          {/* 현재 진행 중인 여행이 있을 경우 표시 */}
          {currentTrips.length > 0 && (
            <div css={containerStyle}>
              {currentTrips.map(trip => (
                <TravelCard
                  key={trip.travelId}
                  travelName={trip.travelName}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  travelPlaceList={trip.travelPlaceList}
                  participantsCount={trip.participantsCount}
                  quizQuestion={trip.quizQuestion} // quizQuestion 전달
                  quizAnswer={trip.quizAnswer} // quizAnswer 전달
                  onClick={() => clickTravelCard(trip)}
                />
              ))}
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
                  travelName={item.travelName}
                  startDate={item.startDate}
                  endDate={item.endDate}
                  travelPlaceList={item.travelPlaceList}
                  participantsCount={item.participantsCount}
                  quizQuestion={item.quizQuestion}
                  quizAnswer={item.quizAnswer}
                  onClick={
                    activeTab === 'past'
                      ? () => handleTravelSummary(item)
                      : () => clickTravelCard(item)
                  }
                />
              ))
            ) : (
              <div css={noTravelStyle}>
                <span css={noTravelTextStyle}>
                  {activeTab === 'upcoming' ? '예정 여행' : '지난 여행'}이
                  없습니다
                </span>
                <img src={sadBangbang} css={sadIconStyle} />
              </div>
            )}
          </div>
        </>
      )}

      <img src={plusButton} css={plusStyle} onClick={openModal} />

      {isModalOpen && <CreateTravel onClose={closeModal} />}

      {travelSummaryModal && (
        <TravelSummaryModal onClose={closeTravelSummary} />
      )}
    </>
  );
}

export const Route = createLazyFileRoute('/_layout/_protected/_layout/_Home/')({
  component: Index,
});
