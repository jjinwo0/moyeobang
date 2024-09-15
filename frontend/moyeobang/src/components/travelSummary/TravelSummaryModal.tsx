import useTravelStore from '@/store/useTravelStore';
import {css} from '@emotion/react';
import {colors} from '@/styles/colors';

import HeaderWithXButton from '../common/Header/HeaderWithXbutton';

const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  //   align-items: center;
  z-index: 100;
`;

// 모달 내용 스타일 (모달 박스)
const modalContentStyle = css`
  padding: 20px;
  flex-grow: 1;
  text-align: center;
`;

// 제목 스타일 (여행 이름)
const titleStyle = css`
  display: flex;
  justify-content: center;
  align-items: center; /* 세로 정렬 */
  //   margin: 40px 0;
  //   margin-top: 40px;
  font-size: 32px;
  font-family: 'semibold';
  text-align: center; /* 텍스트를 중앙 정렬 */

  span {
    margin-bottom: 0; /* 줄 간격 없앰 */
    display: inline; /* 인라인 요소로 설정 */
  }
`;

// 여행 이름 스타일 (fifth 색상 적용)
const travelNameStyle = css`
  color: ${colors.fifth}; /* 여행 이름에 fifth 색상 적용 */
`;

// '의' 스타일 (블랙 색상 적용)
const blackTextStyle = css`
  font-family: 'semibold';
  font-size: 32px;
  color: ${colors.black}; /* 검은색 적용 */
`;

// 여행 장소 스타일
const travelPlaceStyle = css`
  font-family: 'semibold';
  font-size: 32px;
  color: ${colors.third}; /* 여행 장소에 다른 색상 적용 */
`;

const modalTitleStyle = css`
  margin-top: 50px;
  margin-bottom: 20px;
`;

export default function TravelSummaryModal({onClose}: {onClose: () => void}) {
  const {travelName, startDate, endDate, travelPlaceList} = useTravelStore();

  return (
    <div css={modalOverlayStyle}>
      <HeaderWithXButton onXClick={onClose} />
      <div css={modalContentStyle}>
        <div css={modalTitleStyle}>
          <div css={titleStyle}>
            <span css={travelNameStyle}>{travelName}</span>
            <span css={blackTextStyle}>의</span>{' '}
            {/* '의'에 검은색 스타일 적용 */}
          </div>
          <span css={travelPlaceStyle}>{travelPlaceList.join(', ')}</span>{' '}
          <span css={blackTextStyle}>여행 요약</span>
        </div>

        {/* 여행 장소 스타일 */}
        <p>{`여행 기간: ${startDate} - ${endDate}`}</p>
      </div>
    </div>
  );
}
