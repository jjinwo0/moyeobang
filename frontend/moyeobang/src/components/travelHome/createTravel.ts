import {css} from '@emotion/react';
import {colors} from '@/styles/colors';

export const modalStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const contentStyle = css`
  padding: 20px;
  flex-grow: 1; /* 남는 공간을 차지하게 만듦 */
  display: flex;
  flex-direction: column;
  position: relative; /* 달력 포지셔닝을 위해 relative 설정 */
`;

export const titleStyle = css`
  display: flex;
  justify-content: center;
  margin: 40px 0;
  font-family: 'bold';
  font-size: 24px;
`;

export const titleBlue = css`
  color: ${colors.fifth};
  margin-left: 3px;
`;

export const travelStyle = css`
  font-family: 'regular';
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex-grow: 1; /* 여행 관련 입력란들이 남는 공간을 차지하고 버튼을 아래로 밀어냄 */
`;

export const inputsContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 30px; /* 입력란들 사이의 간격을 30px로 설정 */
`;

export const inputWithIconStyle = css`
  display: flex;
  align-items: center;
  position: relative;
`;

export const calendarIconStyle = css`
  position: absolute;
  right: 20px;
  top: 65%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const quizStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 퀴즈 입력란들 사이의 간격을 20px로 설정 */
  margin-top: 10px;
`;

export const btnContainerStyle = css`
  display: flex;
  justify-content: flex-end;
  margin-top: auto; /* 버튼을 아래로 배치 */
  margin-bottom: 45px;
  margin-right: 10px;
`;

// 사진 스타일을 동적으로 설정하는 함수로 변경
export const photoStyle = (selectedImage: string | null) => css`
  font-family: 'regular';
  align-self: flex-start; /* 사진 글씨를 왼쪽으로 정렬 */
  margin-left: 15px;
  margin-top: 10px;

  display: flex; /* 텍스트와 이미지를 수평으로 배치 */
  align-items: center; /* 텍스트와 이미지를 수평으로 맞춤 */

  img {
    width: ${selectedImage
      ? '100px'
      : '30px'}; /* 선택된 이미지가 있으면 100px로 크기 확대 */
    height: ${selectedImage ? '100px' : '30px'};
    margin-left: 10px;
    cursor: pointer; /* 클릭 가능하게 설정 */
    object-fit: cover; /* 이미지 크기에 맞게 조정 */
  }
`;

//여행 장소 검색 태그
export const tagStyle = css`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  // margin-top: -50px;
  margin: 5px;
  background-color: #e0e0e0;
  border-radius: 20px;
  font-size: 14px;
  color: #333;

  .close-button {
    margin-left: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: #ff0000;
  }
`;

export const locationStyle = css`
  // margin-bottom: 10px;
  margin-top: 10px;
`;

export const tagContainerStyle = css`
  margin-top: 10px;
  max-width: 330px;
  // margin-bottom: -10px;
`;
