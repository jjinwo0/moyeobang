import {css} from '@emotion/react';
import defalutSky from '@/assets/images/defaultSky.jpg';
import React, {useState} from 'react';
import {colors} from '@/styles/colors';
import settingIcon from '@/assets/icons/settingIcon.png';
import {useRouter, useNavigate} from '@tanstack/react-router';
import Btn from '../common/btn/Btn';
import ExitTravel from './ExitTravel';
import inviteIcon from '@/assets/icons/inviteIcon.png';
import ConfirmQuiz from '../quiz/ConfirmQuiz';
import CreateTravel from './CreateTravel';
import useTravelStore from '@/store/useTravelStore';
import {useTravelContext} from '@/context/TravelDataContext'; // TravelDataContext import

const cardStyle = css`
  display: flex;
  flex-direction: column;
  width: 328px;
  height: 158px;
  border-radius: 10px;
  background-image: url(${defalutSky});
  background-size: cover;
  position: relative; /* 자식 요소를 절대 위치로 배치할 수 있도록 함 */
  padding: 16px;
  margin: 16px 0; /* 위아래로 16px의 간격 추가 */
  overflow: hidden; /* 내부 콘텐츠가 박스 밖으로 나가지 않게 함 */
  box-sizing: border-box;
`;

const overlayStyle = css`
  width: 100%; /* 흰색 박스 크기 */
  height: 100%; /* 흰색 박스 크기 */
  background-color: rgba(255, 255, 255, 0.7); /* 흰색 배경 + 70% 투명도 */
  border-radius: 10px; /* 모서리 둥글게 */
  position: absolute; /* 부모 요소 안에서 절대 위치 */
  top: 0; /* 상단부터 채우기 */
  left: 0; /* 왼쪽부터 채우기 */
  z-index: 1; /* 배경 이미지보다 위에 오도록 설정 */
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const titleStyle = css`
  font-size: 24px;
  font-family: 'bold';
  color: ${colors.fifth};
  margin-bottom: 15px;
`;

const participantsStyle = css`
  font-size: 15px;
  font-family: 'semibold';
  margin-bottom: 15px;
`;

const dateStyle = css`
  font-size: 15px;
  font-family: 'semibold';
  color: ${colors.strongGray};
  margin-bottom: 15px;
`;

const locationStyle = css`
  font-size: 20px;
  font-family: 'semibold';
`;

const settingIconStyle = css`
  position: absolute; /* 부모 요소 안에서 절대 위치 */
  top: 16px; /* 위쪽으로 16px 간격 */
  right: 16px; /* 오른쪽으로 16px 간격 */
  z-index: 10;
  img {
    width: 24px;
    height: 24px;
  }
`;

const settingButtonStyle = css`
  display: flex;
  z-index: 10;
  flex-direction: column;
  align-self: flex-end;
  margin-top: 20px;
`;

const exitModalStyle = css`
  z-index: 20;
`;

const quizButtonStyle = css`
  position: absolute; /* 부모 요소 안에서 절대 위치 */
  top: 16px; /* 위쪽으로 16px 간격 */
  right: 45px; /* 오른쪽으로 16px 간격 */
  z-index: 10;
  img {
    width: 24px;
    height: 24px;
  }
`;

interface TravelCardProps {
  travelName: string;
  startDate: Date;
  endDate: Date;
  travelPlaceList: string[];
  participantsCount: number;
  quizQuestion: string;
  quizAnswer: string;
  onClick?: () => void;
}

export default function TravelCard({
  travelName,
  startDate,
  endDate,
  travelPlaceList,
  participantsCount,
  quizQuestion,
  quizAnswer,
  onClick,
}: TravelCardProps) {
  const [settingButtonClick, setSettingButtonClick] = useState<boolean>(false);
  const [inviteModal, setInviteModal] = useState<boolean>(false);
  const [exitModal, setExitModal] = useState<boolean>(false);
  // const navigate = useNavigate();
  const [editModal, setEditModal] = useState<boolean>(false);
  const {setTravelData} = useTravelStore();
  // const {nowTravelData} = useTravelContext(); // useTravelContext로 데이터 가져오기

  const formatDate = (dateString: string) => {
    return dateString.split('T')[0]; // "YYYY-MM-DDTHH:mm:ssZ"에서 "YYYY-MM-DD"만 추출
  };

  const clickSettingButton = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파를 막아 카드 클릭이 발생하지 않도록 설정
    setSettingButtonClick(prev => !prev);
  };

  const clickInviteButton = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파를 막음
    setInviteModal(true);
  };

  const handleExitModalOpen = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파를 막음
    setExitModal(true);
  };

  const closeExitModalOpen = () => {
    setExitModal(false);
  };

  const closeQuizModal = () => {
    setInviteModal(false);
  };

  const goSettingPage = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파를 막음
    console.log('세팅페이지');
    // navigate({to: '/profile'});
    // setTravelData(title, startDate, endDate, place);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  return (
    <>
      <div css={cardStyle} onClick={onClick}>
        <div css={overlayStyle}>
          <h2 css={titleStyle}>{travelName}</h2>
          <p css={participantsStyle}>{participantsCount}명과 함께</p>
          <p css={dateStyle}>
            {formatDate(startDate)} ~ {formatDate(endDate)}
          </p>
          <p css={locationStyle}>{travelPlaceList.join(', ')}</p>
        </div>
        <div css={settingIconStyle}>
          <img src={settingIcon} onClick={clickSettingButton} />
        </div>
        <div css={quizButtonStyle} onClick={clickInviteButton}>
          <img src={inviteIcon} />
        </div>

        {settingButtonClick && (
          <div css={settingButtonStyle}>
            <Btn
              buttonStyle={{style: 'blue', size: 'small'}}
              onClick={goSettingPage}
            >
              수정
            </Btn>
            <Btn
              buttonStyle={{style: 'red', size: 'small'}}
              onClick={handleExitModalOpen}
            >
              나가기
            </Btn>
          </div>
        )}
      </div>
      {exitModal && (
        <div css={exitModalStyle}>
          <ExitTravel travelTitle={travelName} onClose={closeExitModalOpen} />
        </div>
      )}

      {inviteModal && (
        <div>
          <ConfirmQuiz onClose={closeQuizModal} />
        </div>
      )}

      {editModal && (
        <div>
          <CreateTravel
            onClose={closeEditModal}
            isEditMode={true}
            initialData={{
              travelName: travelName,
              startDate: startDate,
              endDate: endDate,
              travelPlaceList: travelPlaceList,
              quizQuestion: quizQuestion,
              quizAnswer: quizAnswer,
            }}
          />
        </div>
      )}
    </>
  );
}
