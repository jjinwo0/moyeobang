import {css} from '@emotion/react';

export const TravelMainMapLayout = css`
  width: 100%;
  height: 50vh;
`;

export const InfoWindowStyle = css`
  .gm-style-iw-c {
    padding-top: 5px !important; /* 위쪽 패딩 줄이기 */
  }

  .gm-ui-hover-effect {
    width: 15px !important; /* x 버튼 너비 조정 */
    height: 15px !important; /* x 버튼 높이 조정 */
  }
  
  #info-window-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #info-window-name {
    font-size: 16px;
    font-weight: bold;
  }

  #info-window-category {
    font-size: 14px;
    color: #666;
  }
`;

