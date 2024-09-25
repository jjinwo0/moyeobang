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
  position: relative;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
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
  #reviews-header {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
