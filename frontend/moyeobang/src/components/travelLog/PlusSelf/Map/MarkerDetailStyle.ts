import {css} from '@emotion/react';

export const markerDetailStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  position: relative;
  box-sizing: border-box;
  gap: 10px;

  #springLine {
    cursor: grab;
    width: 100%;
    height: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const MapDetailContentLayout = css`
  width: 330px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MapDetailHeader = css`
  display: flex;
  align-items: center;
  gap: 15px;
  #title {
    font-size: 24px;
    font-family: 'semibold';
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
  #rating {
    font-size: 15px;
    font-family: 'semibold';
  }
`;

export const MapDetailContent = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;
  font-family: 'semibold';
  #address {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 315px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  #types {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const BtnLayout = css`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LongMapDetailHeader = css`
  font-size: 20px;
  font-family: 'semibold';
  display: flex;
  flex-direction: column;
  gap: 15px;
  #title {
    font-size: 24px;
    font-family: 'semibold';
  }
`;

export const LongMapDetailContent = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  font-family: 'medium';
  #address {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  #types {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const ReviewsLayout = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 330px;
  #reviews-header {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 20px;
    font-family: 'semibold';
  }
  #reviews {
    max-height: 390px; // 스크롤 영역의 최대 높이 설정
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    overflow-y: auto;
    scrollbar-width: thin; // 스크롤바 너비 설정
    -ms-overflow-style: auto; // IE에서 스크롤바 표시
    &::-webkit-scrollbar {
      width: 6px; // 웹킷 브라우저에서 스크롤바 너비 설정
    }
    &::-webkit-scrollbar-thumb {
      background-color: #888; // 스크롤바 색상 설정
      border-radius: 3px; // 스크롤바 모서리 둥글게
    }
    &::-webkit-scrollbar-track {
      background-color: #f1f1f1; // 스크롤바 트랙 색상 설정
    }
  }
  #reviews-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  #reviews-images {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 5px 0;
  }
  #reviews-content-header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-family: 'semibold';
    margin-bottom: 10px;
  }
`;
